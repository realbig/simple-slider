;(function( $ ) {

    $.fn.extend({
        RealBigSlider: function( options, arg ) {
            if ( options && typeof( options ) == 'object' ) {

                options = $.extend( {}, $.RealBigSlider.defaults, options );

            }

            // this creates a plugin for each elelemt in
            // the selector or runs the function once per
            // selector.  To have it do so for just the
            // first elelemt (once), return false after
            // creating the plugin to stop the each iteration 
            this.each( function() {

                new $.RealBigSlider( this, options, arg );

            } );
            return;
        }
    } );

    $.RealBigSlider = function( elem, options, arg ) {

        if ( options && typeof( options ) == 'string' ) {

            if ( options == 'goTo' ) {
                RealBigSlider_goTo( arg );
            }
            else if ( options == 'goToNext' ) {
                RealBigSlider_goToNext();
            }
            else if ( options == 'goToPrev' ) {
                RealBigSlider_goToPrev();
            }
            else {
                RealBigSlider_init();   
            }
        }
        else {
            RealBigSlider_init();
        }

        function RealBigSlider_init() {

            elem.ul = elem.children[0];

            elem.li = elem.ul.children;

            // make <ul> as large as all <li>’s

            elem.currentIndex = 0;
            
            
            
            elem.ul.style.width = ( elem.li[0].clientWidth * elem.li.length ) + 'px';
            //elem.li[0].style.width = elem.ul.style.width;

        }

        function RealBigSlider_goTo( index ) {

            // filter invalid indices
            if ( index < 0 || index > elem.li.length - 1 )
                return;

            // move <ul> left
            elem.ul.style.left = '-' + ( 100 * index ) + '%';

            elem.currentIndex = index;
            
            //elem.li[ elem.currentIndex ].style.width = elem.ul.style.width;

        }

        function RealBigSlider_goToNext() {
            
            if ( elem.currentIndex >= ( elem.li.length - 1 ) ) {
                
                // Reset at end
                RealBigSlider_goTo( 0 );
                
            }
            else {
                RealBigSlider_goTo( elem.currentIndex + 1 );
            }
            
        }

        function RealBigSlider_goToPrev() {
            
            if ( elem.currentIndex <= 0 ) {
                
                // Wrap around to the end
                RealBigSlider_goTo( ( elem.li.length - 1 ) );
                
            }
            else {
                RealBigSlider_goTo( elem.currentIndex - 1 );   
            }
            
        }

    };

    $.RealBigSlider.defaults = {
    };

}( jQuery ) );