jQuery( document ).ready( function( $ ) {

    $( '.realbig-slider' ).each( function( index ) {

        $( this ).addClass( 'slider-' + index );

    } );

    $( '.realbig-slider.default' ).each( function() {
        // Uses default settings. Set default_js = false in the shortcode to provide a custom instantiation

        $( this ).RealBigSlider();

    } );

} );
