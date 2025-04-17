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
        ToolbarGroup,
        ToolbarButton,
        Dashicon,
        Button,
        ButtonGroup,
        Popover,
        TabPanel,
        ToggleControl,
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
const name = 'wca/counter';

export const counter = {
    name,
    title: __('Counter', 'wecodeart'),
    tagName: 'span',
    className: 'has-counter',
    attributes: {
        'data-wp-context': 'data-wp-context',
    },
    edit({ isActive, value, onChange }) {
        const { text, start, end } = value;
        const selection = text.substring(start, end);
        const activeFormat = getActiveFormat(value, name);
        const { attributes = { 'data-wp-context': JSON.stringify({ to: '' }) } } = activeFormat || {};
        const buttonRef = useRef(null);

        // Modal state
        const [isOpen, setIsOpen] = useState(false);

        const toggle = () => {
            setIsOpen(!isOpen);

            if (!selection || options.to.length) {
                return;
            }

            const formatted = parseFloat(selection.replace(',', ''));

            setOptions({ to: isNaN(formatted) ? 0 : formatted });
        };

        // Options state
        const [state, setState] = useState({ ...attributes });

        const options = JSON.parse(decodeURIComponent(state['data-wp-context'] || '{}'));

        const setOptions = (value) => {
            let newOptions = { ...options, ...value };
            newOptions = Object.fromEntries(Object.entries(newOptions).filter(([_, v]) => v !== null && v !== ''));

            setState({ ...state, 'data-wp-context': encodeURIComponent(JSON.stringify(newOptions)) });
        };

        useEffect(() => setState({ ...attributes }), [activeFormat]);

        return (
            <>
                <BlockControls>
                    <ToolbarGroup>
                        <ToolbarButton
                            icon={<Dashicon icon="upload" />}
                            title={__('Counter', 'wecodeart')}
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
                                            <p style={{ marginTop: 0 }}>
                                                <NumberControl
                                                    label={__('Count to', 'wecodeart')}
                                                    value={options.to}
                                                    disabled
                                                />
                                            </p>
                                            <p>
                                                <NumberControl
                                                    label={__('Count from', 'wecodeart')}
                                                    value={options.from}
                                                    placeholder={0}
                                                    min={0}
                                                    help={__('Counter starts from a specific value.', 'wecodeart')}
                                                    onChange={(from) => setOptions({ from: from ? parseInt(from) : '' })}
                                                />
                                            </p>
                                        </>
                                        break;
                                    case 'options':
                                        render = <>
                                            <p style={{ marginTop: 0 }}>
                                                <NumberControl
                                                    label={__('Speed')}
                                                    value={options.speed}
                                                    placeholder={__('Default')}
                                                    min={1000}
                                                    step={10}
                                                    help={__('Duration of the counter animation - in ms.', 'wecodeart')}
                                                    onChange={(speed) => setOptions({ speed: speed ? parseInt(speed) : null })}
                                                />
                                            </p>
                                            <p>
                                                <NumberControl
                                                    label={__('Refresh')}
                                                    value={options.refresh}
                                                    placeholder={__('Default')}
                                                    min={10}
                                                    step={10}
                                                    help={__('Refresh interval of the counter animation - in ms.', 'wecodeart')}
                                                    onChange={(refresh) => setOptions({ refresh: refresh ? parseInt(refresh) : null })}
                                                />
                                            </p>
                                            <p>
                                                <NumberControl
                                                    label={__('Decimals')}
                                                    value={options.decimals}
                                                    placeholder={0}
                                                    min={0}
                                                    step={1}
                                                    max={10}
                                                    help={__('Allow decimals.', 'wecodeart')}
                                                    onChange={(decimals) => setOptions({ decimals: decimals ? parseInt(decimals) : null })}
                                                />
                                            </p>
                                            <p>
                                                <ToggleControl
                                                    label={__('Comma')}
                                                    checked={options.comma ?? false}
                                                    help={__('Allow comma number formatting.', 'wecodeart')}
                                                    onChange={(comma) => setOptions({ comma: comma === true ? true : null })}
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
