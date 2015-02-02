var debug = true;

var facebook = {

    userKey : null,
    host : 'localhost', // For Remote db
    db : null,

    init : function () {

        // Init database for saving
        this.initDatabase();

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

        // get unique post id
        // if not add dislike template markup
        // query for number of dislikes
        // add has-dislike-feature class
        //var contentArea = $('#contentArea');

        // check if it has the class has-dislike-feature
        var posts = $( '.userContentWrapper:not(.has-dislike-feature)' );

        for ( var i = 0; i < posts.length; i++ ) {

            var post = posts[ i ];
            var container = $( post ).closest( 'div[data-ft]' );

            var dislikes = this.checkForCurrentDislikes( container );

            this.attachDislikeContainer( container, dislikes );
            this.attachDislikeSentence( container, dislikes );

            // Debug
            debug ? $( post ).css( 'border', '1px solid green' ) : '';

            $( post ).addClass( 'has-dislike-feature' );
        }

    },
    parsePostForStoryKey : function ( container ) {

        //console.log('parsing post for story key');
        //console.log(container);

        // Debug
        debug ? container.css( 'border', '1px solid red' ) : '';

        var dataFt = container.attr( 'data-ft' ),
            json = JSON.parse( dataFt ),
            storyKey = json.mf_story_key;

        return storyKey;
    },

    checkForCurrentDislikes : function ( container ) {

        var storyKey = this.parsePostForStoryKey( container ),
            dislikes = 0;

        container.attr( 'toolbox-dislikes', dislikes );

        return dislikes;

        // Get current number of dislikes
        // Approach 1
        // Return value from attribute on the post data-titan-post
        // Approach 2
        // Facebook get storyKey ?
        //var post = $(this).closest('[data-ft][data-timestamp]'),
        //dataFt = post.attr('data-ft'),
        //json = JSON.parse(dataFt),
        //storyKey = json.mf_story_key;

    },
    attachDislikeContainer : function ( container, dislikes ) {

        var likeLink = $( '.UFILikeLink', container );
        var likeBox = $( '.UFIBlingBox', container );

        var dislikeLink = facebook.buildDislikeLink( dislikes );
        var dislikeBox = facebook.buildDislikeBox( dislikes );

        $( dislikeLink ).on( 'click', this.dislikeClicked( container ) );
        $( dislikeBox ).on( 'click', this.dislikeClicked( container ) );

        // Attach dislike link
        likeLink.each( function () {

            $( this ).after( ' · ' + dislikeLink );

        } );

        // Attach dislike box
        likeBox.each( function () {

            $( this ).after( ' · ' + dislikeBox );
        } );

        // Determine if it is a dislike box or link
        // Drop in dislike link using this.dislikeBoxTemplate or this.dislikeLinkTemplate markup
        // Setup listeners for on click

    },

    buildDislikeLink : function ( dislikes ) {
        this.log( 'buildDislikeLink' );
        return '<a class="UFILikeLink" href="#" role="button" title="Dislike this comment">Dislike</a>';
    },
    buildDislikeBox : function ( dislikes ) {
        this.log( 'buildDislikeBox' );
        return '<span><i class="UFIBlingBoxLikeIcon UFIBlingBoxSprite dislikeIcon"></i><span class="UFIBlingBoxText">' + dislikes + '</span></span>';
    },
    buildDislikeSentence : function ( dislikes ) {
        this.log( 'buildDislikeSentence' );
        return '<li class="UFIRow UFILikeSentence UFIFirstComponent"><span><a rel="dialog" data-tooltip-alignh="center" role="button"><div class="lfloat"><a class="UFILikeThumbUFIImageBlockImage" href="#" tabindex="-1" title="Dislike this" role="button" aria-label="Disike this"><i class="UFILikeIcon dislikeIcon dislikeSentence"></i></a></div>' + dislikes + ' people</a><span> dislike this.</span></span></li>'
    },
    dislikeClicked : function ( container ) {

        this.log( container );
        // Get post
        // Check the db for duplicate clicks
        // If duplicate decrement dislike count
        // Otherwise if its a new click, increment the dislike count
        // Update Post to reflect updated dislike count

    },
    attachDislikeSentence : function ( container, dislikes ) {

        var sentence = $( '.UFILikeSentence', container );

        sentence.after( this.buildDislikeSentence( dislikes ) );
    },
    initDatabase : function ( options ) {

        // Get host off of options options.host else use preset
        // Get type of db ( Adapters )
        // start connection

    },
    log : function ( msg ) {

        if ( debug ) {
            console.log( msg )
        }

    }
};

// fires on scroll event
$( document ).on( 'ready', function () {
    facebook.onScroll();
} );