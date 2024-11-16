import { store, getContext, getElement, getConfig, withScope } from '@wordpress/interactivity';
import { computePosition, autoUpdate, detectOverflow, offset, flip, shift, arrow, inline } from '//cdn.jsdelivr.net/npm/@floating-ui/dom@1.6.3/+esm';

if (typeof computePosition === 'undefined') {
    throw new TypeError('WeCodeArt\'s tooltips require Floating UI (https://floating-ui.com/)');
}

// const {
//     hooks: {
//         applyFilters
//     }
// } = wp;

const {
    fn: {
        execute,
        executeAfterTransition,
        getElement: getDOMElement,
        findShadowRoot,
        validateConfig,
        isRTL,
        noop,
    },
    Events,
    Template
} = wecodeart;

const NAME = 'floating';
const NAMESPACE = `wecodeart/${NAME}`;
const DATA_KEY = `wp.${NAME}`;
const EVENT_KEY = `.${DATA_KEY}`;
const EVENT_SHOW = `show${EVENT_KEY}`;
const EVENT_SHOWN = `shown${EVENT_KEY}`;
const EVENT_INSERTED = `inserted${EVENT_KEY}`;
const EVENT_HIDE = `hide${EVENT_KEY}`;
const EVENT_HIDDEN = `hidden${EVENT_KEY}`;

const TRIGGER_HOVER = 'hover';
const TRIGGER_FOCUS = 'focus';
const TRIGGER_CLICK = 'click';
const TRIGGER_MANUAL = 'manual';

const SELECTOR_TOOLTIP_ARROW = '.wp-floating__arrow';
const SELECTOR_TOOLTIP_HEAD = '.wp-floating__head';
const SELECTOR_TOOLTIP_BODY = '.wp-floating__body';

const AttachmentMap = {
    AUTO: 'auto',
    TOP: 'top',
    RIGHT: isRTL() ? 'left' : 'right',
    BOTTOM: 'bottom',
    LEFT: isRTL() ? 'right' : 'left'
};

const { state, actions, callbacks } = store(NAMESPACE, {
    state: {
        get getContent() {
            const { content = state.content } = getContext();

            return callbacks.resolvePossibleFunction(content);
        },
        get getTitle() {
            const { title = state.title } = getContext();

            return callbacks.resolvePossibleFunction(title);
        },
        get getDelay() {
            let { delay = state.delay } = getContext();

            if (typeof delay === 'string') {
                delay = delay.split(',').map(no => Number.parseInt(no, 10));
            } else {
                delay = [delay];
            }

            switch (delay.length) {
                case 1:
                    delay = { show: delay[0], hide: delay[0] };
                    break;
                case 2:
                    delay = { show: delay[0], hide: delay[1] };
                    break;
            }

            return delay;
        },
        get getOffset() {
            let { offset = state.offset } = getContext();

            if (typeof offset === 'string') {
                offset = offset.split(',').map(no => Number.parseInt(no, 10));
            }

            switch (offset.length) {
                case 1:
                    offset = { mainAxis: offset[0] };
                    break;
                case 2:
                    offset = { mainAxis: offset[0], crossAxis: offset[1] };
                    break;
                case 3:
                    offset = { mainAxis: offset[0], crossAxis: offset[1], alignmentAxis: offset[2] };
                    break;
            }

            return offset;
        },
        get isWithContent() {
            return Boolean(state.getTitle || state.getContent);
        },
        get isWithActiveTrigger() {
            const { activeTrigger = {} } = getContext();

            return Object.values(activeTrigger).includes(true);
        },
        get isAnimated() {
            const { animation } = state;
            const { tip } = getContext();

            return animation || (tip && tip.classList.contains('fade'));
        },
        get isShown() {
            const { tip } = getContext();

            return tip && tip.classList.contains('show');
        }
    },
    // Public methods!
    actions: {
        enable() {
            const context = getContext();
            context.isEnabled = true;
        },
        disable() {
            const context = getContext();
            context.isEnabled = false;
        },
        toggleEnabled() {
            const context = getContext();
            context.isEnabled = !context.isEnabled;
        },
        toggle: (e) => {
            const context = getContext();
            const { isEnabled } = state;

            if (!isEnabled) {
                return;
            }

            context.activeTrigger = {};
            context.activeTrigger.click = !!context.activeTrigger.click;

            if (state.isShown) {
                actions.leave(e);
                return;
            }

            actions.enter(e);
        },
        show: (e) => {
            if (state.isShown) {
                return;
            }

            const { ref } = getElement();

            if (ref.style.display === 'none') {
                throw new Error('Please use show on visible elements');
            }

            const { isEnabled } = state;

            if (!(state.isWithContent && isEnabled)) {
                return;
            }

            const showEvent = Events.trigger(ref, EVENT_SHOW);
            const shadowRoot = findShadowRoot(ref);
            const isInTheDom = (shadowRoot || ref.ownerDocument.documentElement).contains(ref);

            if (showEvent.defaultPrevented || !isInTheDom) {
                return;
            }

            // TODO: v6 remove this or make it optional
            callbacks.disposePopper();

            const tip = callbacks.getTipElement();
            const context = getContext();

            ref.setAttribute('aria-describedby', tip.getAttribute('id'));

            if (!ref.ownerDocument.documentElement.contains(tip)) {
                const container = !context.container ? document.body : getDOMElement(context.container);
                container.append(tip);
                context.cleanup = autoUpdate(ref, tip, withScope(callbacks.createPopper));
                Events.trigger(ref, EVENT_INSERTED);
            }

            tip.classList.add('show');

            // If this is a touch-enabled device we add extra
            // empty mouseover listeners to the body's immediate children;
            // only needed because of broken event delegation on iOS
            // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html
            if ('ontouchstart' in document.documentElement) {
                for (const element of [].concat(...document.body.children)) {
                    Events.on(element, 'mouseover', noop);
                }
            }

            const complete = withScope(() => {
                Events.trigger(ref, EVENT_SHOWN);

                if (context.isHovered === false) {
                    actions.leave(e);
                }

                context.isHovered = false;
            });

            executeAfterTransition(complete, tip, state.isAnimated);
        },
        hide: () => {
            const { ref } = getElement();

            const hideEvent = Events.trigger(ref, EVENT_HIDE);

            if (hideEvent.defaultPrevented) {
                return;
            }

            const tip = callbacks.getTipElement();
            tip.classList.remove('show');

            // If this is a touch-enabled device we remove the extra
            // empty mouseover listeners we added for iOS support
            if ('ontouchstart' in document.documentElement) {
                for (const element of [].concat(...document.body.children)) {
                    Events.off(element, 'mouseover', noop);
                }
            }

            const context = getContext();
            context.activeTrigger[TRIGGER_CLICK] = false;
            context.activeTrigger[TRIGGER_FOCUS] = false;
            context.activeTrigger[TRIGGER_HOVER] = false;
            context.isHovered = null; // it is a trick to support manual triggering

            const complete = withScope(() => {
                if (state.isWithActiveTrigger) {
                    return;
                }

                if (!context.isHovered) {
                    callbacks.disposePopper();
                }

                ref.removeAttribute('aria-describedby');
                Events.trigger(ref, EVENT_HIDDEN);
            });

            executeAfterTransition(complete, tip, state.isAnimated);
        },
        enter: (e) => {
            const { type } = e;
            const context = getContext();

            context.activeTrigger = {};
            context.activeTrigger[type === 'focusin' ? TRIGGER_FOCUS : TRIGGER_HOVER] = true;

            if (state.isShown || context.isHovered) {
                context.isHovered = true;
                return;
            }

            context.isHovered = true;

            const { show } = state.getDelay;

            // callbacks.withTimeout(() => context.isHovered && actions.show(e), show);
            callbacks.withTimeout(() => actions.show(e), show);
        },
        leave: (e) => {
            const { type, target, relatedTarget } = e;
            const context = getContext();

            context.activeTrigger[type === 'focusout' ? TRIGGER_FOCUS : TRIGGER_HOVER] = target && target.contains(relatedTarget);

            if (state.isWithActiveTrigger) {
                return;
            }

            context.isHovered = false;

            const { hide } = state.getDelay;

            callbacks.withTimeout(() => actions.hide(e), hide);
        },
        setContent(content) {
            const context = getContext();
            context.newContent = content;

            if (state.isShown) {
                callbacks.disposePopper();
                actions.show();
            }
        }
    },
    // Private, mostly!
    callbacks: {
        getTemplateFactory: (content) => {
            const context = getContext();

            if (context.templateFactory) {
                context.templateFactory.changeContent(content);
            } else {
                const config = { ...state, ...context };

                context.templateFactory = new Template({
                    ...config,
                    content, // Overwrite content with object
                    extraClass: callbacks.resolvePossibleFunction(config.className)
                });
            }

            return context.templateFactory;
        },
        getTipElement: () => {
            const context = getContext();

            if (!context.tip) {
                context.tip = callbacks.createTipElement(context.newContent || callbacks.getContentForTemplate());
            }

            return context.tip;
        },
        getContentForTemplate: () => {
            const { plugin } = getContext();

            let object = {};

            switch (plugin) {
                case 'popover':
                    object = {
                        [SELECTOR_TOOLTIP_HEAD]: state.getTitle,
                        [SELECTOR_TOOLTIP_BODY]: state.getContent,
                    };
                    break;
                default:
                    object = {
                        [SELECTOR_TOOLTIP_BODY]: state.getTitle
                    };
                    break;
            }

            return object;

        },
        createTipElement: (content) => {
            const tip = callbacks.getTemplateFactory(content).toHtml();

            tip.classList.remove('fade', 'show');
            tip.classList.add(`wp-${NAME}--auto`);
            const { plugin = 'tooltip' } = getContext();
            tip.classList.add(`wp-${NAME}--${plugin}`);

            const tipId = callbacks.getUID().toString();

            tip.setAttribute('id', tipId);

            if (state.isAnimated) {
                tip.classList.add('fade');
            }

            return tip;
        },
        createPopper: () => {
            const { ref } = getElement();
            const tip = callbacks.getTipElement();

            const { placement, fallbackPlacements, shift: shiftOpts, offset: getOffset } = { ...state, ...getContext() };
            const attachment = AttachmentMap[callbacks.resolvePossibleFunction(placement).toUpperCase()];

            const arrowEl = tip.querySelector(SELECTOR_TOOLTIP_ARROW);

            const setPlacement = {
                name: 'setPlacement',
                fn({ placement }) {
                    tip.setAttribute('data-placement', placement);

                    return {};
                },
            };

            return computePosition(ref, tip, {
                placement: attachment,
                middleware: [
                    offset({ ...getOffset }),
                    flip({ fallbackPlacements }),
                    shiftOpts ? shift({ ...shiftOpts }) : false,
                    arrowEl ? arrow({ element: arrowEl }) : false,
                    inline(),
                    setPlacement,
                ].filter(Boolean),
            }).then(({ x, y, middlewareData: { arrow } = {} }) => {
                if (arrow) {
                    const { x, y } = arrow;

                    Object.assign(arrowEl.style, {
                        left: x != null ? `${x}px` : '',
                        top: y != null ? `${y}px` : '',
                    });
                }

                Object.assign(tip.style, {
                    position: 'absolute',
                    inset: 'auto',
                    margin: '0',
                    top: '0',
                    left: '0',
                    transform: `translate3d(${callbacks.roundByDPR(x)}px,${callbacks.roundByDPR(y)}px,0)`,
                });
            });
        },
        disposePopper: () => {
            const context = getContext();

            if (context.tip) {
                context.tip.remove();
                context.tip = null;
            }

            if (context.cleanup) {
                context.cleanup();
                context.cleanup = null;
            }
        },
        validateConfig: () => {
            return validateConfig(NAME, { ...state, ...getContext() }, getConfig(NAMESPACE));
        },
        getUID: () => {
            let prefix = `wp-${NAME}-`;

            do {
                prefix += Math.floor(Math.random() * 1000000);
            } while (document.getElementById(prefix));

            return prefix;
        },
        resolvePossibleFunction: (arg) => {
            const { ref } = getElement();

            return execute(arg, [ref]);
        },
        roundByDPR: (value) => {
            const dpr = window.devicePixelRatio || 1;

            return Math.round(value * dpr) / dpr;
        },
        withTimeout: (callback, delay) => {
            const context = getContext();
            clearTimeout(context.timeout);

            context.timeout = setTimeout(withScope(callback), delay);
        }
    }
});