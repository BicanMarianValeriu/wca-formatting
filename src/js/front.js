/**
 * Popper
 *
 * @author  Bican Marian Valeriu
 * @version 0.1
 */

export default (function (wecodeart) {

	const { Component } = wecodeart;

	const getDefaults = {
		title: ''
	};

	class Popper extends Component {
		/**
		 * Construct Animate instance
		 * @constructor
		 * @param {Element} el
		 * @param {Object} options
		 */
		constructor(el, options) {
			super(Popper, el, options);
			this.el = el;
			this.el.Popper = this;
			/**
			 * Options for the animation
			 * @member Popper#options
			 */
			this.options = Object.assign({}, Popper.defaults, options);
			Popper.elements.push(this);
			this.setupEventHandlers();
			this.build();
		}

		static get defaults() {
			return getDefaults;
		}

		static init(els, options) {
			return super.init(this, els, options);
		}

		/**
		 * Get Instance
		 */
		static getInstance(el) {
			const domElem = el.jquery ? el[0] : el;
			return domElem.Popper;
		}

		/**
		 * Setup Events
		 */
		setupEventHandlers() {
			const lazyPlugins = () => {
				const { plugin = 'tooltip' } = this.el.dataset;

				switch (plugin) {
					case 'tooltip':
						(async () => {
							const { default: Tooltip } = await import( /* webpackChunkName: "tooltip" */ "bootstrap/js/dist/tooltip");
							const plugin = new Tooltip(this.el, this.options);
							const { trigger = 'hover focus' } = this.options;
							if (trigger.includes('hover')) {
								plugin.show();
							}
						})();
						break;
					case 'popover':
						(async () => {
							const { default: Popover } = await import( /* webpackChunkName: "popover" */ "bootstrap/js/dist/popover");
							const plugin = new Popover(this.el, this.options);
							const { trigger = '' } = this.options;
							if (trigger.includes('hover')) {
								plugin.show();
							}
						})();
						break;
				}
			}

			this.lazyPlugins = lazyPlugins.bind(this);
			['focus', 'mouseenter', 'touchstart'].forEach(ev => this.el.addEventListener(ev, this.lazyPlugins, {
				...{ once: true },
				...(ev === 'touchstart' ? { passive: true } : {})
			}));
		}

		/**
		 * Remove Event Handlers
		 */
		removeEventHandlers() {
			if (Popper.getInstance(this.el)) {
				['focus', 'mouseenter', 'touchstart'].forEach(ev => this.el.removeEventListener(ev, this.lazyPlugins));
			}
		}

		/**
		 * Teardown component
		 */
		destroy() {
			if (Popper.getInstance(this.el)) {
				this.removeEventHandlers();
				const index = Popper.elements.indexOf(this);
				Popper.elements.splice(index, 1);
				this.el.Popper = undefined;
			}
		}

		/**
		 * Build
		 */
		build() {
			return null;
		}
	}

	/**
	 * @static
	 * @memberof Popper
	 */
	Popper.elements = [];
	wecodeart.plugins.Popper = Popper;

	Popper.init(document.querySelectorAll('.has-popper[data-plugin]'));

}).apply(this, [window.wecodeart]);
