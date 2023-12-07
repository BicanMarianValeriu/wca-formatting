<?php
/**
 * WeCodeArt Framework.
 *
 * WARNING: This file is part of the core WeCodeArt Framework. DO NOT edit this file under any circumstances.
 * Please do all modifications in the form of a child theme.
 *
 * @package 	WeCodeArt Framework
 * @subpackage 	Support\Formatting
 * @copyright   Copyright (c) 2023, WeCodeArt Framework
 * @since 		6.3.0
 * @version		6.3.0
 */

namespace WeCodeArt\Support;

defined( 'ABSPATH' ) || exit;

use WeCodeArt\Singleton;
use WeCodeArt\Integration;
use WeCodeArt\Config\Traits\Asset;
use WeCodeArt\Conditional\Traits\No_Conditionals;

/**
 * The Formatting object.
 */
final class Formatting implements Integration {

    use Asset;
    use Singleton;
	use No_Conditionals;

	/**
	 * Send to Constructor
	 */
	public function register_hooks() {
		add_action( 'enqueue_block_editor_assets', 	[ $this, 'block_editor_assets' ], 20, 1 );
	}

	/**
	 * Editor only.
	 *
	 * @return  void
	 */
	public function block_editor_assets() {
		wp_enqueue_script(
			$this->make_handle(),
			$this->get_asset( 'js', 'index' ),
			[ 'wecodeart-gutenberg' ],
			wecodeart( 'version' )
		);

		wp_set_script_translations( $this->make_handle(), 'wecodeart', wecodeart_config( 'directories' )['languages'] );
	}

	/**
	 * Get File
	 *
	 * @return string
	 */
	public static function get_asset( string $type, string $name ): string {
		$file_path = wecodeart_if( 'is_dev_mode' ) ? 'unminified' : 'minified';
		$file_name = wecodeart_if( 'is_dev_mode' ) ? $name . '.' . $type :  $name . '.min.' . $type;
		$file_path = wecodeart_config( 'paths' )['uri'] . '/inc/support/formatting/assets/' . $file_path . '/' . $type . '/' . $file_name;

		return esc_url( $file_path );
	}
}