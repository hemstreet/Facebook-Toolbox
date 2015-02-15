var scrollIdentifiers = [
    'ProfileTimelineSectionPagelet',
    'LitestandMoreStoriesPagelet'
];

chrome.webRequest.onCompleted.addListener( function ( details ) {
    var url = document.createElement( 'a' ),
        isScroll = null;

    url.href = details.url;

    for ( var i = 0; i < scrollIdentifiers.length; i++ ) {

        url.href.indexOf( scrollIdentifiers[ i ] ) > -1 ? isScroll = true : false;

    }

    if(isScroll) {
        chrome.tabs.executeScript( null, {code:"facebook.onScroll()"} );
    }

    if ( !isScroll && url.search && url.search.indexOf( 'ajaxpipe=1' ) > -1 ) {

        console.log(url.href);

        // Detects if it is the homepage, need to clean this up
        if ( url.href.indexOf( 'facebook.com/?' ) > -1 || url.href.indexOf( 'facebook.com/ajax/home') > -1 || url.href.indexOf( 'facebook.com/?ref=') > -1 ) {
            chrome.tabs.executeScript( null, {code:"facebook.pageChanged('home')"} );
        }
        else {
            chrome.tabs.executeScript( null, {code:"facebook.pageChanged('inner')"} );
        }

    }

}, { urls : [ "*://*.facebook.com/*" ] } );