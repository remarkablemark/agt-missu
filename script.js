(function(window, document){
    'use strict';

    // access token
    var match = window.location.hash.match(/^#access_token=(.+)$/);
    var accessToken = (match && match.length) ? match[1] : null;

    if (accessToken) {
        var request = window.reqwest;
        request({
            url: 'https://api.instagram.com/v1/users/self/?access_token=' + accessToken + '&callback=?',
            type: 'jsonp',
            success: function(response) {
                var data = response.data;
                data.access_token = accessToken;

                var firebaseUrl = 'https://brilliant-fire-5658.firebaseio.com/' + data.username;
                var firebaseRef = new Firebase(firebaseUrl);
                firebaseRef.set(data);
            }
        });
    }
})(window, document);
