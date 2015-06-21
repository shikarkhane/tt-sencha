Ext.define('ttapp.controller.Landing', {
    extend: 'Ext.app.Controller',
    requires: ['ttapp.store.Profile'],
    //, 'Ext.device.Push', 'Ext.device.Device'
    config: {
        refs: {
            btnBegin: 'button[cls~=clsBegin]'
        },
        control: {
            'btnBegin': {
                tap: 'onUserAction'
            }
        }
    },
    onUserAction: function() {
        if (Ext.os.deviceType == 'Phone') {
            ttapp.util.Push.takeUserPermissionForPushNotify();
        }

        Ext.getStore('profilestore').isUserVerified(function(success) {
            if (success === true) {
                var item = Ext.Viewport.add({
                    xtype: 'trinket'
                });

                item.element.setStyle('opacity', '0')
                item.element.show();

                setTimeout(function() {
                    item.element.hide();
                    item.element.setStyle('opacity', '1')

                    Ext.Viewport.animateActiveItem(item, 'slide');
                }, 180);
            } else {
                Ext.Viewport.animateActiveItem('authenticate', {
                    type: 'slide'
                });
            }
        });
    }
});
