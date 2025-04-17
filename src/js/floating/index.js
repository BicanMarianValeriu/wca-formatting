/**
 * WordPress dependencies
 */
const {
	i18n: {
		__
	},
	element: {
		useState,
		useEffect,
		useRef
	},
	components: {
		Icon,
		SVG,
		Path,
		Button,
		Popover,
		ButtonGroup,
		ToolbarGroup,
		ToolbarButton,
	},
	richText: {
		applyFormat,
		removeFormat,
		getActiveFormat
	},
	blockEditor: {
		BlockControls,
	}
} = wp;

import Controls from './Controls';

/**
 * Block constants
 */
const name = 'wca/floating';

export const floating = {
	name,
	title: __('Floating UI', 'wecodeart'),
	tagName: 'span',
	className: 'has-floating',
	attributes: {
		'data-wp-context': 'data-wp-context',
	},
	edit({ isActive, value, onChange }) {
		const activeFormat = getActiveFormat(value, name);
		const buttonRef = useRef(null);

		const { attributes: oldAttributes = {
			'data-options': '',
		} } = activeFormat || {};

		const { attributes = {
			'data-wp-context': '',
		} } = activeFormat || {};

		const mergedAttributes = {
			...attributes,
			'data-wp-context': attributes['data-wp-context'] ? attributes['data-wp-context'] : oldAttributes['data-options']
		};

		const [isOpen, setIsOpen] = useState(false);
		const toggle = () => setIsOpen(!isOpen);

		const [state, setState] = useState({ ...mergedAttributes });

		useEffect(() => setState({ ...mergedAttributes }), [activeFormat]);

		return (
			<>
				<BlockControls>
					<ToolbarGroup>
						<ToolbarButton
							icon={
								<Icon icon={
									<SVG style={{ padding: 4 }} viewBox="0 0 16 16">
										<Path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-2.5a2 2 0 0 0-1.6.8L8 14.333 6.1 11.8a2 2 0 0 0-1.6-.8H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2.5a1 1 0 0 1 .8.4l1.9 2.533a1 1 0 0 0 1.6 0l1.9-2.533a1 1 0 0 1 .8-.4H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
									</SVG>
								} />
							}
							title={__('Floating UI', 'wecodeart')}
							onClick={toggle}
							isActive={isActive}
							ref={buttonRef}
						/>
					</ToolbarGroup>
				</BlockControls>
				{isOpen && (
					<Popover
						animate={false}
						className="wecodeart-popover"
						anchorRef={buttonRef}
						offset={10}
						onClose={toggle}
						onFocusOutsided={toggle}
					>
						<Controls {...{ state, setState }} />
						<ButtonGroup>
							<Button isPrimary isLarge onClick={() => {
								onChange(applyFormat(value, { type: name, attributes: state }));
								toggle();
							}}>
								{__('Apply')}
							</Button>
							<Button isDestructive isLarge onClick={() => {
								onChange(removeFormat(value, name));
								toggle();
							}}>
								{__('Remove')}
							</Button>
						</ButtonGroup>
					</Popover>
				)}
			</>
		);
	},
};
