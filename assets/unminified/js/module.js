import { store, getContext, getElement, getConfig, withScope } from '@wordpress/interactivity';
import { computePosition, autoUpdate, detectOverflow, offset, flip, shift, arrow, inline } from '//cdn.jsdelivr.net/npm/@floating-ui/dom@1.6.3/+esm';

if (typeof computePosition === 'undefined') {
    throw new TypeError('WeCodeArt\'s tooltips require Floating UI (https://floating-ui.com/)');
}

const {
    hooks: {
        applyFilters
    }
} = wp;

const {
    fn: {
        execute,
        executeAfterTransition,
        getElement: getDOMElement,
        isElement,
        isRTL,
        toType = object => {
            if (object === null || object === undefined) {
                return `${object}`;
            }

            return Object.prototype.toString.call(object).match(/\s([a-z]+)/i)[1].toLowerCase();
        }
    },
    Events,
    Template
} = wecodeart;

const NAME = 'tooltip';
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

const SELECTOR_TOOLTIP_ARROW = '.wp-tooltip__arrow';
const SELECTOR_TOOLTIP_INNER = '.wp-tooltip__inner';

const AttachmentMap = {
    AUTO: 'auto',
    TOP: 'top',
    RIGHT: isRTL() ? 'left' : 'right',
    BOTTOM: 'bottom',
    LEFT: isRTL() ? 'right' : 'left'
};

const findShadowRoot = element => {
    if (!document.documentElement.attachShadow) {
        return null;
    }

    // Can find the shadow root otherwise it'll return the document
    if (typeof element.getRootNode === 'function') {
        const root = element.getRootNode();
        return root instanceof ShadowRoot ? root : null;
    }

    if (element instanceof ShadowRoot) {
        return element;
    }

    // when we don't find a shadow root
    if (!element.parentNode) {
        return null;
    }

    return findShadowRoot(element.parentNode);
};

const noop = () => { };

const DefaultType = {
    isEnabled: '(boolean|function)',
    boundary: '(string|element)',
    placement: '(string|function)',
    className: '(string|function)',
    fallbackPlacements: 'array',
    offset: '(array|object|string|function)',
    delay: '(number|object)',
    animation: 'boolean',
    container: '(string|element|boolean|null)',
    html: 'boolean',
    sanitize: 'boolean',
    sanitizeFn: '(null|function)',
    selector: '(string|boolean)',
    template: 'string',
    title: '(string|element|function)',
    trigger: 'string'
};

// State holds global vars for all DOM nodes
// Context holds each DOM node state
// Config should hold some defaults/translations etc (static data)

const { state, actions, callbacks } = store('wecodeart/tooltip', {
    state: {
        get getTitle() {
            const { title } = callbacks.getConfig();

            return callbacks.resolvePossibleFunction(title);
        },
        get isWithContent() {
            return Boolean(state.getTitle);
        },
        get isWithActiveTrigger() {
            const { activeTrigger = {} } = callbacks.getConfig();

            return Object.values(activeTrigger).includes(true);
        },
        get isAnimated() {
            const { animation, tip } = callbacks.getConfig();

            return animation || (tip && tip.classList.contains('fade'));
        },
        get isShown() {
            const { tip } = callbacks.getConfig();

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
            const context = callbacks.getConfig();
            const { isEnabled } = context;

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
            const { ref } = getElement();

            if (ref.style.display === 'none') {
                throw new Error('Please use show on visible elements');
            }

            const config = callbacks.getConfig();
            const { isEnabled } = config;

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
                const { container } = config;
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
            if (!state.isShown) {
                return;
            }

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

            const { delay: { show } } = callbacks.getConfig();

            callbacks.withTimeout(() => context.isHovered && actions.show(e), show);
        },
        leave: (e) => {
            const { type, target, relatedTarget } = e;
            const context = getContext();

            context.activeTrigger[type === 'focusout' ? TRIGGER_FOCUS : TRIGGER_HOVER] = target && target.contains(relatedTarget);

            if (state.isWithActiveTrigger) {
                return;
            }

            context.isHovered = false;

            const { delay: { hide } } = callbacks.getConfig();

            callbacks.withTimeout(() => !context.isHovered && actions.hide(e), hide);
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
            const context = callbacks.getConfig();

            if (context.templateFactory) {
                context.templateFactory.changeContent(content);
            } else {
                context.templateFactory = new Template({
                    ...context,
                    content,
                    extraClass: callbacks.resolvePossibleFunction(context.className)
                });
            }

            return context.templateFactory;
        },
        getTipElement: () => {
            const context = getContext();

            if (!context.tip) {
                context.tip = callbacks.createTipElement(context.newContent || {
                    [SELECTOR_TOOLTIP_INNER]: state.getTitle
                });
            }

            return context.tip;
        },
        createTipElement: (content) => {
            const tip = callbacks.getTemplateFactory(content).toHtml();

            tip.classList.remove('fade', 'show');
            tip.classList.add(`wp-${NAME}--auto`);

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

            const { placement, fallbackPlacements, boundary, offset: getOffset } = callbacks.getConfig();
            const attachment = AttachmentMap[callbacks.resolvePossibleFunction(placement).toUpperCase()];

            const arrowEl = tip.querySelector(SELECTOR_TOOLTIP_ARROW);

            const preventOverflow = {
                name: 'preventOverflow',
                async fn(state) {
                    const overflow = await detectOverflow(state, {
                        boundary: boundary
                    });

                    return {};
                },
            };

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
                    shift({ crossAxis: true }),
                    arrow({ element: arrowEl }),
                    inline(),
                    preventOverflow,
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
        getConfig: () => {
            const context = getContext();

            let config = { ...getConfig(), ...context };

            // Get container.
            config.container = !context.container ? document.body : getDOMElement(context.container);

            // Format offset/delay.
            let { offset, delay } = config;

            if (typeof offset === 'string') {
                offset = offset.split(',').map(no => Number.parseInt(no, 10));
            }

            switch (offset.length) {
                case 1:
                    config.offset = { mainAxis: offset[0] };
                    break;
                case 2:
                    config.offset = { mainAxis: offset[0], crossAxis: offset[1] };
                    break;
                case 3:
                    config.offset = { mainAxis: offset[0], crossAxis: offset[1], alignmentAxis: offset[2] };
                    break;
            }

            if (typeof delay === 'string') {
                delay = delay.split(',').map(no => Number.parseInt(no, 10));
            }

            switch (delay.length) {
                case 1:
                    config.delay = { show: delay[0], hide: delay[0] };
                    break;
                case 2:
                    config.delay = { show: delay[0], hide: delay[1] };
                    break;
            }

            return applyFilters('wecodeart/interactive/config', config, NAME);
        },
        validateConfig: () => {
            const config = callbacks.getConfig();

            for (const [property, expectedTypes] of Object.entries(DefaultType)) {
                const value = config[property];
                const valueType = isElement(value) ? 'element' : toType(value);

                if (!new RegExp(expectedTypes).test(valueType)) {
                    throw new TypeError(
                        `${NAME.toUpperCase()}: Option "${property}" provided type "${valueType}" but expected type "${expectedTypes}".`
                    );
                }
            }
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