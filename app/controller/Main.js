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
        console.log('on resume');
        ttapp.util.Common.isUserVerifiedOnServer();
        // refresh push token
        ttapp.util.Push.takeUserPermissionForPushNotify();
        //refresh feed 
        ttapp.util.FeedProxy.process(true);
        // refresh contacts list
        ttapp.util.ContactsProxy.process(Ext.getStore('phonecontacts'));

    }
});
