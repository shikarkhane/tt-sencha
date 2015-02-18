Ext.define('ttapp.controller.Landing', {
    extend: 'Ext.app.Controller',
    requires: ['ttapp.store.Profile', 'Ext.device.Push', 'Ext.device.Device'],
    config: {
        refs: {
            btnBegin: 'button[cls~=clsBegin]',
        },
        control: {
            'btnBegin': {
                tap: 'onUserAction'
            }
        }
    },
    onUserAction: function(){
        if ( Ext.getStore('profilestore').isUserVerified() === true){
            //Ext.Viewport.setActiveItem('options');
            if (Ext.os.deviceType == 'Phone'){
                this.takeUserPermissionForPushNotify(Ext.getStore('profilestore').getPhoneNumber());
            }
            Ext.Viewport.setActiveItem('trinket','slide');
        }
        else{
            Ext.Viewport.setActiveItem('authenticate','slide');   
        }
    },
    takeUserPermissionForPushNotify: function(to_user){
        Ext.device.Push.register({
            type: Ext.device.Push.ALERT|Ext.device.Push.BADGE|Ext.device.Push.SOUND,
            success: function(token) {
                console.log('# Push notification registration successful:');
                console.log('    token: ' + token);

                Ext.Ajax.request({
                            url:  ttapp.config.Config.getBaseURL() + '/push/' + to_user + '/',
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json'},
                            disableCaching: false,
                            jsonData: {
                                "device_name" : Ext.device.Device.name,
                                "device_platform" : Ext.device.Device.platform, 
                                "device_uuid": Ext.device.Device.uuid, 
                                "push_token": token
                            },

                            success: function(response) {
                                console.log(response.responseText);
                            }
                        });
            },
            failure: function(error) {
                console.log('# Push notification registration unsuccessful:');
                console.log('     error: ' + error);
            },
            received: function(notifications) {
                console.log('# Push notification received:');
                console.log('    ' + JSON.stringify(notifications));
            }
        });
    }
});
