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
                tap: 'composeTink'
            }
        }
    },
    searchReady : function(){
        console.log('ready to search');
    },
    composeTink : function(){
        debugger;
        from_user = this.getFromUser();
        this.sendTink(from_user, "carin", 201501010101, 1, "hello", 13);
        this.showFeed();
    },
    sendTink: function(from_user, to_user, send_timestamp, trinket_id, text, seconds_sent){
          Ext.Ajax.request({
                            url: 'http://localhost:8888/message-queue/',
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json'},
                            disableCaching: false,
                            jsonData: {
                                "from_user" : from_user,
                                "to_user" : to_user, 
                                "send_timestamp": send_timestamp, 
                                "trinket_id": trinket_id, 
                                "text" : text,
                                "seconds_sent": seconds_sent
                            },

                            success: function(response) {
                                console.log(response.responseText);
                            }
                        });
    },
    showFeed: function(){
        var cs = Ext.getCmp('choose-recepients');
        cs.hide();
        Ext.Viewport.setActiveItem('feed');
    },
    getFromUser: function(){
        var profileStore = Ext.getStore('profilestore');
        profileStore.each(function(p){
                from_user = p.data.phone_number;
                return false;
            });
        return from_user;
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
