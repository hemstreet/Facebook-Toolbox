var debug       = true,
    visualDebug = 1;
/*
 visualDebug log level legend
 0 : Off
 1 : Visual Debug
 2 : Visual Debug & Console Logging
 - debug must be set to true to utilize visualDebug
 */

if ( debug ) {
    var requestAmount = {
        'read' : 0,
        'create' : 0
    };
}

if ( visualDebug > 0 ) {
    var debugContainer       = $( '<ul data-debug-container></ul>' ),
        requestContainer     = $( '<ul data-debug-requests><li class="read">Read : <span>0</span></li><li class="create">Create : <span>0</span></li></ul>' ),
        logLimit             = 50,
        logCount             = 0,
        totalHistoryLogCount = 0;

}

var facebook = {

    userKey : null,
    host : 'https://jonhemstreet.com/facebook/dislike',
    //host : 'https://titan.facebook.lan/dislike',
    page : null,

    init : function ( config ) {

        this.page = $( 'body.home' )[ 0 ] ? 'home' : 'inner';

        visualDebug > 0 ? this.visualDebugInit() : '';

        //this.page = config.page;
        this.log( 'set page to : ' + this.page );

        // Get unique key
        this.getUserKey();

        // Setup Facebook post listeners
        this.initPostScroll();

    },
    getUserKey : function () {

        var userKey = $( '#pagelet_bluebar [title]' ).attr( 'href' );
        userKey = userKey.split( '/' )[ 3 ]; // Get the fourth segment of the url string

        this.userKey = userKey;
        this.log( 'set user key to : ' + this.userKey );

    },
    initPostScroll : function () {

        //$( window ).scroll( this.onScroll.bind( this ) );

    },
    onScroll : function () {

        // check if it has the class has-dislike-feature
        var posts = this.getPosts();

        for ( var i = 0; i < posts.length; i++ ) {

            var post = posts[ i ];
            var container = $( post ).closest( 'div[data-ft]' );

            var dislikes = this.checkForCurrentDislikes( container );

            this.attachDislikeContainer( container, dislikes );
            this.attachDislikeSentence( container, dislikes );

            var buttons = $( '.dislikeButton', container );

            buttons.each( function () {

                $( this ).on( 'click', function ( e ) {

                    e.preventDefault();
                    facebook.dislikeClicked( $( this ) );

                    debug ? $( this ).css( 'border', '1px solid purple' ) : '';
                } );
            } );
            // Debug
            debug ? $( post ).css( 'border', '1px solid green' ) : '';

            $( post ).addClass( 'has-dislike-feature' );
        }

    },
    getPosts : function () {

        return $( '.userContentWrapper:not(.has-dislike-feature)' );

    },
    parsePostForStoryKey : function ( container ) {

        // Debug
        debug ? container.css( 'border', '1px solid red' ) : '';

        var storyKey = container.attr( 'data-timestamp' ) || container.attr( 'data-time' );

        if ( storyKey == undefined ) {
            var data = JSON.parse( container.attr( 'data-ft' ) ),
                storyKey = data.mf_story_key;
        }

        this.log( storyKey );

        return storyKey;
    },

    updateDislikeDom : function ( data, dom ) {

        var dislikeContainers = $( '.dislikeContainer', dom );

        var _data = JSON.parse( data );

        dislikeContainers.each( function () {

            debug ? $( this ).css( 'border', '1px solid yellow' ) : '';

            $( this )[ 0 ].innerHTML = _data.count;
        } )
    },
    attachDislikeContainer : function ( container, dislikes ) {

        var likeLink = $( '.UFILikeLink[aria-live]', container ),
            likeBox = $( '.UFIBlingBox', container ),
            storyKey = this.parsePostForStoryKey( container );

        var dislikeLink = facebook.buildDislikeLink( dislikes, storyKey );
        var dislikeBox = facebook.buildDislikeBox( dislikes, storyKey );

        // Attach dislike link
        likeLink.each( function () {
            $( this ).after( ' · ' + dislikeLink );

        } );

        // Attach dislike box
        likeBox.each( function () {
            $( this ).after( ' · ' + dislikeBox );
        } );

    },

    buildDislikeLink : function ( dislikes, storyKey ) {
        return '<a class="UFILikeLink dislikeButton" href="#" role="button" title="Dislike this comment" data-facebook-story-key="' + storyKey + '">Dislike</a>';
    },
    buildDislikeBox : function ( dislikes, storyKey ) {

        var value = !!dislikes ? dislikes : '0';

        return '<span><i class="UFIBlingBoxLikeIcon UFIBlingBoxSprite dislikeIcon"></i><span class="UFIBlingBoxText dislikeContainer dislikeButton" data-facebook-story-key="' + storyKey + '"">' + value + '</span></span>';
    },
    buildDislikeSentence : function ( dislikes, storyKey ) {

        var value = !!dislikes ? dislikes : '0';

        return '<li class="UFIRow UFILikeSentence UFIFirstComponent"><span><a rel="dialog" data-tooltip-alignh="center" role="button"><div class="lfloat"><a class="UFILikeThumbUFIImageBlockImage" href="#" tabindex="-1" title="Dislike this" role="button" aria-label="Disike this"><i class="UFILikeIcon dislikeIcon dislikeSentence "></i></a></div><span class="dislikeContainer dislikeButton" data-facebook-story-key="' + storyKey + '">' + value + '</span> people</a><span> dislike this.</span></span></li>'
    },
    dislikeClicked : function ( link ) {

        var data = {
            'action' : 'create',
            'post' : link.attr( 'data-facebook-story-key' ),
            'user' : this.userKey
        };

        var container = link.closest( 'div[data-ft][data-timestamp]' );

        if ( this.page == 'inner' ) {

            container = link.closest( 'div[data-ft][data-time]' );
        }

        debug ? container.css( 'border', '1px solid purple' ) : '';

        debug ? this.logRequest( 'create' ) : '';

        this.request( this.host, '?action=' + data.action + '&post=' + data.post + '&user=' + data.user, container );

        this.postMessage( container );

    },
    checkForCurrentDislikes : function ( container ) {

        var data = {
            'action' : 'read',
            'post' : this.parsePostForStoryKey( container )
        };

        debug ? this.logRequest( 'read' ) : '';

        this.request( this.host, '?action=' + data.action + '&post=' + data.post, container );

    },
    attachDislikeSentence : function ( container, dislikes ) {

        var sentence = $( '.UFILikeSentence', container );

        sentence.after( this.buildDislikeSentence( dislikes ) );

    },
    request : function ( url, query, container ) {

        $.ajax( {
            url : url + query,
            type : "GET",
            dataType : "text",
            success : function ( data ) {

                facebook.log( query + ' ' + data );

                (data !== 'null' && data) ? facebook.updateDislikeDom( data, container ) : facebook.log( 'No Record of Post found' );
            },
            error : function ( xhr, status, err ) {
                this.log( 'ANGRY AJAX REQUEST' )
                this.log( xhr );
                this.log( status );
                this.log( err );
            }
        } );
    },
    postMessage : function ( container ) {

        var input = $( '.UFIAddCommentInput [data-block] span:last-of-type', container )[ 0 ];

        if ( input ) {
            input.innerHTML = '<span>Automated dislike test</span>';

            var e = jQuery.Event( "keypress" );
            e.which = 13; //choose the one you want
            e.keyCode = 13;
            $( input ).trigger( e );
        }

    },
    log : function ( msg ) {

        if ( debug ) {

            visualDebug == 2 ? console.log( msg ) : '';

            visualDebug > 0 ? this.visualLog( msg ) : '';

        }

    },
    visualLog : function ( msg ) {

        debugContainer.prepend( '<li class="debugLog" style="border-bottom: 1px solid grey; padding: 10px 0;">' + totalHistoryLogCount + ' ' + msg + '</li>' );
        logCount++;
        totalHistoryLogCount++;

        if ( logCount >= logLimit ) {
            $( 'li:last', debugContainer ).remove();
        }

    },
    logRequest : function ( action ) {

        if ( action == 'read' ) {
            requestAmount.read++;
            $( '.read span', requestContainer ).text( requestAmount.read );
        }
        else {
            requestAmount.create++;
            $( '.create span', requestContainer ).text( requestAmount.create );
        }

    },
    visualDebugInit : function () {

        this.log( 'Setting up Visual Debug' );

        var defaultDebugWidth = '225px',
            css = {
                'position' : 'fixed',
                'z-index' : '9999',
                'top' : '43px',
                'left' : '0',
                'bottom' : '0',
                'width' : defaultDebugWidth,
                'background' : 'rgba(0,0,0,0.8)',
                'color' : '#fff',
                'padding' : '10px',
                'overflow' : 'auto'
            };

        debugContainer.css( css );

        var debugToggle = $( '<a href="#" data-toggle-visual-debugger>Toggle Debug</a>' ),
            css = {
                'position' : 'fixed',
                'top' : '14px',
                'left' : '11px',
                'z-index' : '9999',
                'color' : '#fff'
            };

        debugToggle.css( css );

        debugToggle.on( 'click', function ( e ) {

            e.preventDefault();

            if ( debugContainer.hasClass( 'fullWidthDebug' ) ) {

                debugContainer.css( 'right', 'auto' );
                debugContainer.css( 'width', defaultDebugWidth );

            } else {
                debugContainer.css( 'right', '0' );
                debugContainer.css( 'width', '100%' );
            }

            debugContainer.toggleClass( 'fullWidthDebug' );

        } );

        var css = {
            'position' : 'fixed',
            'top' : '6px',
            'left' : '100px',
            'z-index' : '9999',
            'color' : '#fff'
        };

        requestContainer.css( css );

        var pageletContainer = $( "#pagelet_bluebar" );

        pageletContainer.append( requestContainer );
        pageletContainer.append( debugContainer );
        pageletContainer.prepend( debugToggle );

    },
    pageChanged : function ( page ) {
        this.page = page;

        this.log( 'Updated page key : ' + this.page );

        this.onScroll();
    }
};