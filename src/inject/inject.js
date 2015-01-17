var referralSites = {
    'amazon.com': {
        'code':    '344342234',
        'pattern': 'tag='
    },
    'ebay.com':   {}
};

var url = window.location.href;

var domain = window.location.hostname.replace(/([a-zA-Z0-9]+.)/, "");

//window.location.assign("http://www.w3schools.com")
for (var url in referralSites) {

    if (url == domain) {
        var site = referralSites[url];

        var referralString = site.code;
        var referralPattern = site.pattern;
        //window.location.assign("http://www.w3schools.com")
        alert('matched domain');
    }

}