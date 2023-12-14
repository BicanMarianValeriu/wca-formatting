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
        __experimentalNumberControl: NumberControl,
        TextControl,
        TextareaControl,
        TabPanel,
        Panel,
        PanelBody,
        PanelRow
    },
} = wp;

const Controls = ({ state, setState }) => {
    const options = JSON.parse(decodeURIComponent(state?.['data-options'] || '{}'));

    const setOptions = (value) => {
        let newOptions = { ...options, ...value };
        newOptions = Object.fromEntries(Object.entries(newOptions).filter(([_, v]) => v !== null && v !== ''));

        setState({ ...state, 'data-options': encodeURIComponent(JSON.stringify(newOptions)) });
    };

    return (
        <TabPanel
            activeClass="active-tab"
            className="wecodeart-tabs wecodeart-tabs--popper"
            tabs={[
                {
                    name: 'content',
                    title: __('Content', 'wecodeart'),
                },
                {
                    name: 'options',
                    title: __('Options', 'wecodeart'),
                },
            ]}
        >
            {({ name }) => {
                let render;

                switch (name) {
                    case 'content':
                        render = <>
                            <SelectControl
                                label={__('Type', 'wecodeart')}
                                value={state?.['data-plugin'] ?? 'tooltip'}
                                options={[
                                    { label: 'Tooltip', value: 'tooltip' },
                                    { label: 'Popover', value: 'popover' },
                                ]}
                                onChange={(type) => setState({ 'data-plugin': type })}
                            />
                            <TextareaControl
                                label={__('Title', 'wecodeart')}
                                value={options?.title}
                                onChange={(title) => setOptions({ title })}
                            />
                            {state?.['data-plugin'] === 'popover' && (
                                <TextareaControl
                                    label={__('Content', 'wecodeart')}
                                    value={options?.content}
                                    onChange={(content) => setOptions({ content })}
                                />
                            )}
                        </>
                        break;
                    case 'options':
                        function templatePlaceholder() {
                            const type = state?.['data-plugin'] ?? 'tooltip';

                            return `<div class="${type}" role="tooltip"><div class="${type}-arrow"></div><div class="${type}-inner"></div></div>`;
                        }

                        render = <>
                            <SelectControl
                                label={__('Placement', 'wecodeart')}
                                value={options?.placement}
                                help={__('How to position the tooltip.', 'wecodeart')}
                                options={[
                                    { label: __('Default', 'wecodeart'), value: '' },
                                    { label: __('Auto', 'wecodeart'), value: 'auto' },
                                    { label: __('Top', 'wecodeart'), value: 'top' },
                                    { label: __('Left', 'wecodeart'), value: 'left' },
                                    { label: __('Right', 'wecodeart'), value: 'right' },
                                    { label: __('Bottom', 'wecodeart'), value: 'bottom' },
                                ]}
                                onChange={(placement) => setOptions({ placement })}
                            />
                            <NumberControl
                                label={__('Delay', 'wecodeart')}
                                value={options?.delay}
                                placeholder="0"
                                min={0}
                                step={10}
                                help={__('Delay showing and hiding the popover (ms) — doesn`t apply to manual trigger type.', 'wecodeart')}
                                onChange={(delay) => setOptions({ delay: delay ? parseFloat(delay) : '' })}
                            />
                            <TextControl
                                label={__('Offset', 'wecodeart')}
                                value={options?.offset}
                                placeholder="0, 0"
                                help={__('Offset of the tooltip relative to its target — comma separated values like: 10,20.', 'wecodeart')}
                                onChange={(offset) => setOptions({ offset })}
                            />
                            <Panel className="wecodeart-panel wecodeart-panel--advanced">
                                <PanelBody title={__('Advanced settings', 'wecodeart')} initialOpen={false}>
                                    <PanelRow>
                                        <SelectControl
                                            label={__('Trigger', 'wecodeart')}
                                            value={options?.trigger ? options.trigger.split(' ') : ['']}
                                            multiple={true}
                                            help={__('How tooltip is triggered: click, hover, focus, manual.', 'wecodeart')}
                                            options={[
                                                { label: __('Default', 'wecodeart'), value: '' },
                                                { label: __('Hover', 'wecodeart'), value: 'hover' },
                                                { label: __('Focus', 'wecodeart'), value: 'focus' },
                                                { label: __('Click', 'wecodeart'), value: 'click' },
                                                { label: __('Manual', 'wecodeart'), value: 'manual' },
                                            ]}
                                            onChange={(trigger) => setOptions({ trigger: trigger.join(' ') })}
                                        />
                                        <TextControl
                                            label={__('Selector', 'wecodeart')}
                                            value={options?.selector}
                                            placeholder="false"
                                            help={__('If a selector is provided, tooltip objects will be delegated to the specified targets.', 'wecodeart')}
                                            onChange={(selector) => setOptions({ selector })}
                                        />
                                        <TextControl
                                            label={__('Container', 'wecodeart')}
                                            value={options?.container}
                                            placeholder="false"
                                            help={__('Appends the tooltip to a specific element.', 'wecodeart')}
                                            onChange={(container) => setOptions({ container })}
                                        />
                                        <TextControl
                                            label={__('Custom class', 'wecodeart')}
                                            value={options?.customClass}
                                            help={__('Add classes to the tooltip when it is shown.', 'wecodeart')}
                                            onChange={(customClass) => setOptions({ customClass })}
                                        />
                                        <ToggleControl
                                            label={__('Animation', 'wecodeart')}
                                            checked={options?.animation ?? true}
                                            help={__('Apply a CSS fade transition to the tooltip.', 'wecodeart')}
                                            onChange={(animation) => setOptions({ animation })}
                                        />
                                        <ToggleControl
                                            label={__('HTML', 'wecodeart')}
                                            checked={options?.html ?? false}
                                            help={__('Allow HTML in the tooltip.', 'wecodeart')}
                                            onChange={(html) => setOptions({ html })}
                                        />
                                        <ToggleControl
                                            label={__('Sanitize', 'wecodeart')}
                                            checked={options?.sanitize ?? true}
                                            help={__(`Enable or disable the sanitization. If activated 'template', 'content' and 'title' options will be sanitized.`, 'wecodeart')}
                                            onChange={(sanitize) => setOptions({ sanitize })}
                                        />
                                        <TextareaControl
                                            label={__('Template', 'wecodeart')}
                                            help={__('Base HTML to use when creating the tooltip. ', 'wecodeart')}
                                            value={options?.template}
                                            placeholder={templatePlaceholder()}
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