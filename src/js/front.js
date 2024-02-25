/**
 * Popper
 *
 * @author  Bican Marian Valeriu
 * @version 0.1
 */

export default (function (wecodeart) {

	const { Component } = wecodeart;

	class Popper extends Component {
		constructor(el, config) {
			super(Popper, el, config);

			this._element = el;
			this._config = this._config || Object.assign({}, Popper.defaults, config);
			
			this.setupEventHandlers();
		}

		/**
		 * Init
		 */
		static init(els, config) {
			return super.init(this, els, config);
		}

		/**
		 * Setup Events
		 */
		setupEventHandlers() {
			const lazyPlugins = () => {
				const { plugin = 'tooltip' } = this._element.dataset;

				switch (plugin) {
					case 'tooltip':
						(async () => {
							const { default: Tooltip } = await import( /* webpackChunkName: "tooltip" */ "bootstrap/js/dist/tooltip");
							const plugin = new Tooltip(this._element, this._config);
							const { trigger = 'hover focus' } = this._config;
							if (trigger.includes('hover')) {
								plugin.show();
							}
						})();
						break;
					case 'popover':
						(async () => {
							const { default: Popover } = await import( /* webpackChunkName: "popover" */ "bootstrap/js/dist/popover");
							const plugin = new Popover(this._element, this._config);
							const { trigger = '' } = this._config;
							if (trigger.includes('hover')) {
								plugin.show();
							}
						})();
						break;
				}
			}

			this.lazyPlugins = lazyPlugins.bind(this);
			['focus', 'mouseenter', 'touchstart'].forEach(ev => this._element.addEventListener(ev, this.lazyPlugins, {
				...{ once: true },
				...(ev === 'touchstart' ? { passive: true } : {})
			}));
		}
	}

	/**
	 * @static
	 * @memberof Popper
	 */
	wecodeart.plugins.Popper = Popper;

	Popper.init(document.querySelectorAll('.has-popper[data-plugin]'));

}).apply(this, [window.wecodeart]);
