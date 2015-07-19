/**
 * Plugin Name: Facebook Toolbox
 * Author: Jon Hemstreet
 * Email: me@jonhemstreet.com
 * Version: 0.8.1
 */


var debug = 1;

var facebook = {

    userKey: null,
    host: 'https://jonhemstreet.com/facebook/dislike',
    page: null,
    dislikeLinkTemplate: '<span><a class="UFILikeLink dislikeLink" href="#" role="button" aria-live="polite" title="Disike this"><div class="dislikeImage"></div><i class="UFILikeLinkIcon img"></i><span>Dislike</span></a></span>',
    dislikeLinkBoxTemplate: '<span class="UFIBlingBoxText UFIBlingBoxTextRevised"><span class="dislikes">X</span> Dislikes</span>',
    $likeLinkIcon: $('<i class="UFILikeLinkIcon img"></i>'),

    init: function () {

        this.log('init');

        this.getUserKey();

        this.initPostScroll();
    },

    initPostScroll: function () {

        setInterval(function () {
            this.onScroll();
        }.bind(this), 5000);

    },
    getUserKey: function () {

        var userKey = $($('[role="navigation"] li:first-of-type a')[0]).attr('href');
        userKey = userKey.split('/')[3]; // Get the fourth segment of the url string

        this.userKey = userKey;

    },

    getPosts: function () {

        var posts = $('[data-dedupekey]:not(".has-dislike-feature")');

        posts.each(function () {

            $(this).addClass('has-dislike-feature');
            facebook.setupPost($(this));

            facebook.checkForCurrentDislikes($(this));

            $('.dislikeLink', $(this)).on('click', function (e) {
                e.preventDefault();
                facebook.dislikeClicked($(this).attr('data-facebook-story-key'), $(this));
            });

        });

    },

    dislikeClicked: function(key, container) {
        var data = {
            'action' : 'create',
            'post' : key,
            'user' : this.userKey
        };

        this.request( '?action=' + data.action + '&post=' + data.post + '&user=' + data.user, container );

        alert('dislike added');

    },
    checkForCurrentDislikes: function (container) {

        var data = {
            'action': 'read',
            'post': this.parsePostForStoryKey(container)
        };

        this.request('?action=' + data.action + '&post=' + data.post, container);

    },
    request: function (query, container) {

        var url = this.host;

        var time = new Date().getTime();

        $.ajax({
            url: url + query + '&cacheBuster=' + time,
            type: "GET",
            dataType: "text",
            success: function (data) {

                (data !== 'null' && data) ? this.updateDislikeDom(data, container) : this.log('No Record of Post found');

            }.bind(this),
            error: function (xhr, status, err) {
                this.log('Error', err);
            }.bind(this)
        });
    },
    updateDislikeDom: function (_data, container) {
        var data = JSON.parse(_data);

        console.log('dislike count', data.count);

        container.css('background', 'green');
    },
    setupPost: function ($el) {

        var postKey = this.parsePostForStoryKey($el);

        $el.attr('data-facebook-story-key', postKey);

        var likeLink = $('.UFILikeLink', $el),
            likeBox = $('.UFIBlingBox', $el);

        var dislikeButton = $(this.dislikeLinkTemplate)[0],
            dislikeLinkBox = $(this.dislikeLinkBoxTemplate)[0];

        $('a', dislikeButton).attr('data-facebook-story-key', postKey);
        $('a', dislikeLinkBox).attr('data-facebook-story-key', postKey);

        $(likeLink[0]).parent().after(dislikeButton);

        $(likeBox[0]).after(dislikeLinkBox);

    },
    parsePostForStoryKey: function (container) {

        var storyKey = container.attr('data-timestamp') || container.attr('data-time');

        if (storyKey == undefined) {
            var data = JSON.parse(container.attr('data-ft')),
                storyKey = data.mf_story_key;
        }

        this.log(storyKey);

        return storyKey;
    },

    onScroll: function () {

        this.getPosts();


    },
    pageChanged: function (page) {
        this.log('page change');
        this.page = page;

        this.log('Updated page key : ' + this.page);

    },
    log: function (msg) {

        if (debug > 0) {
            console.log('Debug:', msg);
        }

    }

};