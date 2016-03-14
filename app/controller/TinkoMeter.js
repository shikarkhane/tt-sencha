Ext.define('ttapp.controller.TinkoMeter', {
    extend: 'Ext.app.Controller',
    config: {
        refs: {
            tweetIt: 'button[cls~=twitter]',
            fbIt: 'button[cls~=facebook]',
            instaIt: 'button[cls~=instagram]',
        },
        control: {
            'tweetIt': {
                tap: 'tweetNow'
            },
            'fbIt': {
                tap: 'fbNow'
            },
            'instaIt': {
                tap: 'instaNow'
            }
        }
    },
    tweetNow: function(callback, scope) {
        console.log('lets tweet');

        window.plugins.socialsharing.available(function(isAvailable) {
            // the boolean is only false on iOS < 6
            if (isAvailable) {
                // now use any of the share() functions
                window.plugins.socialsharing.shareViaTwitter('Try Tinktime app. Time is a gift, share it!', null , 'http://www.tinktime.com/');
            }
        });
    },
    fbNow: function(callback, scope) {
        console.log('lets fb');
        window.plugins.socialsharing.available(function(isAvailable) {
            // the boolean is only false on iOS < 6
            if (isAvailable) {
                // now use any of the share() functions
                window.plugins.socialsharing.shareViaFacebook('Try Tinktime app. Time is a gift, share it!', null /* img */, 'http://www.tinktime.com/' /* url */,
                    function() {console.log('share ok')}, function(errormsg){console.log(errormsg)});
            }
        });

    },
    instaNow: function(callback, scope) {
        console.log('lets insta');
        window.plugins.socialsharing.available(function(isAvailable) {
            // the boolean is only false on iOS < 6
            if (isAvailable) {
                // now use any of the share() functions
                window.plugins.socialsharing.canShareVia('instagram', 'msg', null, null, null,
                    function(e){
                        shareViaInstagram('Try Tinktime app. Time is a gift, share it!',
                            'http://d2ba6o56c6jz0m.cloudfront.net/welcome-to-tinktime.png', function() {console.log('share ok')}, function(errormsg){console.log(errormsg)})
                    },
                    function(e){console.log(e)});
            }
        });

    }
});
