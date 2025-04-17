const {
	i18n: { __ },
	a11y: { speak },
	richText: {
		applyFormat,
		removeFormat
	},
	element: {
		useState,
		useEffect,
		useLayoutEffect
	},
	blockEditor: {
		useSettings,
		BlockControls,
		FontSizePicker,
		LineHeightControl,
		__experimentalFontFamilyControl: FontFamilyControl,
		__experimentalLetterSpacingControl: LetterSpacingControl,
		__experimentalFontAppearanceControl: FontAppearanceControl,
		__experimentalTextDecorationControl: TextDecorationControl,
		__experimentalTextTransformControl: TextTransformControl,
	},
	components: {
		Popover,
		ToolbarGroup,
		ToolbarButton,
		__experimentalToolsPanel: ToolsPanel,
		__experimentalToolsPanelItem: ToolsPanelItem,
	}
} = wp;

/**
 * Block constants
 */
const FORMAT_NAME = 'wca/typography';

export const typography = {
	name: FORMAT_NAME,
	title: __('Typography'),
	tagName: 'span',
	className: 'has-inline-typography',
	attributes: {
		style: 'style',
	},
	edit({ isActive, value, onChange, contentRef }) {
		const [addingTypography, setAddingTypography] = useState(false);
		const [openedBy, setOpenedBy] = useState(null);
		const [blockLevelFontFamilies] = useSettings('typography.fontFamilies');

		const allFonts = Object.values(blockLevelFontFamilies).flat().map(({ fontFamily, name }) => ({
			fontFamily: fontFamily,
			name: name || fontFamily,
			style: { fontFamily },
		}));

		function addTypography(target) {
			if (target) {
				setOpenedBy(target);
			}

			setAddingTypography(true);
		}

		function stopAddingTypography() {
			setAddingTypography(false);
			setOpenedBy(null);
		}

		function onRemoveFormat() {
			onChange(removeFormat(value, FORMAT_NAME));
			speak(__('Inline formatting removed.'), 'assertive');
		}

		useEffect(() => {
			if (!isActive) {
				setAddingTypography(false);
			}
		}, [isActive]);

		useLayoutEffect(() => {
			const editableContentElement = contentRef.current;
			if (!editableContentElement) {
				return;
			}

			function handleClick(event) {
				const inline = event.target.closest('[contenteditable] .has-inline-typography');
				if (!inline || !isActive) {
					return;
				}

				setAddingTypography(true);
				setOpenedBy(inline);
			}

			editableContentElement.addEventListener('click', handleClick);

			return () => {
				editableContentElement.removeEventListener('click', handleClick);
			};
		}, [contentRef, isActive]);

		const currentStyle = value?.activeFormats?.find(({ type }) => type === FORMAT_NAME)?.attributes?.style || '';
		const styleObj = Object.fromEntries(currentStyle.split(';').filter(Boolean).map(rule => rule.split(':').map(s => s.trim())));

		const updateTypography = (styleProp, styleValue) => {
			if (styleValue) {
				styleObj[styleProp] = styleValue;
			} else {
				delete styleObj[styleProp];
			}
			const newStyle = Object.entries(styleObj).map(([key, val]) => `${key}: ${val}`).join('; ');

			onChange(applyFormat(value, {
				type: FORMAT_NAME,
				attributes: { style: newStyle },
			}));
		};

		return (
			<>
				<BlockControls group="default">
					<ToolbarGroup>
						<ToolbarButton
							icon="edit"
							title={__('Typography')}
							onClick={(event) => addTypography(event.currentTarget)}
							isActive={isActive || addingTypography}
							aria-haspopup="true"
							aria-expanded={addingTypography}
						/>
					</ToolbarGroup>
				</BlockControls>
				{addingTypography && (
					<Popover
						animate={false}
						className="wecodeart-popover"
						anchor={openedBy}
						offset={10}
						onClose={stopAddingTypography}
						onFocusOutsided={stopAddingTypography}
					>
						<ToolsPanel label={__('Typography')} resetAll={onRemoveFormat}>
							<ToolsPanelItem
								label={__('Font')}
								hasValue={() => styleObj?.['font-family']}
								onDeselect={() => updateTypography('font-family')}
							>
								<FontFamilyControl
									value={styleObj?.['font-family']}
									onChange={(family) => updateTypography('font-family', family)}
									fontFamilies={allFonts}
									__nextHasNoMarginBottom
									__next40pxDefaultSize
								/>
							</ToolsPanelItem>
							<ToolsPanelItem
								label={__('Font size')}
								hasValue={() => styleObj?.['font-size']}
								onDeselect={() => updateTypography('font-size')}
							>
								<FontSizePicker
									value={styleObj?.['font-size']}
									onChange={(size) => updateTypography('font-size', size)}
									__nextHasNoMarginBottom
									__next40pxDefaultSize
								/>
							</ToolsPanelItem>
							<ToolsPanelItem
								label={__('Appearance')}
								hasValue={() => styleObj?.['font-style'] || styleObj?.['font-weight']}
								onDeselect={() => {
									updateTypography('font-style');
									updateTypography('font-weight');
								}}
							>
								<FontAppearanceControl
									value={{ fontStyle: styleObj?.['font-style'], fontWeight: styleObj?.['font-weight'] }}
									onChange={({ fontStyle, fontWeight }) => {
										updateTypography('font-style', fontStyle);
										updateTypography('font-weight', fontWeight);
									}}
									__nextHasNoMarginBottom
									__next40pxDefaultSize
								/>
							</ToolsPanelItem>
							<ToolsPanelItem
								label={__('Line height')}
								hasValue={() => styleObj?.['line-height']}
								onDeselect={() => updateTypography('line-height')}
							>
								<LineHeightControl
									value={styleObj?.['line-height']}
									onChange={(height) => updateTypography('line-height', height)}
									__nextHasNoMarginBottom
									__next40pxDefaultSize
								/>
							</ToolsPanelItem>
							<ToolsPanelItem
								label={__('Letter spacing')}
								hasValue={() => styleObj?.['letter-spacing']}
								onDeselect={() => updateTypography('letter-spacing')}
							>
								<LetterSpacingControl
									value={styleObj?.['letter-spacing']}
									onChange={(spacing) => updateTypography('letter-spacing', spacing)}
									__nextHasNoMarginBottom
									__next40pxDefaultSize
								/>
							</ToolsPanelItem>
							<ToolsPanelItem
								label={__('Decoration')}
								hasValue={() => styleObj?.['text-decoration']}
								onDeselect={() => updateTypography('text-decoration')}
							>
								<TextDecorationControl
									value={styleObj?.['text-decoration']}
									onChange={(decoration) => updateTypography('text-decoration', decoration)}
								/>
							</ToolsPanelItem>
							<ToolsPanelItem
								label={__('Letter case')}
								hasValue={() => styleObj?.['text-transform']}
								onDeselect={() => updateTypography('text-transform')}
							>
								<TextTransformControl
									value={styleObj?.['text-transform']}
									onChange={(transform) => updateTypography('text-transform', transform)}
									__nextHasNoMarginBottom
									__next40pxDefaultSize
								/>
							</ToolsPanelItem>
						</ToolsPanel>
					</Popover>
				)}
			</>
		);
	},
};
