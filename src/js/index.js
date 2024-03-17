/**
 * WordPress dependencies
 */
const { registerFormatType } = wp.richText;
const { registerPlugin } = wp.plugins;

/**
 * Internal dependencies
 */
import { counter } from './counter';
import { floating } from './floating';
import { justify } from './justify';
import { underline } from './underline';
import { decoration } from './decoration';
import { abbreviation } from './abbreviation';
import { rotator } from './rotator';
import plugin from './plugin';

import './../scss/index.scss';

function registerWeCodeArtFormats() {
	[
		counter,
		floating,
		justify,
		rotator,
		underline,
		decoration,
		abbreviation,
	].forEach(({ name, ...settings }) => {
		if (name) {
			registerFormatType(name, settings);
		}
	});
}

function registerFormattingPlugin() {
	const { name, render } = plugin;

	registerPlugin(name, { icon: false, render });
}

wp.domReady(() => {
	registerWeCodeArtFormats();
	registerFormattingPlugin();
});
