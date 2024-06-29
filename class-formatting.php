<?php
/**
 * WeCodeArt Framework.
 *
 * WARNING: This file is part of the core WeCodeArt Framework. DO NOT edit this file under any circumstances.
 * Please do all modifications in the form of a child theme.
 *
 * @package 	WeCodeArt Framework
 * @subpackage 	Support\Modules\Formatting
 * @copyright   Copyright (c) 2024, WeCodeArt Framework
 * @since 		6.3.0
 * @version		6.4.4
 */

namespace WeCodeArt\Support\Modules;

defined( 'ABSPATH' ) || exit;

use WeCodeArt\Singleton;
use WeCodeArt\Integration;
use WeCodeArt\Config\Traits\Asset;
use WeCodeArt\Conditional\Traits\No_Conditionals;
use function WeCodeArt\Functions\{ get_prop, toJSON };

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
		wecodeart( 'styles' )->Components->register( 'formatting', 			Formatting\Styles::class );
		wecodeart( 'styles' )->Components->register( 'rotator', 			Formatting\Styles\Rotator::class );
		wecodeart( 'styles' )->Components->register( 'rotator/slide', 		Formatting\Styles\Rotator\Slide::class );
		wecodeart( 'styles' )->Components->register( 'rotator/zoom', 		Formatting\Styles\Rotator\Zoom::class );
		wecodeart( 'styles' )->Components->register( 'rotator/scale', 		Formatting\Styles\Rotator\Scale::class );
		wecodeart( 'styles' )->Components->register( 'rotator/rotate', 		Formatting\Styles\Rotator\Rotate::class );
		wecodeart( 'styles' )->Components->register( 'floating', 			Formatting\Styles\Floating::class );
		wecodeart( 'styles' )->Components->register( 'floating/tooltip', 	Formatting\Styles\Floating\Tooltip::class );
		wecodeart( 'styles' )->Components->register( 'floating/popover', 	Formatting\Styles\Floating\Popover::class );

		// Enqueue assets hooks.
		\add_action( 'wp_enqueue_scripts', 					[ $this, 'frontend_assets'	], 20, 1 );
		\add_action( 'enqueue_block_editor_assets',			[ $this, 'editor_assets'	], 20, 1 );
		// Extend Gutenberg settings.
		\add_filter( 'wecodeart/filter/gutenberg/settings',	[ $this, 'editor_settings'	], 20, 2 ); 
		// Decode url encoded options.
		\add_filter( 'render_block', 						[ $this, 'render_block'		], PHP_INT_MAX, 2 );
	}

	/**
	 * Filter render.
	 *
	 * @param	string	$content
	 * @param	array	$block
	 *
	 * @return  string
	 */
	public function render_block( string $content, array $block ): string {
		// Only allowed blocks to avoid unnecessary passes.
		if( ! in_array( get_prop( $block, [ 'blockName' ] ), self::get_blocks(), true ) ) {
			return $content;
		}

		// Decoration
		if( strpos( $content, 'has-decoration' ) ) {
			\wecodeart( 'styles' )->Components->load( [ 'formatting' ] );
		}

		// Floating
		if ( strpos( $content, 'has-floating' ) ) {
			$p = wecodeart( 'dom' )::procesor( $content );

			\wecodeart( 'styles' )->Components->load( [ 'formatting', 'floating/tooltip', 'floating/popover' ] );

			while( $p->next_tag( [ 'class_name' => 'has-floating' ] ) ) {
				$json 	= json_decode( urldecode( $p->get_attribute( 'data-wp-context' ) ), true );

				if ( json_last_error() === JSON_ERROR_NONE ) {
					$triggers = explode( ' ', get_prop( $json, [ 'trigger' ], 'hover focus' ) );
					
					$p->set_attribute( 'data-wp-context', esc_attr( toJSON( $json ) ) );
					$p->set_attribute( 'data-wp-interactive', 'wecodeart/floating' );
					$p->set_attribute( 'data-wp-init--validate', 'callbacks.validateConfig' );

					if( in_array( 'click', $triggers, true ) ) {
						$p->set_attribute( 'data-wp-on--click', 'actions.toggle' );
					} elseif( ! in_array( 'manual', $triggers, true ) ) {
						if( in_array( 'hover', $triggers, true ) ) {
							$p->set_attribute( 'data-wp-on--mouseenter', 'actions.enter' );
							$p->set_attribute( 'data-wp-on--mouseleave', 'actions.leave' );
						}
						
						if( in_array( 'focus', $triggers, true ) ) {
							$p->set_attribute( 'data-wp-on--focusin', 'actions.enter' );
							$p->set_attribute( 'data-wp-on--focusout', 'actions.leave' );
						}
					}

					$p->set_attribute( 'tabindex', '0' );
				}
			}

			$content = $p->get_updated_html();

			\wp_enqueue_script_module( '@wecodeart/floating' );
			\wp_enqueue_script( 'wecodeart-support-assets-template' );

			\wp_interactivity_state( 'wecodeart/floating', apply_filters( 'wecodeart/filter/interactive/state/floating', [
				'isEnabled'	=> true,
				'boundary' 	=> 'clippingParents',
				'placement'	=> 'top',
				'fallbackPlacements' => ['top', 'right', 'bottom', 'left'],
				'offset' 	=> [8],
				'shift'		=> false,
				'delay' 	=> 0,
				'className' => '',
				'title' 	=> '',
				'content'	=> '',
				'trigger' 	=> 'hover focus',
				'animation' => true,
				'container' => false,
				'html' 		=> false,
				'sanitize' 	=> true,
				'sanitizeFn' => null,
				'template' 	=> join( '', [
					'<div class="wp-floating" role="tooltip">',
					'<div class="wp-floating__arrow"></div>',
					'<h3 class="wp-floating__head"></h3>',
					'<div class="wp-floating__body"></div>',
					'</div>'
				] ),
			] ) );

			\wp_interactivity_config( 'wecodeart/floating', [
				'isEnabled' => '(boolean|function)',
				'boundary' 	=> '(string|element)',
				'placement' => '(string|function)',
				'fallbackPlacements' => 'array',
				'offset' 	=> '(array|object|string|function)',
				'shift' 	=> '(null|boolean|object|function)',
				'delay' 	=> '(number|object)',
				'className' => '(string|function)',
				'title'  	=> '(string|element|function)',
				'content'  	=> '(null|string|element|function)',
				'trigger' 	=> 'string',
				'animation' => 'boolean',
				'container' => '(string|element|boolean|null)',
				'html' 		=> 'boolean',
				'sanitize' 	=> 'boolean',
				'sanitizeFn' => '(null|function)',
				'template' 	=> 'string',
			] );
		}

		// Rotator
		if ( strpos( $content, 'has-rotator' ) ) {
			$p = wecodeart( 'dom' )::procesor( $content );

			while( $p->next_tag( [ 'class_name' => 'has-rotator' ] ) ) {
				$json 	= json_decode( urldecode( $p->get_attribute( 'data-wp-context' ) ), true );

				if ( json_last_error() === JSON_ERROR_NONE ) {
					$effect = get_prop( $json, [ 'effect' ], 'slide' );
					
					$p->set_attribute( 'data-wp-context', esc_attr( toJSON( $json ) ) );
					$p->set_attribute( 'data-wp-interactive', 'wecodeart/rotator' );
					$p->set_attribute( 'data-wp-init--validate', 'callbacks.validateConfig' );

					if( get_prop( $json, [ 'letters' ] ) ) {
						$p->set_attribute( 'data-wp-init--letters', 'callbacks.wrapLetters' );
					}

					$p->set_attribute( 'data-wp-init--run', 'actions.init' );
					$p->set_attribute( 'data-wp-watch', 'actions.changeString' );

					$p->add_class( 'has-rotator--' . $effect );

					if( $class = get_prop( $json, [ 'className' ], '' ) ) {
						$p->add_class( $class );
					}

					// CSS Requirements
					\wecodeart( 'styles' )->Components->load( [ 'rotator/' . $effect ] );
				}
			}

			$content = $p->get_updated_html();

			// Template replacement - skipping processed ones, due tu multiple render_block applications.
			$pattern = '/(<span[^>]+class="[^"]*has-rotator[^"]*"[^>]*>)(?:(?!<template).)*?(<\/span>)/s';
			$replace = '$1<template data-wp-each--string="context.strings"><span data-wp-text="context.string"></span></template>$2';
			$content = preg_replace( $pattern, $replace, $content );

			// Not necessary due to how WP Interactivity Works (still causes flash when JS takes over)
			// $content = wp_interactivity_process_directives( $content );
			
			\wp_enqueue_script_module( '@wecodeart/rotator' );

			\wp_interactivity_state( 'wecodeart/rotator', apply_filters( 'wecodeart/filter/interactive/state/rotator', [
				'strings'		=> [],
				'effect'		=> 'slide',
				'direction' 	=> 1,
				'changeDelay' 	=> 3000,
				'className'		=> '',
				'letters'		=> null,
				'letterDelay'	=> 100,
			] ) );
				
			\wp_interactivity_config( 'wecodeart/rotator', [
				'strings'		=> 'array',
				'effect'		=> 'string',
				'direction' 	=> 'number',
				'letters'		=> '(null|boolean)',
				'changeDelay' 	=> '(null|number|string)',
				'letterDelay' 	=> '(null|number|string)',
				'className'		=> '(null|string)'
			] );
		}

		// Counter
		if ( strpos( $content, 'has-counter' ) ) {
			$p = wecodeart( 'dom' )::procesor( $content );

			$from = [];

			while( $p->next_tag( [ 'class_name' => 'has-counter' ] ) ) {
				$json 	= json_decode( urldecode( $p->get_attribute( 'data-wp-context' ) ), true );

				if ( json_last_error() === JSON_ERROR_NONE ) {
					$from[] = get_prop( $json, [ 'from' ], 0 );
					
					$p->set_attribute( 'data-wp-context', esc_attr( toJSON( $json ) ) );
					$p->set_attribute( 'data-wp-interactive', 'wecodeart/counter' );
					$p->set_attribute( 'data-wp-init--validate', 'callbacks.validateConfig' );
					$p->set_attribute( 'data-wp-init--observe', 'actions.observe' );
					$p->set_attribute( 'data-wp-text', 'state.countTo' );
				}
			}

			$content = $p->get_updated_html();

			// Foreach of the tags found above, update innerHTML with the from value
			// while making sure we dont exceed the length of $from array
			$index	 = 0;
			$content = preg_replace_callback(
				'/(<span[^>]+class="[^"]*has-counter[^"]*"[^>]*>).*?(<\/span>)/', 
				static function( $m ) use( $from, &$index ) {
					$replacement = $from[$index] ?? '0';
					$index++;
					
					return $m[1] . $replacement . $m[2];
				},
				$content,
				count( $from )
			);
			
			\wp_enqueue_script_module( '@wecodeart/counter' );

			\wp_interactivity_state( 'wecodeart/counter', apply_filters( 'wecodeart/filter/interactive/state/counter', [
				'from'		=> 0,
				'to'		=> 0,
				'speed'		=> 1000,
				'refresh'	=> 100,
				'decimals'	=> 0,
				'comma'		=> false,
				'offset'	=> -100,
				'onUpdate'	=> null,
				'onComplete'=> null,
			] ) );
				
			\wp_interactivity_config( 'wecodeart/counter', [
				'from'		=> 'number',
				'to'		=> 'number',
				'speed' 	=> 'number',
				'refresh' 	=> 'number',
				'decimals' 	=> 'number',
				'comma'		=> 'boolean',
				'offset' 	=> '(null|number)',
				'onUpdate'	=> '(null|function)',
				'onComplete'=> '(null|function)',
			] );
		}

		return $content;
	}

	/**
	 * Frontend only.
	 *
	 * @return  void
	 */
	public function frontend_assets(): void {
		\wp_register_script_module(
			'@wecodeart/floating',
			$this->get_asset( 'js', 'floating' ),
			[ '@wordpress/interactivity' ],
			wecodeart( 'version' )
		);
		
		\wp_register_script_module(
			'@wecodeart/rotator',
			$this->get_asset( 'js', 'rotator' ),
			[ '@wordpress/interactivity' ],
			wecodeart( 'version' )
		);
		
		\wp_register_script_module(
			'@wecodeart/counter',
			$this->get_asset( 'js', 'counter' ),
			[ '@wordpress/interactivity' ],
			wecodeart( 'version' )
		);
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
	 * @param 	array  $settings 	The editor settings.
	 * @param 	object $post 		The post being edited.
	 *
	 * @return 	array
	 */
	public function editor_settings( array $settings, $post ): array {
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

		if ( ! isset( $settings[ 'rotatorStyles' ] ) ) {
			$rotators = array_filter( array_keys( wecodeart( 'styles' )->Components->all() ), static fn( $key ) => str_starts_with( $key, 'rotator/' ) );
			$rotators = array_values( array_map( static function( $key ) {
				$slug = explode( '/', $key );
				$slug = end( $slug );

				return [
					'label' 	=> __( ucfirst( $slug ), 'wecodeart' ), 
					'value' 	=> $slug,
					'letters' 	=> true,
				];
			}, $rotators ) );

			$settings['rotatorStyles'] = apply_filters( 'wecodeart/filter/gutenberg/settings/rotator', $rotators, $post );
		}

		return $settings;
	}

	/**
	 * Allowed blocks.
	 *
	 * @return 	array
	 */
	public static function get_blocks(): array {
		return apply_filters( 'wecodeart/filter/formatting/blocks', [
			'core/heading',
			'core/paragraph',
			'core/table',
			'core/code',
			'core/list-item'
		] );
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