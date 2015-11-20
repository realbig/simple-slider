jQuery( document ).ready( function( $ ) {

    var add_slider_media;

    // If the media frame already exists, reopen it.
    if ( add_slider_media ) {
        add_slider_media.open();
        return;
    }

    add_slider_media = wp.media.frames.add_slider_media = wp.media( {

        title: 'Select Images In the Order You\'d Like Them to Appear',
        multiple: 'add',
        library: { type: 'image' },
        button: { text: 'Add Images to Slider' }

    } );

    tinymce.PluginManager.add( 'slider_button_script', function( editor, url ) {

        editor.addButton( 'slider_button', {

            text: 'Add Slider',
            icon: false,
            onclick: function() {
                add_slider_media.open();
            }

        } );

    } );

    add_slider_media.on( 'select', function() {
        // The Event Name is misleading. This is fired after you CONFIRM the selection.

        var selection = add_slider_media.state().get( 'selection' );
        var sliderArray = []; // Holds the Attachment IDs

        selection.map( function( attachment ) {

            attachment = attachment.toJSON();            
            sliderArray.push( attachment.id );
            // This outputs an individual Object for each Image. Making our own Array makes it more manageable. 

        } );

        var shortcode = '[realbig_slider ids = "';
        for ( var index = 0; index < sliderArray.length; index++ ) {
            shortcode = shortcode + sliderArray[index] + ',';
        }
        shortcode = shortcode.substring( 0, shortcode.length - 1 ); // Remove last comma since it is all by itself
        shortcode = shortcode + '"]';

        tinymce.activeEditor.execCommand( 'mceInsertContent', false, shortcode );

    } );

} );