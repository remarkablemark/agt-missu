(function(window, document){
    'use strict';

    // globals
    var sweetAlert = window.sweetAlert;
    var request = window.reqwest;
    var Firebase = window.Firebase;

    // access token
    var match = window.location.hash.match(/^#access_token=(.+)$/);
    var accessToken = (match && match.length) ? match[1] : null;

    if (accessToken) {
        request({
            url: 'https://api.instagram.com/v1/users/self/?access_token=' + accessToken + '&callback=?',
            type: 'jsonp',
            success: function(response) {
                var meta = response.meta;
                if (meta.code !== 200) {
                    sweetAlert('Error', meta.error_message, 'error');
                    return console.log(meta.code, meta.error_type);
                }

                var data = response.data;
                data.access_token = accessToken;

                var firebaseUrl = 'https://brilliant-fire-5658.firebaseio.com/' + data.username;
                var firebaseRef = new Firebase(firebaseUrl);
                firebaseRef.set(data, function(error) {
                    if (error) {
                        sweetAlert('Error', 'Unable to save profile data. Please refresh the page and try again.', 'error');
                        return console.log(error);
                    };

                    sweetAlert({
                        title: 'Success',
                        text: 'Profile data updated.',
                        type: 'success'
                    });
                });
            }
        });
    }
})(window, document);
