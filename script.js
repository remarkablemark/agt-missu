(function(window, document){
    'use strict';

    var match = window.location.hash.match(/^#access_token=(.+)$/);
    var accessToken = (match && match.length) ? match[1] : null;

    console.log(accessToken);
})(window, document);
