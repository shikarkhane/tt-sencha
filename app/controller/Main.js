Ext.define('ttapp.controller.Main', {
    extend: 'Ext.app.Controller',
    config: {
        refs: {
        },
        control: {
        }
    },
    launch: function(){
        // when app comes to foreground
        document.addEventListener("resume", onResume, false);
    },
    onResume: function(){
        ttapp.util.Push.takeUserPermissionForPushNotify();
    }
});
