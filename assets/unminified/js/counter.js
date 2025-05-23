import { store, getContext, getElement, getConfig, withScope } from '@wordpress/interactivity';

const {
    fn: {
        execute,
        validateConfig,
    },
    Events,
} = wecodeart;

const NAME = 'counter';
const NAMESPACE = `wecodeart/${NAME}`;
const DATA_KEY = `wp.${NAME}`;
const EVENT_KEY = `.${DATA_KEY}`;
const EVENT_START = `start${EVENT_KEY}`;
const EVENT_UPDATE = `update${EVENT_KEY}`;
const EVENT_COMPLETE = `complete${EVENT_KEY}`;

const { state, actions } = store(NAMESPACE, {
    state: {
        get countTo() {
            const { value, from = 0, comma = false, decimals = 0 } = getContext();

            let text = value || from;

            text = text.toFixed(decimals);

            if (comma) {
                text = parseFloat(text).toLocaleString();
            }

            return text;
        },
        get loops() {
            const { refresh = 100, speed = 1000 } = getContext();

            return Math.ceil(speed / refresh);
        },
        get increment() {
            const { from = 0, to = 0 } = getContext();

            return parseFloat((parseFloat(to) - parseFloat(from)) / state.loops);
        },
    },
    // Public methods!
    actions: {
        start() {
            const context = getContext();
            const { ref } = getElement();
            const { refresh = state.refresh, from = state.from, to = state.to } = context;

            const startEvent = Events.trigger(ref, EVENT_START, { from, to });

            if (startEvent.defaultPrevented) {
                return;
            }

            actions.stop();
            context.value = parseFloat(from);
            context.loopCount = 0;
            context.interval = setInterval(withScope(actions.update), refresh);
        },
        stop() {
            const context = getContext();

            if (context.interval) {
                clearInterval(context.interval);
            }
        },
        update() {
            const context = getContext();
            const { from = state.from } = context;

            context.value = (context.value || parseFloat(from)) + state.increment;
            context.loopCount = (context.loopCount || 0) + 1;

            const { onUpdate, onComplete, ...rest } = { ...state, ...context };
            const { ref } = getElement();
            const args = { ...rest, current: context.value };

            Events.trigger(ref, EVENT_UPDATE, args);
            execute(onUpdate, [ref, args]);

            if (context.loopCount >= state.loops) {
                clearInterval(context.interval);
                context.value = rest.to;
                Events.trigger(ref, EVENT_COMPLETE, args);
                execute(onComplete, [ref, args]);
            }
        },
        observe() {
            const { ref } = getElement();
            const { offset = state.offset } = getContext();

            const opts = {
                rootMargin: `0px 0px ${parseFloat(offset).toString()}px 0px`,
                threshold: 1
            };

            const observer = new IntersectionObserver(withScope((els, observer) => els.forEach(({ isIntersecting }) => {
                if (isIntersecting) {
                    actions.start();
                    setTimeout(() => observer.unobserve(ref), 100);
                }
            })), opts);

            observer.observe(ref);
        },
    },
    // Private, mostly!
    callbacks: {
        validateConfig: () => validateConfig(NAME, { ...state, ...getContext() }, getConfig(NAMESPACE)),
    }
});