jQuery( document ).ready( function( $ ) {
    
    $( '.realbig-slider' ).RealBigSlider();
    
    $( '.realbig-slider .next' ).on( 'click', function( event ) {
        
        event.preventDefault();
        
        $( this ).parent().RealBigSlider( 'goToNext' );
        
    } );
    
    $( '.realbig-slider .previous' ).on( 'click', function( event ) {
        
        event.preventDefault();
        
        $( this ).parent().RealBigSlider( 'goToPrev' );
        
    } );

} );