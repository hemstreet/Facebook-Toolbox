/**
 * Plugin Name: Facebook Toolbox
 * Author: Jon Hemstreet
 * Email: me@jonhemstreet.com
 * Version: 0.8.4
 * Description: Calls init on the facebook object in /src/plugins/facebook/facebook.js
 */


(function ( $ ) {

    $( window ).on( 'ready', function () {

        facebook.init();

    } );

})( jQuery );