/**
 * WordPress dependencies
 */
const {
	i18n: {
		__
	},
	data: {
		select
	},
	element: {
		useState,
		useEffect
	},
	components: {
		Icon,
		SVG,
		Path,
		Modal,
		Button,
		ButtonGroup,
		SelectControl
	},
	richText: {
		applyFormat,
		removeFormat,
		getActiveFormat
	},
	blockEditor: {
		RichTextToolbarButton,
	}
} = wp;

/**
 * Block constants
 */
const name = 'wca/decoration';

export const decoration = {
	name,
	title: __('Decoration', 'wecodeart'),
	tagName: 'span',
	className: 'has-decoration',
	attributes: {
		class: 'class',
	},
	edit({ isActive, value, onChange }) {
		const activeFormat = getActiveFormat(value, name);
		const { wecodeart: { decorationStyles = [] } = {} } = select('core/editor').getEditorSettings();

		const { attributes = {} } = activeFormat || {};

		const [isOpen, setIsOpen] = useState(false);
		const [state, setState] = useState({ ...attributes });
		const toggle = () => setIsOpen(!isOpen);

		const selectOptions = [...[
			{ label: __('Default', 'wecodeart'), value: '' }
		], ...decorationStyles.map(i => ({ ...i, value: `is-style-${i.value}` }))];

		useEffect(() => setState({ ...attributes }), [activeFormat]);

		return (
			<>
				<RichTextToolbarButton
					icon={<Icon icon={<SVG style={{ padding: 4 }} viewBox="0 0 16 16">
						<Path fill-rule="evenodd" d="M11.096.644a2 2 0 0 1 2.791.036l1.433 1.433a2 2 0 0 1 .035 2.791l-.413.435-8.07 8.995a.5.5 0 0 1-.372.166h-3a.5.5 0 0 1-.234-.058l-.412.412A.5.5 0 0 1 2.5 15h-2a.5.5 0 0 1-.354-.854l1.412-1.412A.5.5 0 0 1 1.5 12.5v-3a.5.5 0 0 1 .166-.372l8.995-8.07.435-.414Zm-.115 1.47L2.727 9.52l3.753 3.753 7.406-8.254-2.905-2.906Zm3.585 2.17.064-.068a1 1 0 0 0-.017-1.396L13.18 1.387a1 1 0 0 0-1.396-.018l-.068.065 2.85 2.85M5.293 13.5 2.5 10.707v1.586L3.707 13.5z" />
					</SVG>} />}
					title={__('Decoration', 'wecodeart')}
					onClick={toggle}
					isActive={isActive}
				/>
				{isOpen && (
					<Modal title={__('Settings', 'wecodeart')} onRequestClose={toggle}>
						<SelectControl
							label={__('Style', 'wecodeart')}
							value={state?.class}
							options={selectOptions}
							onChange={(_class) => setState({ ...state, class: _class })}
						/>
						<ButtonGroup>
							<Button isPrimary isLarge onClick={() => {
								onChange(applyFormat(value, { type: name, attributes: state }));
								toggle();
							}}>
								{__('Apply', 'wecodeart')}
							</Button>
							<Button isDestructive isLarge onClick={() => {
								onChange(removeFormat(value, name));
								toggle();
							}}>
								{__('Remove', 'wecodeart')}
							</Button>
						</ButtonGroup>
					</Modal>
				)}
			</>
		);
	},
};
