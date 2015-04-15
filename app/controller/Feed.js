Ext.define('ttapp.controller.Feed', {
    extend: 'Ext.app.Controller',
    config: {
        refs: {
        },
        control: {
            'feed list': {
                itemtap: 'onShowTinkInFeed'
            }
        }
    },
    onShowTinkInFeed: function(list, idx, target, record, evt){
        var from_user = Ext.getStore('profilestore').getPhoneNumber();
        if ((from_user != record.data.from_user) && (record.data.unread)){
            this.tinkRead(record);    
        }
        
        Ext.Viewport.setActiveItem('replaytink',{type:'slide'});
    },
    tinkRead: function(record){
        //todo: mark tink is read in localstore
        //mark the tink as read on the server 
          Ext.Ajax.request({
                            url:  ttapp.config.Config.getBaseURL() + '/message-read/',
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json'},
                            disableCaching: false,
                            jsonData: {
                                "from_user" : record.data.from_user,
                                "to_user" : record.data.to_user, 
                                "send_timestamp": record.data.send_timestamp, 
                                "trinket_name": record.data.trinket_name, 
                                "text" : record.data.text,
                                "seconds_sent": record.data.seconds_sent,
                                "unread": false
                            },

                            success: function(response) {
                                console.log(response.responseText);
                            }
                        });
           //change the red dot on email icon
            ttapp.util.Common.updateNotifySymbol(false);

    },
    returnFormattedDate: function(timestamp){
        var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        var d = new Date(timestamp);
        
        var date = d.getDate();
        var month = monthNames[d.getMonth()];
        var year = d.getFullYear();

        return month+' '+date+', '+year;
    }
});
