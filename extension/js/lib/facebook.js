var debug = false;

var facebook = {

    userKey : null,
    host : 'https://jonhemstreet.com/facebook/dislike', // For Remote db

    init : function () {

        // Get unique key
        this.getUserKey();

        // Setup Facebook post listeners
        this.initPostScroll();

    },
    getUserKey : function () {

        var userKey = $( '#pagelet_bluebar [title]' ).attr( 'href' );
        userKey = userKey.split( '/' )[ 3 ]; // Get the fourth segment of the url string

        this.userKey = userKey;
        this.log( 'set user key to :' + this.userKey );

    },
    initPostScroll : function () {

        $( window ).scroll( this.onScroll.bind( this ) );

    },
    onScroll : function () {

        // check if it has the class has-dislike-feature
        var posts = $( '.userContentWrapper:not(.has-dislike-feature)' );

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
    parsePostForStoryKey : function ( container ) {

        // Debug
        debug ? container.css( 'border', '1px solid red' ) : '';

        var dataFt = container.attr( 'data-ft' ),
            json = JSON.parse( dataFt ),
            storyKey = json.mf_story_key || json.id;

        return storyKey;
    },

    updateDislikeDom : function ( data, dom ) {

        var dislikeContainers = $( '.dislikeContainer', dom );

        var _data = JSON.parse( data );


        dislikeContainers.each( function () {

            debug ? $( this ).css('border', '1px solid yellow') : '';

            $( this )[0].innerHTML = _data.count;
        } )
    },
    attachDislikeContainer : function ( container, dislikes ) {

        var likeLink = $( '.UFILikeLink', container ),
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

        debug ? container.css( 'border', '1px solid purple' ) : '';

        this.request( this.host, '?action=' + data.action + '&post=' + data.post + '&user=' + data.user, container );

    },
    checkForCurrentDislikes : function ( container ) {

        var data = {
            'action' : 'read',
            'post' : this.parsePostForStoryKey( container )
        };

        this.log( container );

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

                (data !== 'null' && data) ? facebook.updateDislikeDom( data, container ) : '';
            }
        } );
    },
    log : function ( msg ) {

        if ( debug ) {
            console.log( msg )
        }

    }
};