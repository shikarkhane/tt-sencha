Ext.define('ttapp.controller.Landing', {
    extend: 'Ext.app.Controller',
    requires: ['ttapp.store.Profile'],
    //, 'Ext.device.Push', 'Ext.device.Device'
    config: {
        refs: {
            btnBegin: 'button[cls~=clsBegin]',
            //closeintro: 'button[cls~=close-intro-goto-auth]'
        },
        control: {
            'btnBegin': {
                tap: 'onUserAction'
            }
            // closeintro: {
            //     tap: 'onCloseIntro'
            // }
        }
    },
    // onCloseIntro: function(){
    //     Ext.ComponentQuery.query('#introPage')[0].destroy();

    //     Ext.Viewport.setActiveItem('authenticate', {
    //         type: 'fade'
    //     });
    // },
    onUserAction: function(fade) {
        ttapp.util.Analytics.trackView('Landing');

        if (this._animating) {
            return;
        }

        this._animating = true;

        if (Ext.os.deviceType == 'Phone') {
            ttapp.util.Push.takeUserPermissionForPushNotify();
        }

        Ext.getStore('profilestore').isUserVerified(function(success) {
            if (success === true) {
                ttapp.util.common.existsUnreadMessages(function(exists){
                    var itemXtype, itemFullname;

                    if (exists === true){
                        itemXtype = 'tinkbox';
                        itemFullname = 'ttapp.view.TinkBox';
                    }
                    else{
                        itemXtype = 'tinkometer';
                        itemFullname = 'ttapp.view.TinkoMeter';
                    }

                    try{
                        // check if view exists in viewport, if not add it.
                        var tb = Ext.Viewport.down(itemXtype);
                        if (!tb){
                            Ext.Viewport.add(Ext.create(itemFullname));
                        }

                        Ext.Viewport.animateActiveItem(itemXtype, { type: 'slide' });

                    }
                    catch(e) {
                        console.log('Create tinkbox/tinkometer view if not exists:' + e);
                    }

                    ttapp.util.Analytics.trackView(itemXtype);
                });
            } else {
                ttapp.util.Analytics.trackView('Authenticate');

                var a = Ext.Viewport.down('authenticate');
                if (!a) {
                    Ext.Viewport.add(Ext.create('ttapp.view.Authenticate'));
                }
            }
        });
    }
});
