<?php
/*
Plugin Name: Real Big Simple Slider
Description: Simple Image Slider Shortcode. [realbig_slider ids = "1,2,3"]
Version: 0.1
Author: Eric Defore
License: GPL
*/

class RealBigSlider {

    static $add_frontend_styles_scripts;

    static function init() {

        // Admin
        add_action( 'admin_init', array( __CLASS__, 'add_slider_button_filters' ) );

        // Frontend
        add_shortcode( 'realbig_slider', array( __CLASS__, 'realbig_slider_shortcode_register' ) );
        add_action( 'init', array( __CLASS__, 'register_slider_styles_scripts' ) );
        add_action( 'wp_enqueue_scripts', array( __CLASS__, 'enqueue_slider_styles_scripts' ) );

    }


    static function add_slider_button_filters() {

        if ( current_user_can( 'edit_posts' ) && current_user_can( 'edit_pages' ) ) {

            add_filter( 'mce_buttons', array( __CLASS__, 'register_slider_button' ) );

            // Script is attached to the button, rather than registered/enqueued regularly.
            add_filter( 'mce_external_plugins', array( __CLASS__, 'add_slider_button' ) );

        }

    }

    static function register_slider_button( $buttons ) {

        array_push( $buttons, 'slider_button' );
        return $buttons;

    }

    static function add_slider_button( $plugin_array ) {

        $plugin_array['slider_button_script'] = plugins_url( '/js/admin/simple-slider-admin.js', __FILE__ ) ;
        return $plugin_array;

    }

    static function realbig_slider_shortcode_register( $atts, $content ){

        self::$add_frontend_styles_scripts = true;

        $atts = shortcode_atts(
            array(// a few default values
                'ids' => '',
                'arrows' => true,
                'indicators' => true,
                'classes' => '',
            ),
            $atts,
            'realbig_slider'
        );

        if ( $atts['ids'] == '' ) {
            return 'Please Select Attachment IDs for the Slider.';
        }

        $attachment_ids = explode( ',', $atts['ids'] );

        $first = true;

        $out = '';

        $out .= '<div class = "realbig-slider-container">';

            $out .= '<div class = "realbig-slider' . ( ( $atts['classes'] != '' ) ? ' ' . $atts['classes'] : '' ) . '">';

                $out .= '<div class = "inner">';

                    foreach ( $attachment_ids as $id ) {

                        if ( $first ) {

                            $out .= '<div class = "slide active">' . wp_get_attachment_image( $id, 'full' ) . '</div>';

                            $first = false;

                        }
                        else {

                            $out .= '<div class = "slide">' . wp_get_attachment_image( $id, 'full' ) . '</div>';

                        }

                    }

                $out .= '</div>';

                if ( $atts['arrows'] === true ) {

                        $out .= '<div class = "arrow arrow-left"></div>';
                        $out .= '<div class = "arrow arrow-right"></div>';

                }

                if ( $atts['indicators'] === true ) {

                    $out .= '<ul class = "indicators"></ul>';

                }

            $out .= '</div>';

        $out .= '</div>';

        return html_entity_decode( $out );

    }

    static function register_slider_styles_scripts() {

        wp_register_style( 'realbig-simple-slider-css', plugins_url( '/css/simple-slider.css', __FILE__ ) );
        wp_register_script( 'realbig-simple-slider-js', plugins_url( '/js/frontend/simple-slider.js', __FILE__ ), array( 'jquery' ), true );

    }
    
    static function enqueue_slider_styles_scripts() {

        if ( self::$add_frontend_styles_scripts !== true ) {
         //   return;
        }

        wp_enqueue_style( 'realbig-simple-slider-css' );
        wp_enqueue_script( 'realbig-simple-slider-js' );

    }

}

RealBigSlider::init();
