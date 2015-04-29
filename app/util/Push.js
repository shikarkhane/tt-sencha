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
                                "device_name" : device.model,
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
        console.log('inside onNotificationAPN event' + event);        
    },
    tokenHandler: function ( token ) {
        console.log(token);
                ttapp.util.Push.storeDeviceInfoOnServer(token);
    },
    gcmSuccessHandler: function ( result ) {
        console.log('GCM registeration result: ' + result);
    },
    errorHandler: function ( error ) {
        console.log(error);
    },
    onNotificationGCM: function(e) {
        switch( e.event )
        {
            case 'registered':
                if ( e.regid.length > 0 )
                {
                    console.log("Regid " + e.regid);
                    ttapp.util.Push.storeDeviceInfoOnServer(e.regid);              
                }
            break;
 
            case 'message':
                //change the red dot on email icon
              ttapp.util.Common.updateNotifySymbol(true);
              // this is the actual push notification. its format depends on the data model from the push server
              Ext.Msg.alert('Update!', e.message, Ext.emptyFn); 
              
              Ext.Viewport.setActiveItem('feed','slide');
            break;
 
            case 'error':
              console.log('GCM error = '+e.msg);
            break;
 
            default:
              console.log('An unknown GCM event has occurred');
              break;
        }
    },

    takeUserPermissionForPushNotify: function(){
        var pushNotification = window.plugins.pushNotification;
        var platform = device.platform.toLowerCase();
        if ( platform == 'ios'){
            pushNotification.register(ttapp.util.Push.tokenHandler, ttapp.util.Push.errorHandler, { badge: true, sound: true, alert: true, ecb: 'ttapp.util.Push.onNotificationAPN' });            
        }
        if ( platform == 'android'){
            pushNotification.register(ttapp.util.Push.gcmSuccessHandler, ttapp.util.Push.errorHandler,{"senderID":"241347109918","ecb":"ttapp.util.Push.onNotificationGCM"});
        }
    },
    constructor: function() {
        return this;
    }

});