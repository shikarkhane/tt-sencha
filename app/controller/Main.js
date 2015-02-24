Ext.define('ttapp.controller.Main', {
    extend: 'Ext.app.Controller',
    requires: ['ttapp.util.Push'],
    config: {
        refs: {
        },
        control: {
        }
    },
    launch: function(){
        // when app comes to foreground
        document.addEventListener("resume", ttapp.util.Push.takeUserPermissionForPushNotify, false);
    }
});
