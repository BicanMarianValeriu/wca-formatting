/**
 * Internal dependencies
 */
import { justify } from './justify';
import { underline } from './underline';
import { abbreviation } from './abbreviation';

/**
 * WordPress dependencies
 */
const { registerFormatType, unregisterFormatType } = wp.richText;

function registerWeCodeArtFormats() {
	[
		justify,
		underline,
		abbreviation,
	].forEach(({ name, ...settings }) => {
		if (name) {
			unregisterFormatType(name);
			registerFormatType(name, settings);
		}
	});
}

wp.domReady(registerWeCodeArtFormats);
