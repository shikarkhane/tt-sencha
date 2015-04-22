Ext.define('ttapp.util.FeedProxy', {
    singleton: true,
    requires: ['ttapp.util.Common'],

    process: function() {
        var messageStore = Ext.getStore('Messages'),
            messageModel,
           	myNumber = Ext.getStore('profilestore').getPhoneNumber(),
            unreadRedDot = false;

            messageStore.removeAll();

            if(myNumber){
			 Ext.Ajax.request({
                        url:  ttapp.config.Config.getBaseURL() + '/feed/' + myNumber + '/',
                        method: 'GET',
                        headers: { 'Content-Type': 'application/json'},
                        disableCaching: false,
                        
                        success: function(response) {
                            var messages = Ext.JSON.decode(response.responseText.trim());                            
                            Ext.Array.each( messages, function(message) {
                                var formatted_date = ttapp.app.getController('ttapp.controller.Feed').returnFormattedDate(message.send_timestamp);
                                var fromUserName,
                                    toUserName,
                                    fromUser = message.from_user,
                                    toUser = message.to_user,
                                    sendTimestamp = message.send_timestamp,
                                    formatted_sendTimestamp = formatted_date,
                                    trinketFilePath = Ext.getStore('trinketstore').getThumbnailPath(message.trinket_name),
                                    text = message.text,
                                    secondsSent = message.seconds_sent,
                                    forInbox = true,
                                    unread = message.unread;
                                
                                if( toUser == myNumber.toString()){
                                    toUserName = 'me';                                    
                                }
                                else{
                                    toUserName = Ext.getStore('phonecontacts').getFirstLastName(toUser);
                                }
                                
                                if( fromUser == myNumber.toString()){
                                    fromUserName = 'me';
                                    forInbox = false;
                                    unread = false;                                    
                                }
                                else{
                                    fromUserName = Ext.getStore('phonecontacts').getFirstLastName(fromUser);
                                }

                                // order of this check is imp
                                if ( unread == true){
                                    trinketFilePath = 'resources/images/others/tink.png';
                                    unreadRedDot = true;
                                }
                            	
                                messageModel = Ext.create('ttapp.model.Message', {
                                    'from_user_name': fromUserName,
                                    'to_user_name': toUserName,
                                    'from_user': fromUser,
                                    'to_user': toUser,
                                    'send_timestamp': sendTimestamp,
                                    'formatted_timestamp': formatted_sendTimestamp,
                                    'trinket_name' : message.trinket_name,
                                    'trinket_file_path': trinketFilePath,
                                    'text': text,
                                    'seconds_sent': secondsSent,
                                    'for_inbox': forInbox,
                                    'unread': unread    
                                });
                            	messageStore.add(messageModel);
                            });
                        }
                    });
            }

            //change the red dot on email icon
            ttapp.util.Common.updateNotifySymbol(unreadRedDot);
    }
});


Ext.define('ttapp.store.Messages', {
    extend: 'Ext.data.Store',

    config: {
        model: 'ttapp.model.Message',
        data:[]
    },
    getLastRecord: function(){
        this.load();
        return this.last();
    }
});
