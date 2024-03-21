import { store, getContext, getElement, getConfig, withScope } from '@wordpress/interactivity';

const {
    hooks: {
        applyFilters
    }
} = wp;

const {
    fn: {
        validateConfig,
        executeAfterTransition,
    },
    Events,
} = wecodeart;

const NAME = 'rotator';
const NAMESPACE = `wecodeart/${NAME}`;
const DATA_KEY = `wp.${NAME}`;
const EVENT_KEY = `.${DATA_KEY}`;
const EVENT_CHANGE = `beforeChange${EVENT_KEY}`;
const EVENT_CHANGED = `afterChange${EVENT_KEY}`;

const { state, actions, callbacks } = store(NAMESPACE, {
    state: {
        get initialString() {
            const { ref } = getElement();

            return ref.firstChild;
        },
        get nextString() {
            const { ref } = getElement();
            const context = getContext();
            const word = context.activeString || state.initialString;

            return word !== ref.lastElementChild ? word.nextElementSibling : ref.firstElementChild;
        },
        get prevString() {
            const { ref } = getElement();
            const context = getContext();
            const word = context.activeString || state.initialString;

            return word !== ref.firstElementChild ? word.previousElementSibling : ref.lastElementChild;
        }
    },
    // Public methods!
    actions: {
        init() {
            const context = getContext();
            const { changeDelay, letterDelay } = callbacks.getConfig();

            clearTimeout(context.timeout);
            context.timeout = setTimeout(withScope(() => context.activeString = state.nextString), changeDelay);

            if (letterDelay !== state.letterDelay) {
                getElement().ref.style.setProperty('--wp--letter--delay', `${letterDelay}ms`);
            }
        },
        enable() {
            return actions.init();
        },
        dispose() {
            return clearTimeout(getContext().timeout);
        },
        changeString() {
            const { ref } = getElement();
            const { activeString } = getContext();

            if (activeString) {
                const changeEvent = Events.trigger(ref, EVENT_CHANGE, {
                    prevString: state.prevString,
                    nextString: activeString,
                });

                if (changeEvent.defaultPrevented) {
                    return;
                }

                ref.style.width = `${activeString.offsetWidth}px`;
                ref.classList.remove('changed');
                ref.classList.add('changing');

                state.prevString.classList.add('inactive');
                state.prevString.classList.remove('active');

                activeString.classList.remove('inactive');
                activeString.classList.add('active');

                const complete = withScope(() => {
                    Events.trigger(ref, EVENT_CHANGED, { activeString, prevString: state.prevString });
                    ref.classList.remove('changing');
                    ref.classList.add('changed');
                    actions.init(); // refresh
                });

                executeAfterTransition(complete, activeString, true);
            }
        }
    },
    // Private, mostly!
    callbacks: {
        wrapLetters() {
            const { ref } = getElement();
            const strings = ref.querySelectorAll('span');
            ref.classList.add('letters');

            strings.forEach(word => {
                const letters = word.innerText.split('');

                for (let i in letters) {
                    const letter = letters[i] == ' ' ? '&nbsp;' : letters[i];
                    letters[i] = `<i style="--index:${i}">${letter}</i>`;
                }

                word.innerHTML = letters.join('');
                word.style.setProperty('--wp--letters', letters.length);
            });
        },
        getConfig: () => {
            const context = getContext();
            const config = { ...state, ...context };

            return applyFilters('wecodeart.interactive.config', config, NAME);
        },
        validateConfig: () => validateConfig(NAME, callbacks.getConfig(), getConfig(NAMESPACE)),
    }
});