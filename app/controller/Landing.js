Ext.define('ttapp.controller.Landing', {
    extend: 'Ext.app.Controller',
    requires: ['ttapp.store.Profile'],
    //, 'Ext.device.Push', 'Ext.device.Device'
    config: {
        refs: {
            btnBegin: 'button[cls~=clsBegin]',
            closeintro: 'button[cls~=close-intro-goto-auth]'
        },
        control: {
            'btnBegin': {
                tap: 'onUserAction'
            },
            closeintro: {
                tap: 'onCloseIntro'
            }
        }
    },
    onCloseIntro: function(){
        Ext.ComponentQuery.query('#introPage')[0].destroy();

        Ext.Viewport.setActiveItem('authenticate', {
            type: 'fade'
        });
    },
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
                /*old code*/
                // var item = Ext.Viewport.add({
                //     xtype: 'trinket'
                // });

                var item = Ext.Viewport.add({
                    xtype: 'phoneContacts'
                });

                item.element.setStyle('opacity', '0');
                item.element.show();

                setTimeout(function() {
                    item.element.hide();
                    item.element.setStyle('opacity', '1');

                    Ext.Viewport.animateActiveItem(item, fade === true ? 'fade' : 'slide');
                }, 180);
            } else {
                setTimeout(function() {
                    Ext.Viewport.animateActiveItem('intro', {
                        type: 'fade'
                    });
                }, 400);
            }
        });
    }
});
