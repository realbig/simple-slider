<?php
/*
Plugin Name: Real Big Simple Slider
Description: Simple Image Slider Shortcode. [realbig_slider ids = "1,2,3"]
Version: 0.1
Author: Eric Defore
License: GPL
*/

add_action( 'admin_init', 'add_slider_button_filters' );
function add_slider_button_filters() {
    
     if ( current_user_can( 'edit_posts' ) && current_user_can( 'edit_pages' ) ) {
         
          add_filter( 'mce_buttons', 'register_slider_button' );
          add_filter( 'mce_external_plugins', 'add_slider_button' );
         
     }
    
}

function register_slider_button( $buttons ) {
    
     array_push( $buttons, 'slider_button' );
     return $buttons;
    
}

function add_slider_button( $plugin_array ) {
    
     $plugin_array['slider_button_script'] = plugins_url( '/js/admin/simple-slider-admin.js', __FILE__ ) ;
     return $plugin_array;
    
}