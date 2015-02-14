(function ($) {

    $(window).on('ready', function() {

        facebook.init({
            'page' : 'home'
        });

        facebook.onScroll();

    });

})(jQuery);