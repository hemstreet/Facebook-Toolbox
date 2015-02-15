var scrollIdentifiers = [
    'ProfileTimelineSectionPagelet',
    'LitestandMoreStoriesPagelet'
];

chrome.webRequest.onCompleted.addListener( function ( details ) {
    var url = document.createElement( 'a' ),
        isScroll = null;

    url.href = details.url;

    for ( var i = 0; i < scrollIdentifiers.length; i++ ) {

        url.href.indexOf( scrollIdentifiers[ i ] ) > -1 ? isScroll = true : '';

    }

    if ( !isScroll && url.search && url.search.indexOf( 'ajaxpipe=1' ) !== -1 ) {

        chrome.tabs.executeScript( null, { 'file' : '/js/lib/facebook.js' } );

        // Detects if it is the homepage, need to clean this up
        if(url.href.indexOf('facebook.com/?') > -1 || url.href.indexOf('facebook.com/ajax/home') > -1) {
            chrome.tabs.executeScript( null, { 'file' : '/js/facebook/home.js' } )
        }
        else
        {
            chrome.tabs.executeScript( null, { 'file' : '/js/facebook/inner.js' } );
        }

    }

}, { urls : [ "*://*.facebook.com/*" ] } );