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
        document.addEventListener("resume", this.getApplication().getController('main').onResume, false);
    },
    onResume: function(){
        // refresh push token
        ttapp.util.Push.takeUserPermissionForPushNotify();
        // refresh contacts list
        ttapp.util.ContactsProxy.process(Ext.getStore('phonecontacts'));
    }
});
