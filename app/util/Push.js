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
                                "device_name" : 'test-nikhil-iphone',
                                "device_platform" : 'ios',
                                "device_uuid": 'myuuid',
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
    tokenHandler: function ( token ) {
        console.log(token);
                ttapp.util.Push.storeDeviceInfoOnServer(token);
    },
    errorHandler: function ( error ) {
        console.log(error);
    },
    takeUserPermissionForPushNotify: function(){
        pushNotification = window.plugins.pushNotification;
        pushNotification.register(ttapp.util.Push.tokenHandler, ttapp.util.Push.errorHandler, { badge: true, sound: true, alert: true, ecb: 'ttapp.util.Push.onNotificationAPN' });
    },
    constructor: function() {
        return this;
    }

});