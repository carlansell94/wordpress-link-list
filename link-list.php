<?php
/**
 * Plugin Name:       Link List
 * Description:       A block to display a list of links, with custom titles, descriptions and icons.
 * Requires at least: 5.9
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            Carl Ansell
 * Author URI:        https://carlansell.co.uk
 * License:           GPL-3.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-3.0.html
 * Text Domain:       qb-link-list
 */

 function link_list_init()
 {
     register_block_type_from_metadata(
         __DIR__ . '/build'
     );
 }
 
 add_action( 'init', 'link_list_init' );
