Ext.define('ttapp.controller.Main', {
    extend: 'Ext.app.Controller',
    xtype: 'main',
    requires: ['ttapp.util.Push'],
    config: {
        refs: {
        },
        control: {
        }
    },
    launch: function(){
        // when app comes to foreground
        document.addEventListener("resume", this.onResume, false);
    },
    onResume: function(){
        console.log('SLOWNESS: on resume starts');
        ttapp.util.TrinketProxy.process(true, function() {
            console.log('SLOWNESS: get trinket list');
           ttapp.util.Common.isUserVerifiedOnServer(function(success) {
               console.log('SLOWNESS: get is verified on server');
                // Initialize the main view
                if (success) {
                    // refresh push token
                    ttapp.util.Push.takeUserPermissionForPushNotify();
                    console.log('SLOWNESS: take permission for push');

                    //update user image avatar
                    Ext.getStore('profilestore').setUserImage();
                    console.log('SLOWNESS: get user profile url');

                    // refresh contacts list
                    ttapp.util.ContactsProxy.process(Ext.getStore('phonecontacts'));
                    console.log('SLOWNESS: refresh contacts from phone');
                }
                else {
                    Ext.Viewport.add(Ext.create('ttapp.view.Authenticate'));
                    console.log('SLOWNESS: show authenticate');
                }
            });

        });
        console.log('on resume ends');
    }
});
