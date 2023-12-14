<?php
/**
 * WeCodeArt Framework.
 *
 * WARNING: This file is part of the core WeCodeArt Framework. DO NOT edit this file under any circumstances.
 * Please do all modifications in the form of a child theme.
 *
 * @package 	WeCodeArt Framework
 * @subpackage 	Support\Modules\Formatting
 * @copyright   Copyright (c) 2023, WeCodeArt Framework
 * @since 		6.3.0
 * @version		6.3.0
 */

namespace WeCodeArt\Support\Modules;

defined( 'ABSPATH' ) || exit;

use WeCodeArt\Singleton;
use WeCodeArt\Integration;
use WeCodeArt\Config\Traits\Asset;
use WeCodeArt\Conditional\Traits\No_Conditionals;
use function WeCodeArt\Functions\get_prop;

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
		// Register styles component.
		wecodeart( 'styles' )->Components->register( 'modules/formatting', Formatting\Styles::class );

		// Enqueue assets hooks.
		\add_action( 'wp_enqueue_scripts', 					[ $this, 'frontend_assets'		], 20, 1 );
		\add_action( 'enqueue_block_editor_assets',			[ $this, 'editor_assets' 		], 20, 1 );

		// Default text decoration styles.
		\add_filter( 'wecodeart/filter/gutenberg/settings',	[ $this, 'decoration_styles'	], 20, 2 );

		// Decode url encoded options.
		add_filter( 'render_block', 						[ $this, 'render_block' 		], 20, 2 );
	}

	/**
	 * Filter render.
	 *
	 * @return  string
	 */
	public function render_block( $content, $block ): string {
		if ( strpos( $content, 'data-options="' ) === false ) {
			return $content;
		}

		// Use a regular expression to find all instances of 'data-options' attribute
		$pattern = '/data-options="([^"]*)"/';

		// Replace callback function
		$callback = function( $matches ) {
			$decoded 	= urldecode( $matches[1] );
			$json 		= json_decode( $decoded, true );
			
			if ( json_last_error() === JSON_ERROR_NONE ) {
				$encoded = json_encode( $json, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE );
				$encoded = str_replace( "'", "`", $encoded );
				
				return 'data-options="' . esc_attr( $encoded ) . '"';
			}

			return $matches[0];
		};

		return preg_replace_callback( $pattern, $callback, $content );
	}

	/**
	 * Frontend only.
	 *
	 * @return  void
	 */
	public function frontend_assets(): void {
		wecodeart( 'assets' )->add_script( $this->make_handle(), [
			'path' 		=> $this->get_asset( 'js', 'front' ),
			'deps'		=> [ 'wecodeart-support-assets' ],
			'load'		=> function( $blocks, $content, $template ) {
				if( str_contains( $content, 'has-decoration' ) || str_contains( $template, 'has-decoration' ) ) {
					wecodeart( 'styles' )->Components->load( [ 'modules/formatting' ] );
				}
				
				if( str_contains( $content, 'has-popper' ) || str_contains( $template, 'has-popper' ) ) {
					wecodeart( 'styles' )->Components->load( [ 'tooltip', 'popover' ] );
					
					return true;
				}

				return false;
			},
		] );
	}

	/**
	 * Editor only.
	 *
	 * @return  void
	 */
	public function editor_assets(): void {
		wp_enqueue_style(
			$this->make_handle(),
			$this->get_asset( 'css', 'index' ),
			[],
			wecodeart( 'version' )
		);

		wp_enqueue_script(
			$this->make_handle(),
			$this->get_asset( 'js', 'index' ),
			[ 'wecodeart-gutenberg' ],
			wecodeart( 'version' )
		);

		wp_set_script_translations( $this->make_handle(), 'wecodeart', wecodeart_config( 'directories' )['languages'] );
	}

	/**
	 * Add new block editor settings for custom classes.
	 *
	 * @param array  $settings 	The editor settings.
	 * @param object $post 		The post being edited.
	 *
	 * @return array Returns updated editors classes suggestions.
	 */
	public function decoration_styles( array $settings, $post ): array {
		if ( ! isset( $settings[ 'decorationStyles' ] ) ) {
			$settings['decorationStyles'] = apply_filters( 'wecodeart/filter/gutenberg/settings/decoration', [
				[
					'label' => __( 'Underline', 'wecodeart' ),
					'value' => 'underline',
				],
				[
					'label' => __( 'Brush', 'wecodeart' ),
					'value' => 'brush',
				],
				[
					'label' => __( 'Brush - Secondary', 'wecodeart' ),
					'value' => 'brush-secondary',
				],
				[
					'label' => __( 'Pencil', 'wecodeart' ),
					'value' => 'pencil',
				],
				[
					'label' => __( 'Lines', 'wecodeart' ),
					'value' => 'lines',
				],
				[
					'label' => __( 'Lines - Secondary', 'wecodeart' ),
					'value' => 'lines-secondary',
				],
				[
					'label' => __( 'Oval', 'wecodeart' ),
					'value' => 'oval',
				],
				[
					'label' => __( 'Oval - Secondary', 'wecodeart' ),
					'value' => 'oval-secondary',
				],
				[
					'label' => __( 'Oval - Tertiary', 'wecodeart' ),
					'value' => 'oval-tertiary',
				],
				[
					'label' => __( 'Marker', 'wecodeart' ),
					'value' => 'marker',
				]
			], $post );
		}

		return $settings;
	}

	/**
	 * Get File
	 *
	 * @return string
	 */
	public static function get_asset( string $type, string $name ): string {
		$file_path = wecodeart_if( 'is_dev_mode' ) ? 'unminified' : 'minified';
		$file_name = wecodeart_if( 'is_dev_mode' ) ? $name . '.' . $type :  $name . '.min.' . $type;
		$file_path = wecodeart_config( 'paths' )['uri'] . '/inc/support/modules/formatting/assets/' . $file_path . '/' . $type . '/' . $file_name;

		return esc_url( $file_path );
	}
}