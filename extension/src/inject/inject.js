//var referralSites = {
//    'amazon.com': {
//        'code':    '344342234',
//        'pattern': 'tag'
//        //'callback' : amazon
//    },
//    'ebay.com':   {
//        'code':    '47574748',
//        'pattern': 'refid'
//    }
//};
//
//var domain = window.location.hostname.replace(/([a-zA-Z0-9]+.)/, "");
//
//for (var url in referralSites) {
//
//    if (url == domain) {
//
//        var site = referralSites[url];
//
//        var query = window.location.href.split('?')[1] || '';
//
//        //site.callback();
//
//        var components = query.split('&') || [site.pattern + '=test'];
//
//        var found = false;
//        var redirect = true;
//
//        for (var i = 0; i < components.length; i++) {
//            var component = components[i].split('=');
//
//            var key = component[0];
//            var value = component[1];
//
//            if (value == site.code) {
//                redirect = false;
//                break;
//            }
//
//            if (key == site.pattern) {
//                found = true;
//                value = site.code;
//
//            }
//
//
//        }
//
//        if (redirect) {
//
//            if (!found) {
//                components.push(site.pattern + '=' + site.code);
//            }
//
//            query = components.join('&');
//
//            query = query.slice(1, query.length);
//
//            var path = window.location.href.split('?')[0] + '?' + query;
//
//            window.location.assign(path)
//
//        }
//
//    }
//
//}