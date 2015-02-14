(function ($) {

    $(window).on('ready', function() {

        facebook.init({
            'page' : 'inner'
        });

        facebook.onScroll();

    });

})(jQuery);