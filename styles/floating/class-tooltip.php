<?php
/**
 * WeCodeArt Framework
 *
 * WARNING: This file is part of the core WeCodeArt Framework. DO NOT edit this file under any circumstances.
 * Please do all modifications in the form of a child theme.
 *
 * @package		WeCodeArt Framework
 * @subpackage  Styles\Components
 * @copyright   Copyright (c) 2024, WeCodeArt Framework
 * @since		6.3.7
 * @version		6.3.7
 */

namespace WeCodeArt\Support\Modules\Formatting\Styles\Floating;

defined( 'ABSPATH' ) || exit();

use WeCodeArt\Support\Styles\Components\Base;

/**
 * Module Styles
 */
class Tooltip extends Base {
    /**
     * Component's Style Deps.
     *
     * @var     array
     */
    static $deps = [ 'floating' ];

    /**
	 * Component styles.
	 *
	 * @return 	string
	 */
	public static function styles(): string {
        return <<<CSS
            .wp-floating--tooltip {
                --wp--floating--text-align: center;
                --wp--floating--max-width: 200px;
                --wp--floating--color: var(--wp--preset--color--white);
                --wp--floating--bg: var(--wp--preset--color--dark);
                --wp--floating--opacity: .9;
                --wp--floating--arrow-width: .8rem;
                --wp--floating--arrow-height: .4rem;
            }
            .wp-floating--tooltip .wp-floating__arrow::before {
                position: absolute;
                content: '';
                border-color: transparent;
                border-style: solid;
            }

            /* Top */
            .wp-floating--tooltip.wp-floating--top .wp-floating__arrow,
            .wp-floating--tooltip.wp-floating--auto[data-placement^=top] .wp-floating__arrow {
                bottom: calc(-1 * var(--wp--floating--arrow-height));
            }
            .wp-floating--tooltip.wp-floating--top .wp-floating__arrow::before,
            .wp-floating--tooltip.wp-floating--auto[data-placement^=top] .wp-floating__arrow::before {
                top: -1px;
                border-width: var(--wp--floating--arrow-height) calc(var(--wp--floating--arrow-width) * 0.5) 0;
                border-top-color: var(--wp--floating--bg);
            }

            /* Right */
            /* rtl:begin:ignore */
            .wp-floating--tooltip.wp-floating--end .wp-floating__arrow,
            .wp-floating--tooltip.wp-floating--auto[data-placement^=right] .wp-floating__arrow {
                left: calc(-1 * var(--wp--floating--arrow-height));
                width: var(--wp--floating--arrow-height);
                height: var(--wp--floating--arrow-width);
            }
            .wp-floating--tooltip.wp-floating--end .wp-floating__arrow::before,
            .wp-floating--tooltip.wp-floating--auto[data-placement^=right] .wp-floating__arrow::before {
                right: -1px;
                border-width: calc(var(--wp--floating--arrow-width) * 0.5) var(--wp--floating--arrow-height) calc(var(--wp--floating--arrow-width) * 0.5) 0;
                border-right-color: var(--wp--floating--bg);
            }
            /* rtl:end:ignore */
            
            /* Bottom*/
            .wp-floating--tooltip.wp-floating--bottom .wp-floating__arrow,
            .wp-floating--tooltip.wp-floating--auto[data-placement^=bottom] .wp-floating__arrow {
                top: calc(-1 * var(--wp--floating--arrow-height));
            }
            .wp-floating--tooltip.wp-floating--bottom .wp-floating__arrow::before,
            .wp-floating--tooltip.wp-floating--auto[data-placement^=bottom] .wp-floating__arrow::before {
                bottom: -1px;
                border-width: 0 calc(var(--wp--floating--arrow-width) * 0.5) var(--wp--floating--arrow-height);
                border-bottom-color: var(--wp--floating--bg);
            }
            
            /* Left */
            /* rtl:begin:ignore */
            .wp-floating--tooltip.wp-floating--start .wp-floating__arrow,
            .wp-floating--tooltip.wp-floating--auto[data-placement^=left] .wp-floating__arrow {
                right: calc(-1 * var(--wp--floating--arrow-height));
                width: var(--wp--floating--arrow-height);
                height: var(--wp--floating--arrow-width);
            }
            .wp-floating--tooltip.wp-floating--start .wp-floating__arrow::before,
            .wp-floating--tooltip.wp-floating--auto[data-placement^=left] .wp-floating__arrow::before {
                left: -1px;
                border-width: calc(var(--wp--floating--arrow-width) * 0.5) 0 calc(var(--wp--floating--arrow-width) * 0.5) var(--wp--floating--arrow-height);
                border-left-color: var(--wp--floating--bg);
            }
            /* rtl:end:ignore */
        CSS;
	}
}