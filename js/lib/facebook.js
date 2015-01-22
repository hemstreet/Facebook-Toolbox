var debug = true;

var facebook = {

    userKey : null,
    host : 'localhost', // For Remote db
    db : null,
    dislikeBoxTemplate : '<html markup>',
    dislikeLinkTemplate : '<html markup>',

    init : function () {

        this.log( 'facebook init' );

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

        this.log( 'initPostScroll' );

        $( window ).scroll( this.onScroll.bind( this ) );

        // Fire on scroll event to ensure we are running the onScroll event
        this.onScroll();

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
            var container = post.parentNode;


            // inject dislike box / link
            // check for current likes / dislike

            console.log('onScroll is where you left off');

            console.log(post);

            console.log(facebook);

            //var storyKey = this.parsePostForStoryKey( container );


            post.addClass( 'has-dislike-feature' );
        }

        //posts.each( function () {
        //    var post = $( this );
        //    var container = post.parent();
        //
        //    post.addClass( 'has-dislike-feature' );
        //} );

        //posts.each(function(post) {
        //    var container = post.parent();
        //    console.log(container);
        //    post.css('background', '#000');
        //})
    },
    parsePostForStoryKey : function ( container ) {

        //var post = container.closest( '[data-ft][data-timestamp]' ),
        //    dataFt = post.attr( 'data-ft' ),
        //    json = JSON.parse( dataFt ),
        //    storyKey = json.mf_story_key;
        //
        //return storyKey;
    },
    checkForCurrentDislikes : function () {

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
    attachDislikeContainer : function () {

        // Determine if it is a dislike box or link
        // Drop in dislike link using this.dislikeBoxTemplate or this.dislikeLinkTemplate markup
        // Setup listeners for on click

    },
    dislikeClicked : function () {

        // Get post
        // Check the db for duplicate clicks
        // If duplicate decrement dislike count
        // Otherwise if its a new click, increment the dislike count
        // Update Post to reflect updated dislike count

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