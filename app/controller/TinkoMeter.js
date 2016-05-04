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
                    });
                }
                else{
                    console.log('no social network found');
                    Ext.Msg.alert('Share failed!', 'Unable to find app.');
                }
                Ext.Viewport.setMasked(false);
            },
            failure: function(error) {
                Ext.Viewport.setMasked(false);
                Ext.Msg.alert('Error', 'Unable to fetch data.');
            }
        });
    },
    tweetNow: function(callback, scope) {
        console.log('lets tweet');

        this.shareNow('twitter');
    },
    fbNow: function(callback, scope) {
        console.log('lets fb');

        this.shareNow('facebook');
    },
    instaNow: function(callback, scope) {
        console.log('lets insta');

        this.shareNow('instagram');
    }
});
