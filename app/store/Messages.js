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
<<<<<<< HEAD
                            var messages = Ext.JSON.decode(response.responseText.trim()); 
=======
                            var messages = Ext.JSON.decode(response.responseText.trim());                            
                            
>>>>>>> bd2b4f8e9c982b2d4f724e10ef657618557c142c
                            Ext.Array.each( messages, function(message) {
                                var formatted_date = ttapp.app.getController('ttapp.controller.Feed').returnFormattedDate(message.send_timestamp);
                                var fromUserName,
                                    toUserName,
                                    fromUser = message.from_user,
                                    toUser = message.to_user,
                                    sendTimestamp = formatted_date,
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
                                }
                            	
                                messageModel = Ext.create('ttapp.model.Message', {
                                    'from_user_name': fromUserName,
                                    'to_user_name': toUserName,
                                    'from_user': fromUser,
                                    'to_user': toUser,
                                    'send_timestamp': sendTimestamp,
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
    }
});


Ext.define('ttapp.store.Messages', {
    extend: 'Ext.data.Store',

    config: {
        model: 'ttapp.model.Message',
<<<<<<< HEAD
        data:[]
=======
        /*data:[
            {
                'from_user_name': 'tim',
                'to_user_name': 'me',
                'from_user': 'Ben Furoku',
                'to_user': 'Rajesh Gehlawat',
                'send_timestamp': 'Jan 8, 2014',
                'trinket_file_path': 'resources/images/others/tink.png',
                'text': '',
                'seconds_sent': 10,
                'for_inbox': true,
                'unread': true,
            },
            {
                'from_user_name': 'tim',
                'to_user_name': 'me',
                'from_user': 'Clara Cooper',
                'to_user': 'Rajesh Gehlawat',
                'send_timestamp': 'Jan 7, 2014',
                'trinket_file_path': 'resources/images/others/tink.png',
                'text': '',
                'seconds_sent': 10,
                'for_inbox': true,
                'unread': true
            },
            {
                'from_user_name': 'me',
                'to_user_name': 'eddy',
                'from_user': 'Rajesh Gehlawt',
                'to_user': 'Eddy Huang',
                'send_timestamp': 'Jan 7, 2014',
                'trinket_file_path': 'resources/images/others/tink_design.png',
                'text': 'All the best on your birthday, xoxo',
                'seconds_sent': 42,
                'for_inbox': false,
                'unread': false
            },
            {
                'from_user_name': 'tim',
                'to_user_name': 'me',
                'from_user': 'Noah Morrisson',
                'to_user': 'Rajesh Gehlawat',
                'send_timestamp': 'Jan 5, 2014',
                'trinket_file_path': 'resources/images/others/tink_design.png',
                'text': 'Get well soon',
                'seconds_sent': 10,
                'for_inbox': true,
                'unread': false
            }
        ]*/
>>>>>>> bd2b4f8e9c982b2d4f724e10ef657618557c142c
    },
    getLastRecord: function(){
        this.load();
        return this.last();
    }
});