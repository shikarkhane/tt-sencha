Ext.define('ttapp.util.FeedProxy', {
    singleton: true,
    // requires: ['Ext.data.JsonP'],

    process: function() {
        var messageStore = Ext.getStore('Messages'),
            messageModel,
           	myNumber = Ext.getStore('profilestore').getPhoneNumber();
           	
            if(myNumber){
			 Ext.Ajax.request({
                        url:  ttapp.config.Config.getBaseURL() + '/feed/' + myNumber + '/',
                        method: 'GET',
                        headers: { 'Content-Type': 'application/json'},
                        disableCaching: false,
                        
                        success: function(response) {
                            var messages = Ext.JSON.decode(response.responseText.trim());                            
                            Ext.Array.each( messages, function(message) {
                                var fromUserName,
                                    toUserName,
                                    fromUser = message.from_user,
                                    toUser = message.to_user,
                                    sendTimestamp = message.send_timestamp,
                                    trinketFilePath = Ext.getStore('trinketstore').getThumbnailPath(message.trinket_name),
                                    text = message.text,
                                    secondsSent = message.seconds_sent,
                                    forInbox = true,
                                    unread = true;
                                
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
                            	
                                messageModel = Ext.create('ttapp.model.Message', {
                                    'from_user_name': fromUserName,
                                    'to_user_name': toUserName,
                                    'from_user': fromUser,
                                    'to_user': toUser,
                                    'send_timestamp': sendTimestamp,
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
    }
});

Ext.define('ttapp.store.Messages', {
    extend: 'Ext.data.Store',

    config: {
        model: 'ttapp.model.Message',
        data:[{
            'to_user_name': 'Jan 7, 2014',
            'from_user_name': 'Eddy Huang',
            'text':'All the best on your b\'day.',
            'seconds_sent': 10,
            'type':'receive',
            'unread':true,
            'trinket_file_path':'resources/images/others/tink.png'
        },
        {
            'to_user_name': 'Jan 7, 2014',
            'from_user_name': 'Eddy Huang',
            'text':'All the best on your b\'day.',
            'seconds_sent': 10,
            'type':'receive',
            'unread':true,
            'trinket_file_path':'resources/images/others/tink.png'
        },
        {
            'to_user_name': 'Jan 7, 2014',
            'from_user_name': 'Eddy Huang',
            'text':'All the best on your b\'day.',
            'seconds_sent': 10,
            'type':'sent',
            'unread':false,
            'trinket_file_path':'resources/images/others/tink_design.png'
        },
        {
            'to_user_name': 'Jan 7, 2014',
            'from_user_name': 'Eddy Huang',
            'text':'All the best on your b\'day.',
            'seconds_sent': 10,
            'type':'sent',
            'unread':false,
            'trinket_file_path':'resources/images/others/tink_design.png'
        },
        {
            'to_user_name': 'Jan 7, 2014',
            'from_user_name': 'Eddy Huang',
            'text':'All the best on your b\'day.',
            'seconds_sent': 10,
            'type':'receive',
            'unread':true,
            'trinket_file_path':'resources/images/others/tink.png'
        },
        {
            'to_user_name': 'Jan 7, 2014',
            'from_user_name': 'Eddy Huang',
            'text':'All the best on your b\'day.',
            'seconds_sent': 10,
            'type':'receive',
            'unread':true,
            'trinket_file_path':'resources/images/others/tink.png'
        },
        {
            'to_user_name': 'Jan 7, 2014',
            'from_user_name': 'Eddy Huang',
            'text':'All the best on your b\'day.',
            'seconds_sent': 10,
            'type':'receive',
            'unread':false,
            'trinket_file_path':'resources/images/others/tink_design.png'
        }]
    },
    getLastRecord: function(){
        this.load();
        return this.last();
    }
});
