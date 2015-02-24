Ext.define('ttapp.util.Push', {
    singleton: true,

    storeDeviceInfoOnServer: function(token){
        var to_user = Ext.getStore('profilestore').getPhoneNumber();
        console.log('register token('+ token+ ') for user(' + to_user + ')' );
        if(!token){
            token = null;
        }
          Ext.Ajax.request({
                            url:  ttapp.config.Config.getBaseURL() + '/push/' + to_user + '/',
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json'},
                            disableCaching: false,
                            jsonData: {
                                "device_name" : device.name,
                                "device_platform" : device.platform.toLowerCase(),
                                "device_uuid": device.uuid,
                                "push_token": token
                            },

                            success: function(response) {
                                console.log(response.responseText);
                            },
                                failure: function(response, opts) {
                                    console.log('Error in push: ' + response) ;
                                    
                                }
                        });
      
    },
    onNotificationAPN: function ( event ) {
        console.log('inside onNotificationAPN event');        
    },
    onNotificationGCM: function ( event ) {
        console.log('inside onNotificationGCM event');        
    },
    tokenHandler: function ( token ) {
        console.log(token);
                ttapp.util.Push.storeDeviceInfoOnServer(token);
    },
    errorHandler: function ( error ) {
        console.log(error);
    },
    takeUserPermissionForPushNotify: function(){
        var pushNotification = window.plugins.pushNotification;
        var platform = device.platform.toLowerCase();
        if ( platform == 'ios'){
            pushNotification.register(ttapp.util.Push.tokenHandler, ttapp.util.Push.errorHandler, { badge: true, sound: true, alert: true, ecb: 'ttapp.util.Push.onNotificationAPN' });            
        }
        if ( platform == 'android'){
            pushNotification.register(ttapp.util.Push.tokenHandler, ttapp.util.Push.errorHandler,{"senderID":"241347109918","ecb":"ttapp.util.Push.onNotificationGCM"});
        }
    },
    constructor: function() {
        return this;
    }

});