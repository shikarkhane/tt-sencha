Ext.define('ttapp.util.Push', {
    singleton: true,

    storeDeviceInfoOnServer: function(token) {
        Ext.getStore('profilestore').getPhoneNumber(function(to_user) {
            console.log('register token(' + token + ') for user(' + to_user + ')');
            if (!token) {
                token = null;
            }
            Ext.Ajax.request({
                url: ttapp.config.Config.getBaseURL() + '/push/' + to_user + '/',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                disableCaching: false,
                jsonData: {
                    "device_name": device.model,
                    "device_platform": device.platform.toLowerCase(),
                    "device_uuid": device.uuid,
                    "push_token": token
                },

                success: function(response) {
                    console.log(response.responseText);
                },
                failure: function(response, opts) {
                    console.log('Error in push: ' + response);

                }
            });
        });
    },
    tokenHandler: function(token) {
        console.log(token);
        ttapp.util.Push.storeDeviceInfoOnServer(token);
    },
    takeUserPermissionForPushNotify: function() {
        try {
            var senderId = ttapp.config.Config.getAndroidSenderId();
            var push = PushNotification.init({
                android: {
                    senderID: senderId
                },
                ios: {
                    alert: "true",
                    badge: "true",
                    sound: "true"
                },
                windows: {}
            });

            var platform = device.platform.toLowerCase();

            push.on('registration', function(data) {
                console.log('PUSH_'+platform+'_TOKEN:'+ data.registrationId);
                ttapp.util.Push.tokenHandler(data.registrationId);
            });
            push.on('error', function(e) {
                console.log('PUSH_'+platform+'_ERROR:' + e.message);
            });
            push.on('notification', function(data) {
                console.log('PUSH_'+platform+'_NOTIFICATION');
                console.log(data.message);
                console.log(data.title);
                console.log(data.count);
                console.log(data.sound);
                console.log(data.image);
                console.log(data.additionalData);

            });
        } catch(e) {
            console.log('PUSH_NOTIFY_ERROR:' + e);
        };
    },
    constructor: function() {
        return this;
    }

});
