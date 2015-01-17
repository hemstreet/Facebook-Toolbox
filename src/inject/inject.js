var referralSites = {
    'amazon.com': {
        'code':    '344342234',
        'pattern': 'tag'
    },
    'ebay.com':   {
        'code':    '47574748',
        'pattern': 'refid'
    }
};

//var url = window.location.href;

var domain = window.location.hostname.replace(/([a-zA-Z0-9]+.)/, "");

//window.location.assign("http://www.w3schools.com")


for (var url in referralSites) {

    if (url == domain) {
        var query = window.location.href.split('?')[1] || '';
        var components = query.split('&')[1] || [];

        var site = referralSites[url];

        var found = false;

        for(var i = 0; i < components.length; i++) {
            var component = components[i].split('=');

            var key   = component[0];
            var value = component[1];

            if (key == site.pattern) {
                found = true;
                value = site.code;

            }


        }

        if (!found) {
            components.push(site.pattern + '=' + site.code);
        }

        query = components.join('&');

        var path = window.location.href.split('?')[0] + '?' + query;

        alert(path);

        var referralString = site.code;
        var referralPattern = site.pattern;
        //window.location.assign("http://www.w3schools.com")
        alert('matched domain');
    }

}