jQuery( document ).ready( function( $ ) {

    // Custom options for the carousel
    var args = {
        arrowRight : '.arrow-right', //A jQuery reference to the right arrow
        arrowLeft : '.arrow-left', //A jQuery reference to the left arrow
        speed : 1000, //The speed of the animation (milliseconds)
        slideDuration : 4000 //The amount of time between animations (milliseconds)
    };

    $( '.realbig-slider' ).each( function() {
        $( this ).RealBigSlider( args );
    } );

} );
