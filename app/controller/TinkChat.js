Ext.define('ttapp.controller.TinkChat', {
	extend: 'Ext.app.Controller',
	config: {
		refs: {
            backBtn: 'button[cls~=back-btn-icon]'
        },
		control: {
			'tinkchat': {
				show: 'renderList',
				hide: 'removeList'
			},
			'tinkchat dataview': {
				itemtap: 'onChatSelect'
			},
			'backBtn': {
				tap: 'backToTinkBox'
			}
		}
	},
	removeList: function() {
        var me = this;
		me.list.destroy();
	},

	renderList: function(component) {
        Ext.getCmp('tinkchatimage').setStyle({'background':'url(resources/images/user-icon.png)'});
        Ext.Viewport.mask({
            xtype: 'loadmask',
            html: '<img src="resources/images/green-loader.png" alt="loader">'
        });
        
		Ext.getStore('profilestore').getPhoneNumber(function(userNum) {
            Ext.Ajax.request({
                url: ttapp.config.Config.getBaseURL() + '/conversation/' + window.selectedTinkBoxItem.data.number + '/between/' + userNum + '/page/0/size/9/',
                method: 'GET',
                disableCaching: false,
                success: function(response) {
                    Ext.Viewport.setMasked(false);
                    message = Ext.decode(response.responseText);

                    var profile_url = Ext.getStore('phonecontacts').getUserImage(window.selectedTinkBoxItem.data.number);
                    if(!Ext.isEmpty(profile_url)) {
                        Ext.getCmp('tinkchatimage').setStyle({'background':'url('+profile_url+')'});
                    }
                    
                    Ext.select('.user-title').setHtml(getName(window.selectedTinkBoxItem.data.number));
                    
                    Ext.select('.tink-in-friend').setHtml(showTinkTime(window.selectedTinkBoxItem.data.inout.split("-")[0]));
                    Ext.select('.tink-out-friend').setHtml(showTinkTime(window.selectedTinkBoxItem.data.inout.split("-")[1]));

                    total_time = parseInt(window.selectedTinkBoxItem.data.inout.split("-")[0]) + parseInt(window.selectedTinkBoxItem.data.inout.split("-")[1]);
                    console.log("total_time__"+total_time);
                    percent = (parseInt(window.selectedTinkBoxItem.data.inout.split("-")[1])/total_time)*100;
                    console.log("percent__"+percent);
                    // (id, radius, border-width, percent)
                    testCircleCss('tinkChatCircle', 25, 5, Math.ceil(percent));

                    function formatted_date(timestamp) {
                        var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                        var dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
                        var d = new Date(timestamp);

                        var date = d.getDate();
                        var month = monthNames[d.getMonth()];
                        var year = d.getFullYear();
                        var day = dayNames[d.getDay()];

                        return day+'. '+date+' '+month;
                        //return month + ' ' + date + ', ' + year;
                    }
                    window.arr = [];
                    
                    var store = Ext.getStore('TinkChatStore');
                    store.load();
                    store.removeAll();
                    store.getProxy().clear();
                    store.sync();
                    
                    for(i=0; i<message.messages.length; i++) {
                        var fromUserName,
                            toUserName,
                            fromUser = message.messages[i].from_user,
                            toUser = message.messages[i].to_user,
                            sendTimestamp = message.messages[i].send_timestamp,
                            formatted_sendTimestamp = formatted_date(message.messages[i].send_timestamp),
                            original_trinketFilePath = Ext.getStore('trinketstore').getThumbnailPath(message.messages[i].trinket_name),
                            trinketFilePath = original_trinketFilePath,
                            text = message.messages[i].text,
                            secondsSent = message.messages[i].seconds_sent,
                            forInbox = true,
                            unread = message.messages[i].unread;
                            
                        if (toUser == userNum.toString()) {
                            toUserName = 'me';
                        } else {
                            toUserName = Ext.getStore('phonecontacts').getFirstLastName(toUser);
                        }

                        if (fromUser == userNum.toString()) {
                            fromUserName = 'me';
                            forInbox = false;
                            unread = false;
                        } else {
                            fromUserName = Ext.getStore('phonecontacts').getFirstLastName(fromUser);
                        }

                        // order of this check is imp
                        if (unread === true) {
                            //trinketFilePath = logoTrinketFilePath;
                            unreadRedDot = true;
                        }

                        store.add({
                            'from_user_name': fromUserName,
                            'to_user_name': toUserName,
                            'from_user': fromUser,
                            'to_user': toUser,
                            'send_timestamp': sendTimestamp,
                            'formatted_timestamp': formatted_sendTimestamp,
                            'trinket_name': message.messages[i].trinket_name,
                            'trinket_file_path': trinketFilePath,
                            'original_trinket_file_path': original_trinketFilePath,
                            'text': text,
                            'seconds_sent': secondsSent,
                            'for_inbox': forInbox,
                            'unread': unread
                        });

                        store.sync();
                    }
                },
                failure: function(error) {
                    Ext.Viewport.setMasked(false);
                    Ext.Msg.alert('', 'Error');
                }
            });
        });

		var list = Ext.create('Ext.List', {
			height: '100%',
			cls:'tinkchat-list',
			useSimpleItems: true,
			emptyText: 'No chats available.',
			itemTpl: [
				/*'<tpl if="send == 1">',*/
				'<tpl if=\'for_inbox == false\'>',
					'<div class="chat-list">',
						'<span class="left-sec">{text}</span><span class="right-sec"><span class="seconds">{seconds_sent} sec(s)</span><span class="img"><img class="tink" src="{original_trinket_file_path}"></span><span class="date">{formatted_timestamp}</span></span>',
					'</div>',
				'<tpl else>',
					/*'<tpl if="unread == 1">',*/
					'<tpl if=\'unread == true\'>',
						'<div class="chat-list receive-chat">',
							'<span class="right-sec"><span class="open">Open it!</span><span class="img"><span class="overlay-video"></span><img class="tink-new" src="{original_trinket_file_path}"></span><span class="date">{formatted_timestamp}</span></span><span class="left-sec">{text}</span>',
						'</div>',
					'<tpl else>',
						'<div class="chat-list receive-chat">',
							'<span class="right-sec"><span class="seconds">{seconds_sent} sec(s)</span><span class="img"><img src="{original_trinket_file_path}"></span><span class="date">{formatted_timestamp}</span></span><span class="left-sec">{text}</span>',
						'</div>',
					'</tpl>',
				'</tpl>'
			],
			store: {
				id: 'TinkChatStore',
				fields: ['id', 'from_user_name', 'to_user_name', 'from_user', 'formatted_timestamp', 'to_user', 'send_timestamp', 'trinket_name', 'trinket_file_path', 'original_trinket_file_path', 'text', 'seconds_sent', 'for_inbox', 'unread'],
				sorters: {
                    property: 'send_timestamp',
                    direction: 'DESC'
                },
				data: []
			}
		});
		this.list = list;
		component.add(list);
		component.add(ttapp.util.Common.createMenuButton());
	},
	
	onChatSelect: function(target, index, e, record, eOpts) {
		console.log(record);
		console.log(eOpts);
        
		if(eOpts.target.className == "tink-new" || eOpts.target.className == "overlay-video") {
			// Ext.Ajax.request({
	  //           url: ttapp.config.Config.getBaseURL()+'/message-read-v2/',
	  //           method: 'POST',
	  //           disableCaching: false,
	  //           jsonData: {
	  //           	"from_user": record.data.from_user,
	  //           	"to_user": record.data.to_user,
	  //           	"send_timestamp": record.data.send_timestamp,
	  //           	"text": record.data.text,
	  //           	"seconds_sent": record.data.seconds_sent,
	  //           	"unread": false,
	  //           	"trinket_name": record.data.trinket_name
	  //           },
	  //           success: function(response) {
	  //               console.log(response);
	  //           },
	  //           failure: function(error) {
	  //           }
	  //       });
		}

		if(eOpts.target.className == "overlay-video") {
			var element = eOpts.target.nextSibling;	
		} else {
			var element = Ext.get(eOpts.target);
		}
		
        var me = this;

        //window.fromTinkReplay = 1;

        Ext.getStore('profilestore').getPhoneNumber(function(from_user) {
            console.log(from_user);
            // if ((from_user != record.data.from_user) && (record.data.unread)) {
            // 	console.log(element);
            // 	console.log(record);
            //     me.tinkRead(element, record);
            // }

            me.getApplication().getController("ttapp.controller.ReplayTink").addReplay(record.data.seconds_sent, record.data.text, record.data.trinket_name);
        });
        Ext.Ajax.request({
            url: ttapp.config.Config.getBaseURL()+'/message-read-v2/',
            method: 'POST',
            disableCaching: false,
            jsonData: {
             "from_user": record.data.from_user,
             "to_user": record.data.to_user,
             "send_timestamp": record.data.send_timestamp,
             "text": record.data.text,
             "seconds_sent": record.data.seconds_sent,
             "unread": false,
             "trinket_name": record.data.trinket_name
            },
            success: function(response) {
                //var json = Ext.JSON.decode(response.responseText);
                console.log(response);
            },
            failure: function(error) {
            }
        });
		// if(eOpts.target.className == 'tink') {
		// 	Ext.Ajax.request({
  //               url: ttapp.config.Config.getBaseURL()+'/message-read-v2/',
  //               method: 'POST',
  //               disableCaching: false,
  //               jsonData: {
  //               	"from_user": record.data.from_user,
  //               	"to_user": record.data.to_user,
  //               	"send_timestamp": record.data.send_timestamp,
  //               	"text": record.data.text,
  //               	"seconds_sent": record.data.seconds_sent,
  //               	"unread": true,
  //               	"trinket_name": record.data.trinket_name
  //               },
  //               success: function(response) {
  //                   var json = Ext.JSON.decode(response.responseText);
  //                   console.log(json);
  //               },
  //               failure: function(error) {
  //               }
  //           });
		// } 
			//{
			//ttapp.app.getController('Tink').useActiveTrinket();
			// var me = this;
	  //       Ext.getStore('profilestore').getActiveTrinket(function(trinketName) {
	  //           me.activeTrinketName = trinketName;

	  //           Ext.getStore('trinketstore').getThumbnailPath(me.activeTrinketName, function(activeTrinketThumbnailPath) {
	  //               Ext.getStore('trinketstore').getSwiffyPath(me.activeTrinketName, function(activeTrinketSwiffyPath) {
	  //                   me.showActiveTrinketThumbnail(activeTrinketThumbnailPath);

	  //                   var trinketArea = Ext.get('swiffydivtinkchat');
	  //                   trinketArea.setHtml('<iframe id="tinkcontainertinkchat" class="tinkanimation" allowtransparence="true"></iframe>');

	  //                   var iframe = trinketArea.child('iframe');
	  //                   iframe.dom.style.opacity = 0;

	  //                   iframe.dom.onload = function() {
	  //                       iframe.dom.style.opacity = 1;
	  //                       iframe.dom.onload = null;

	  //                       Ext.Viewport.unmask();
	  //                   };

	  //                   iframe.dom.src = activeTrinketSwiffyPath;
	  //               });
	  //           });
	  //       });
	},

	backToTinkBox: function() {
		Ext.Viewport.animateActiveItem('tinkbox', {type: 'slide', direction: 'right'});
	}
});