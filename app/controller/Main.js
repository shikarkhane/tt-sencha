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
        console.log('setup resume listener');
        document.addEventListener("resume", this.onResume, false);
        console.log('after setup resume listener');
    },
    onResume: function(){
        console.log('on resume');
        // refresh push token
        ttapp.util.Push.takeUserPermissionForPushNotify();
        //refresh feed 
        ttapp.util.FeedProxy.process();
        // refresh contacts list
        ttapp.util.ContactsProxy.process(Ext.getStore('phonecontacts'));
    }
});
