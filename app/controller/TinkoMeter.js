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
    shareNowOptions: function(obsolete_param){
        Ext.Viewport.mask({
            xtype: 'loadmask',
            html: '<img src="resources/images/green-loader.png" alt="loader">'
        });

        Ext.Ajax.request({
            url: ttapp.config.Config.getBaseURL() + '/socialv2/' + socialnetwork + '/',
            method: 'GET',
            disableCaching: false,
            success: function (response) {

                var json = Ext.JSON.decode(response.responseText);
                var sn = json.socialnetwork, url = json.url, imgurl = json.imgurl;

                // this is the complete list of currently supported params you can pass to the plugin (all optional)
                var options = {
                    message: 'time is a gift, share it!', // not supported on some apps (Facebook, Instagram)
                    subject: 'Join me on app tinktime', // fi. for email
                    files: ['', ''], // an array of filenames either locally or remotely
                    url: url,
                    chooserTitle: 'Pick an app' // Android only, you can override the default share sheet title
                }

                var onSuccess = function (result) {
                    console.log("Share completed? " + result.completed); // On Android apps mostly return false even while it's true
                    console.log("Shared to app: " + result.app); // On Android result.app is currently empty. On iOS it's empty when sharing is cancelled (result.completed=false)
                    Ext.Viewport.setMasked(false);
                }

                var onError = function (msg) {
                    console.log("Sharing failed with message: " + msg);
                    Ext.Viewport.setMasked(false);
                }

                window.plugins.socialsharing.shareWithOptions(options, onSuccess, onError);

            },
            failure: function (error) {
                Ext.Viewport.setMasked(false);
                Ext.Msg.alert('Error', 'Unable to fetch data.');
            }
        });
    },
    shareNow: function(socialnetwork){
        Ext.Viewport.mask({
            xtype: 'loadmask',
            html: '<img src="resources/images/green-loader.png" alt="loader">'
        });

        Ext.Ajax.request({
            url: ttapp.config.Config.getBaseURL() + '/socialv2/' + socialnetwork + '/',
            method: 'GET',
            disableCaching: false,
            success: function(response) {

                var json = Ext.JSON.decode(response.responseText);
                var sn = json.socialnetwork, url = json.url, imgurl = json.imgurl;

                if ( sn == 'twitter'){
                    window.plugins.socialsharing.available(function(isAvailable) {
                        // the boolean is only false on iOS < 6
                        if (isAvailable) {
                            // now use any of the share() functions
                            window.plugins.socialsharing.shareViaTwitter('Try Tinktime app. Time is a gift, share it!',
                                null , url);
                        }
                        Ext.Viewport.setMasked(false);
                    });
                }
                else if ( sn == 'facebook'){
                    window.plugins.socialsharing.available(function(isAvailable) {
                        // the boolean is only false on iOS < 6
                        if (isAvailable) {
                            // now use any of the share() functions
                            window.plugins.socialsharing.shareViaFacebook('Try Tinktime app. Time is a gift, share it!',
                                imgurl /* img */, url /* url */,
                                function() {console.log('share ok')}, function(errormsg){console.log(errormsg)});
                        }
                        Ext.Viewport.setMasked(false);
                    });
                }
                else if ( sn == 'instagram'){
                    window.plugins.socialsharing.available(function(isAvailable) {
                        // the boolean is only false on iOS < 6
                        if (isAvailable) {
                            // now use any of the share() functions
                            window.plugins.socialsharing.canShareVia('instagram', 'msg', null, null, null,
                                function(e){
                                    window.plugins.socialsharing.shareViaInstagram('Try Tinktime app. Time is a gift, share it!',
                                        imgurl, function() {console.log('share ok')}, function(errormsg){console.log(errormsg)})
                                },
                                function(e){console.log(e)});
                        }
                        Ext.Viewport.setMasked(false);
                    });
                }
                else{
                    console.log('no social network found');
                    Ext.Viewport.setMasked(false);

                    Ext.Msg.alert('Share failed!', 'Unable to find app.');

                }

            },
            failure: function(error) {
                Ext.Viewport.setMasked(false);
                Ext.Msg.alert('Error', 'Unable to fetch data.');
            }
        });
    },
    tweetNow: function(callback, scope) {
        console.log('lets tweet');

        this.shareNowOptions('twitter');
    },
    fbNow: function(callback, scope) {
        console.log('lets fb');

        this.shareNowOptions('facebook');
    },
    instaNow: function(callback, scope) {
        console.log('lets insta');

        this.shareNowOptions('instagram');
    }
});
