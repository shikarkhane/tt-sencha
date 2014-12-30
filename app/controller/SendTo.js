Ext.define('ttapp.controller.SendTo', {
    extend: 'Ext.app.Controller',
    xtype: 'sendto',
    config: {
        refs: {
            sendTinkButtonClick: '#sendTink',
            searchContactsField: '#searchContactsField'
        },
        control: {
            'searchContactsField': {
                // todo not working yet
                keyup: 'searchReady'
            },
            'sendTinkButtonClick': {
                tap: 'sendMyTink'
            }
        }
    },
    searchReady : function(){
        console.log('ready to search');
    },
    sendMyTink : function(){
        console.log('send my tink');
        var cs = Ext.getCmp('choose-recepients');
        cs.hide();
        Ext.Viewport.setActiveItem('feed');
    },

    showSendTo: function(){
        //Ext.Viewport.setActiveItem('sendto');
        Ext.Viewport.add({
            xtype: 'sendto',
            id: 'choose-recepients',
            modal: true,
            hideOnMaskTap: true,
            showAnimation: {
                type: 'popIn',
                duration: 250,
                easing: 'ease-out'
            },
            hideAnimation: {
                type: 'popOut',
                duration: 250,
                easing: 'ease-out'
            },
            centered: true,
            width: Ext.filterPlatform('ie10') ? '100%' : (Ext.os.deviceType == 'Phone') ? 260 : 400,
            height: Ext.filterPlatform('ie10') ? '30%' : Ext.os.deviceType == 'Phone' ? 220 : 400
        });
    }
});
