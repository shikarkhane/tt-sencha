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
    onUserAction: function(showTinkometer) {

        ttapp.util.Analytics.trackView('Landing');

        if (Ext.os.deviceType == 'Phone') {
            ttapp.util.Push.takeUserPermissionForPushNotify();
        }

        Ext.getStore('profilestore').isUserVerified(function(success) {
            if (success === true) {
                ttapp.util.Common.existsUnreadMessages(function(exists){
                    var itemXtype, itemFullname;

                    if (exists === true){
                        itemXtype = 'tinkbox';
                        itemFullname = 'ttapp.view.TinkBox';
                    }
                    else{
                        itemXtype = 'tinkometer';
                        itemFullname = 'ttapp.view.TinkoMeter';
                    }

                    if (!showTinkometer && itemXtype === 'tinkometer')
                    {
                        console.log('Skip tinkometer screen. Caller method doesnt want to switch screen if no new msgs');
                    }
                    else {
                        try {
                            // check if view exists in viewport, if not add it.
                            var tb = Ext.Viewport.down(itemXtype);
                            if (!tb) {
                                Ext.Viewport.add(Ext.create(itemFullname));
                            }

                            Ext.Viewport.animateActiveItem(itemXtype, {type: 'slide'});

                        }
                        catch (e) {
                            console.log('Create tinkbox/tinkometer view if not exists:' + e);
                        }

                        ttapp.util.Analytics.trackView(itemXtype);
                    }

                });
            } else {
                ttapp.util.Analytics.trackView('Authenticate');

                var a = Ext.Viewport.down('authenticate');
                if (!a) {
                    Ext.Viewport.add(Ext.create('ttapp.view.Authenticate'));
                }

                //change to authenticate screen only if its not confirm code screen
                if(Ext.Viewport.getActiveItem().config.xtype != 'confirmphonenumber') {
                    Ext.Viewport.animateActiveItem('authenticate', {
                        type: 'slide'
                    });
                }

            }
        });
    }
});
