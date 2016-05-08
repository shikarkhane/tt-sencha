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
        try {
            if (navigator.connection.type == Connection.NONE) {
                Ext.Msg.alert('No Internet Connection', null, Ext.emptyFn);
            }
        }
        catch(e) {
            console.log("NO_INTERNET_CONNECTION: "+ e);
        }

        console.log('SLOWNESS: on resume starts');
        ttapp.util.TrinketProxy.process(true, function() {
            console.log('SLOWNESS: get trinket list');
           ttapp.util.Common.isUserVerifiedOnServer(function(success) {
               console.log('SLOWNESS: get is verified on server');
                // Initialize the main view
                if (success) {

                    Ext.getStore('profilestore').hasUserAllowedPushNotification(function(success) {
                        if(success){
                            // refresh push token
                            ttapp.util.Push.takeUserPermissionForPushNotify();
                            console.log('SLOWNESS: take permission for push');
                        }
                        else{
                            ttapp.util.Common.askPushNotificationPermission();
                        }
                    });


                    //update user image avatar
                    Ext.getStore('profilestore').setUserImage();
                    console.log('SLOWNESS: get user profile url');

                    ttapp.util.Common.hasUserAllowedEULAContactsRead(function(success) {
                        if(success){
                            // get contacts from device
                            ttapp.util.ContactsProxy.process(Ext.getStore('phonecontacts'));
                        }
                    });
                    console.log('SLOWNESS: refresh contacts from phone');

                    //if on resume activeItem is tinkbox, refresh it
                    if(Ext.Viewport.getActiveItem().config.xtype == 'tinkbox') {
                        console.log('On resume, if active item tinkbox - refresh it');
                        var activeItem = Ext.Viewport.getActiveItem();
                        activeItem.hide();
                        activeItem.show();
                    }
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
