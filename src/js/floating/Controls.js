/**
 * WordPress dependencies
 */
const {
    i18n: {
        __
    },
    components: {
        SelectControl,
        ToggleControl,
        TextControl,
        TextareaControl,
        TabPanel,
        Panel,
        PanelBody,
        PanelRow
    },
} = wp;

const TEMPLATE_HTML = [
    '<div class="wp-floating" role="tooltip">',
    '<div class="wp-floating__arrow"></div>',
    '<h3 class="wp-floating__header"></h3>',
    '<div class="wp-floating__inner"></div>',
    '</div>'
].join('');

const Controls = ({ state, setState }) => {
    const options = JSON.parse(decodeURIComponent(state['data-wp-context'] || '{}'));

    const setOptions = (value) => {
        let newOptions = { ...options, ...value };
        newOptions = Object.fromEntries(Object.entries(newOptions).filter(([_, v]) => v !== null && v !== ''));

        setState({ ...state, 'data-wp-context': encodeURIComponent(JSON.stringify(newOptions)) });
    };

    return (
        <TabPanel
            activeClass="active-tab"
            className="wecodeart-tabs wecodeart-tabs--modal"
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
                            <SelectControl
                                label={__('Type')}
                                value={options?.plugin ?? 'tooltip'}
                                options={[
                                    { label: __('Tooltip'), value: 'tooltip' },
                                    { label: __('Popover'), value: 'popover' },
                                ]}
                                onChange={(plugin) => {
                                    setOptions({ plugin, content: plugin === 'tooltip' ? '' : options?.content });
                                }}
                            />
                            <TextareaControl
                                label={__('Title')}
                                value={options?.title}
                                onChange={(title) => setOptions({ title: title ?? '' })}
                            />
                            {options?.plugin === 'popover' && (
                                <TextareaControl
                                    label={__('Content')}
                                    value={options?.content}
                                    onChange={(content) => setOptions({ content })}
                                />
                            )}
                        </>
                        break;
                    case 'options':
                        render = <>
                            <SelectControl
                                label={__('Trigger', 'wecodeart')}
                                value={options?.trigger ? options.trigger.split(' ') : ['']}
                                multiple={true}
                                help={__('How tooltip is triggered: click, hover, focus, manual.', 'wecodeart')}
                                options={[
                                    { label: __('Default'), value: '' },
                                    { label: __('Hover'), value: 'hover' },
                                    { label: __('Focus'), value: 'focus' },
                                    { label: __('Click'), value: 'click' },
                                    { label: __('Manual'), value: 'manual' },
                                ]}
                                onChange={(trigger) => setOptions({ trigger: trigger.join(' ') })}
                            />
                            <SelectControl
                                label={__('Position')}
                                value={options?.placement}
                                help={__('How to position the tooltip.', 'wecodeart')}
                                options={[
                                    { label: __('Default'), value: '' },
                                    { label: __('Auto'), value: 'auto' },
                                    { label: __('Top'), value: 'top' },
                                    { label: __('Left'), value: 'left' },
                                    { label: __('Right'), value: 'right' },
                                    { label: __('Bottom'), value: 'bottom' },
                                ]}
                                onChange={(placement) => setOptions({ placement })}
                            />
                            <Panel className="wecodeart-panel wecodeart-panel--advanced">
                                <PanelBody title={__('Advanced settings', 'wecodeart')} initialOpen={false}>
                                    <PanelRow>
                                        <TextControl
                                            label={__('Delay')}
                                            value={options?.delay}
                                            placeholder="0, 0"
                                            help={__('Delay showing and hiding the popover (ms) — doesn`t apply to manual trigger type.', 'wecodeart')}
                                            onChange={(delay) => setOptions({ delay: delay ? delay : '' })}
                                        />
                                        <TextControl
                                            label={__('Offset')}
                                            value={options?.offset}
                                            placeholder="0, 0"
                                            help={__('Offset of the tooltip relative to its target — comma separated values like: 10, 20, 10 for different axis.', 'wecodeart')}
                                            onChange={(offset) => setOptions({ offset: offset ? offset : '' })}
                                        />
                                        <TextControl
                                            label={__('Container')}
                                            value={options?.container}
                                            placeholder="false"
                                            help={__('Appends the tooltip to a specific element.', 'wecodeart')}
                                            onChange={(container) => setOptions({ container })}
                                        />
                                        <TextControl
                                            label={__('Custom class')}
                                            value={options?.className}
                                            help={__('Add classes to the tooltip when it is shown.', 'wecodeart')}
                                            onChange={(className) => setOptions({ className })}
                                        />
                                        <ToggleControl
                                            label={__('Animation')}
                                            checked={options?.animation ?? true}
                                            help={__('Apply a CSS fade transition to the tooltip.', 'wecodeart')}
                                            onChange={(animation) => setOptions({ animation })}
                                        />
                                        <ToggleControl
                                            label={__('HTML')}
                                            checked={options?.html ?? false}
                                            help={__('Allow HTML in the tooltip.', 'wecodeart')}
                                            onChange={(html) => setOptions({ html })}
                                        />
                                        <ToggleControl
                                            label={__('Sanitize')}
                                            checked={options?.sanitize ?? true}
                                            help={__(`Enable or disable the sanitization. If activated 'template', 'content' and 'title' options will be sanitized.`, 'wecodeart')}
                                            onChange={(sanitize) => setOptions({ sanitize })}
                                        />
                                        <TextareaControl
                                            label={__('Template')}
                                            help={__('Base HTML to use when creating the tooltip. ', 'wecodeart')}
                                            value={options?.template}
                                            placeholder={TEMPLATE_HTML}
                                            onChange={(template) => setOptions({ template })}
                                        />
                                    </PanelRow>
                                </PanelBody>
                            </Panel>
                        </>
                        break;
                }

                return render;
            }}
        </TabPanel>
    );
}

export default Controls;