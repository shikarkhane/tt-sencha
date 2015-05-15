Ext.define('ttapp.util.FeedProxy', {
    singleton: true,
    requires: ['ttapp.util.Common'],

    process: function(clearAll) {
        var messageStore = Ext.getStore('Messages'),
            messageModel,
           	myNumber = Ext.getStore('profilestore').getPhoneNumber(),
            unreadRedDot = false,
            logoTrinketFilePath = 'resources/images/others/tink.png',
            page_number = ttapp.config.Config.getCurrentFeedPageNumber(),
            page_size = ttapp.config.Config.getFeedPageSize();

            if(clearAll){
                messageStore.removeAll();
            }

            if(myNumber){
			 Ext.Ajax.request({
                        //url:  ttapp.config.Config.getBaseURL() + '/feed/' + myNumber + '/',
                        url:  ttapp.config.Config.getBaseURL() + '/feed/' + myNumber + '/page/' + page_number + '/size/' + page_size + '/',
                        method: 'GET',
                        headers: { 'Content-Type': 'application/json'},
                        disableCaching: false,
                        
                        success: function(response) {
                            var messages = Ext.JSON.decode(response.responseText.trim());                            
                            Ext.Array.each( messages, function(message) {
                                // increment pagenumber if msgs were received
                                //var page_number = ttapp.config.Config.getCurrentFeedPageNumber() + 1;
                                //ttapp.config.Config.setCurrentFeedPageNumber(page_number);

                                var formatted_date = ttapp.app.getController('ttapp.controller.Feed').returnFormattedDate(message.send_timestamp);
                                var fromUserName,
                                    toUserName,
                                    fromUser = message.from_user,
                                    toUser = message.to_user,
                                    sendTimestamp = message.send_timestamp,
                                    formatted_sendTimestamp = formatted_date,
                                    original_trinketFilePath = Ext.getStore('trinketstore').getThumbnailPath(message.trinket_name),
                                    trinketFilePath = original_trinketFilePath,
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
                                    trinketFilePath = logoTrinketFilePath;
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
                                    'original_trinket_file_path': original_trinketFilePath,
                                    'text': text,
                                    'seconds_sent': secondsSent,
                                    'for_inbox': forInbox,
                                    'unread': unread    
                                });
                            	messageStore.add(messageModel);
                            });
                            
                        if ( messageStore.getAllCount() == 0 )
                            {
                                messageModel = Ext.create('ttapp.model.Message', {
                                        'from_user_name': "Mia, from tinktime",
                                        'to_user_name': "me",
                                        'from_user': "0",
                                        'to_user': "0",
                                        'send_timestamp': 0,
                                        'formatted_timestamp': "few secs ago",
                                        'trinket_name' : "cute-dancing-guy",
                                        'trinket_file_path': logoTrinketFilePath,
                                        'original_trinket_file_path': Ext.getStore('trinketstore').getThumbnailPath("cute-dancing-guy"),
                                        'text': "Go ahead, click to view your first tink!",
                                        'seconds_sent': 7,
                                        'for_inbox': true,
                                        'unread': true    
                                    });
                                messageStore.add(messageModel);
                                unreadRedDot = true;
                        }

                        //change the red dot on email icon
                        ttapp.util.Common.updateNotifySymbol(unreadRedDot);
                        }
                    });
            }

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
