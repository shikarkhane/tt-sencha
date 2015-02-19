Ext.define('ttapp.controller.Landing', {
    extend: 'Ext.app.Controller',
    requires: ['ttapp.store.Profile'],
    //, 'Ext.device.Push', 'Ext.device.Device'
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
            
            if (Ext.os.deviceType == 'Phone'){
                this.takeUserPermissionForPushNotify();
            }
            Ext.Viewport.setActiveItem('trinket','slide');
        }
        else{
            Ext.Viewport.setActiveItem('authenticate','slide');   
        }
    },
    storeDeviceInfoOnServer: function(token){
        var to_user = Ext.getStore('profilestore').getPhoneNumber();
        if(!token){
            token = null;
        }
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
    takeUserPermissionForPushNotify: function(){
        var pFunctions = {
            tokenHandler: function ( token ) {
                this.storeDeviceInfoOnServer(token);
            },
            errorHandler: function ( error ) {
                console.log(error);
            },
            onNotificationAPN: function ( event ) {
                console.log('inside onNotificationAPN event');        
            }
        };

        pushNotification = window.plugins.pushNotification;
        pushNotification.register(pFunctions.tokenHandler, pFunctions.errorHandler, { badge: true, sound: true, alert: true, ecb: 'onNotificationAPN' });
        
    }
});
