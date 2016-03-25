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
        if (this._animating) {
            return;
        }

        this._animating = true;

        if (Ext.os.deviceType == 'Phone') {
            ttapp.util.Push.takeUserPermissionForPushNotify();
        }

        Ext.getStore('profilestore').isUserVerified(function(success) {
            if (success === true) {
                var item = Ext.Viewport.add({
                    xtype: 'tinkometer'
                });

                item.element.setStyle('opacity', '0');
                item.element.show();

                ttapp.util.Analytics.trackView('Tinkometer');

                //dont move to tinkometer, if app was launched by alert notification
                if ( ttapp.config.Config.getLaunchedViaNotification()){
                    // good job, now we revert back config to false
                    ttapp.config.Config.setLaunchedViaNotification(false);
                }
                else{
                    Ext.create('Ext.util.DelayedTask', function () {
                        item.element.hide();
                        item.element.setStyle('opacity', '1');

                        Ext.Viewport.animateActiveItem(item, fade === true ? 'fade' : 'slide');
                    }).delay(180);
                }

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
