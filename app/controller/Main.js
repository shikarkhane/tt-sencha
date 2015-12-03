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
        console.log('on resume starts');
        ttapp.util.TrinketProxy.process(true, function() {

           ttapp.util.Common.isUserVerifiedOnServer(function(success) {
                // Initialize the main view
                if (success) {
                    // refresh push token
                    ttapp.util.Push.takeUserPermissionForPushNotify();

                    //update user image avatar
                    Ext.getStore('profilestore').setUserImage();

                    // refresh contacts list
                    ttapp.util.ContactsProxy.process(Ext.getStore('phonecontacts'));
                }
                else {
                    Ext.Viewport.add(Ext.create('ttapp.view.Authenticate'));
                }
            });

        });
        console.log('on resume ends');
    }
});
