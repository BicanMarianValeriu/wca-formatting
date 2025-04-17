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
        useEffect,
        useRef
    },
    components: {
        Dashicon,
        Popover,
        TabPanel,
        Button,
        ButtonGroup,
        TextControl,
        BaseControl,
        SelectControl,
        ToggleControl,
        ToolbarGroup,
        ToolbarButton,
        __experimentalHStack: HStack,
        __experimentalNumberControl: NumberControl,
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

/**
 * Block constants
 */
const name = 'wca/rotator';

export const rotator = {
    name,
    title: __('String rotator', 'wecodeart'),
    tagName: 'span',
    className: 'has-rotator',
    attributes: {
        'data-wp-context': 'data-wp-context',
    },
    edit({ isActive, value, onChange, contentRef }) {
        const { text, start, end } = value;
        const selection = text.substring(start, end);
        const activeFormat = getActiveFormat(value, name);
        const { wecodeart: { rotatorStyles = [] } = {} } = select('core/editor').getEditorSettings();
        const { attributes = { 'data-wp-context': JSON.stringify({ strings: [], effect: 'slide' }) } } = activeFormat || {};
        const buttonRef = useRef(null);

        // Modal state
        const [isOpen, setIsOpen] = useState(false);

        const toggle = () => {
            setIsOpen(!isOpen);

            if (!selection || options.strings.length >= 1) {
                return;
            }

            setOptions({ strings: [selection] });
        };

        // Options state
        const [state, setState] = useState({ ...attributes });

        const options = JSON.parse(decodeURIComponent(state['data-wp-context'] || '{}'));

        const setOptions = (value) => {
            let newOptions = { ...options, ...value };
            newOptions = Object.fromEntries(Object.entries(newOptions).filter(([_, v]) => v !== null && v !== ''));

            setState({ ...state, 'data-wp-context': encodeURIComponent(JSON.stringify(newOptions)) });
        };

        const addWord = () => {
            const updatedItems = [...options.strings, ''];

            setOptions({ strings: updatedItems });
        };

        const removeWord = (index) => {
            const updatedItems = [...options.strings];
            updatedItems.splice(index, 1);

            setOptions({ strings: updatedItems });
        };

        const updateWord = (index, value) => {
            const updatedItems = [...options.strings];
            updatedItems[index] = value;

            setOptions({ strings: updatedItems });
        };

        const hasLetterSupport = rotatorStyles.filter(({ letters, value }) => letters && value === options.effect).length;

        useEffect(() => setState({ ...attributes }), [activeFormat]);

        return (
            <>
                <BlockControls group="default">
                    <ToolbarGroup>
                        <ToolbarButton
                            icon={<Dashicon icon="editor-ol" />}
                            title={__('String rotator', 'wecodeart')}
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
                        <TabPanel
                            activeClass="active-tab"
                            className="wecodeart-tabs wecodeart-tabs--popover"
                            tabs={[
                                {
                                    name: 'content',
                                    title: __('Content'),
                                },
                                {
                                    name: 'options',
                                    title: __('Options'),
                                },
                            ]}
                        >
                            {({ name }) => {
                                let render;
                                switch (name) {
                                    case 'content':
                                        render = <>
                                            <BaseControl>
                                                <h4 style={{ marginTop: 0 }}>{__('Text strings', 'wecodeart')}</h4>
                                                {options.strings.map((item, index) => (
                                                    <HStack key={index} style={{ alignItems: 'stretch' }}>
                                                        <TextControl style={{ minWidth: 250 }} disabled={index === 0} placeholder="Lorem ipsum dolor" value={item} onChange={(value) => updateWord(index, value)} />
                                                        {index !== 0 &&
                                                            <Button style={{ height: 32 }} isDestructive isSmall onClick={() => removeWord(index)}>
                                                                <Dashicon icon="no" />
                                                            </Button>
                                                        }
                                                    </HStack>
                                                ))}
                                                <Button isPrimary onClick={addWord}><Dashicon icon="plus-alt" /></Button>
                                            </BaseControl>
                                        </>
                                        break;
                                    case 'options':
                                        render = <>
                                            <p style={{ marginTop: 0 }}>
                                                <SelectControl
                                                    label={__('Style')}
                                                    value={options.effect}
                                                    options={rotatorStyles}
                                                    onChange={(effect) => setOptions({ effect })}
                                                />
                                            </p>
                                            <p>
                                                <NumberControl
                                                    label={__('Delay')}
                                                    value={options.changeDelay}
                                                    placeholder={__('Default')}
                                                    min={100}
                                                    step={100}
                                                    help={__('Delay for changing the next string.', 'wecodeart')}
                                                    onChange={(changeDelay) => setOptions({ changeDelay: changeDelay ? parseInt(changeDelay) : '' })}
                                                />
                                            </p>
                                            {hasLetterSupport ? <p>
                                                <ToggleControl
                                                    label={__('Letters')}
                                                    checked={options.letters ?? false}
                                                    help={__('Animate letters - if style supports it.', 'wecodeart')}
                                                    onChange={(letters) => setOptions({
                                                        letters: letters ? true : null,
                                                        letterDelay: letters !== true ? null : options.letterDelay
                                                    })}
                                                />
                                                {options.letters && <NumberControl
                                                    label={__('Letter Delay')}
                                                    value={options.letterDelay}
                                                    placeholder={__('Default')}
                                                    min={10}
                                                    step={10}
                                                    help={__('Delay for changing the next letter - if style supports it.', 'wecodeart')}
                                                    onChange={(letterDelay) => setOptions({ letterDelay: letterDelay ? parseInt(letterDelay) : '' })}
                                                />}
                                            </p> : null}
                                            <p>
                                                <TextControl
                                                    label={__('Custom class')}
                                                    value={options?.className}
                                                    onChange={(className) => setOptions({ className })}
                                                />
                                            </p>
                                        </>
                                        break;
                                }
                                return render;
                            }}
                        </TabPanel>
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
