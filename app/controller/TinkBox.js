Ext.define('ttapp.controller.TinkBox', {
	extend: 'Ext.app.Controller',
	config: {
		control: {
			'tinkbox': {
				show: 'getTinkBoxData'
			},
			'tinkbox dataview': {
				itemtap: 'onTinkBoxSelect'
			}
		}
	},

	getTinkBoxData: function(component) {
		console.log('in tink box');

        Ext.getStore('profilestore').getPhoneNumber(function(num){
            Ext.Ajax.request({
                url: ttapp.config.Config.getBaseURL() + '/groupedfeed/' + num + '/',
                method: 'GET',
                disableCaching: false,
                success: function(response) {
                    var json = Ext.JSON.decode(response.responseText);
                    for (i=0; i<json.groups.length; i++) {
                        Ext.getStore('tinkBoxStore').add({
                            'tink_in': displaytimer(json.groups[i].tink_in),
                            'tink_out': displaytimer(json.groups[i].tink_out),
                            'unread': json.groups[i].unread,
                            'user': getName(json.groups[i].user),
                            'img': ttapp.util.Common.animationThumbnail(),
                            'background': getBackgroundImage(json.groups[i].user),
                            'number': json.groups[i].user,
                            'inout': json.groups[i].tink_in+"-"+json.groups[i].tink_out
                        });
                    }
                },
                failure: function(error) {

                }
            });
        });

		var list = Ext.create('Ext.List', {
            height: '100%',
            cls: 'tinkbox-section',
            itemTpl: [
                '<tpl if="unread == 0">',
                    '<div class="list-box" style="background:url({background}) no-repeat 50% 50%">',
                        '<div class="over-lay"></div>',
                        '<span class="inner-detail"><span class="user-name">{user}</span><span class="info"><span class="circle"><img src={img} ></span><span class="time">{tink_in}</span><span class="tinkinout">Tink in</span></span><span class="info right"><span class="circle"><img src={img} ></span><span class="time">{tink_out}</span><span class="tinkinout">Tink out</span></span><span class="arrow"></span></span>',
                    '</div>',
                '<tpl else>',
                    '<div class="list-box" style="background:url({background}) no-repeat 50% 50%">',
                        '<div class="over-lay"></div>',
                        '<span class="inner-detail"><span class="user-name">{user}</span><span class="info"><span class="circle active"><span class="notification-icon"></span><img src={img} ></span><span class="time">{tink_in}</span><span class="tinkinout">Tink in</span></span><span class="info right"><span class="circle"><img src={img} ></span><span class="time">{tink_out}</span><span class="tinkinout">Tink out</span></span><span class="arrow"></span></span>',
                    '</div>',
                '</tpl>',
            ],
            store: {
                id: 'tinkBoxStore',
                autoLoad: true,
                fields: ['id', 'tink_in', 'tink_out', 'unread', 'user', 'img', 'background', 'number', 'inout']
            }
        });

        component.add(list);
		component.add(ttapp.util.Common.createMenuButton());
	},

	onTinkBoxSelect: function(target, index, e, record, eOpts) {
        Ext.Viewport.mask({
            xtype: 'loadmask',
            html: '<img src="resources/images/green-loader.png" alt="loader">'
        });

        Ext.getStore('profilestore').getPhoneNumber(function(userNum) {
            Ext.Ajax.request({
                url: ttapp.config.Config.getBaseURL() + '/conversation/' + record.data.number + '/between/' + userNum + '/page/0/size/9/',
                method: 'GET',
                disableCaching: false,
                success: function(response) {
                    Ext.Viewport.setMasked(false);
                    message = Ext.decode(response.responseText);

                    Ext.Viewport.animateActiveItem('tinkchat', {type: 'slide', direction: 'left'});
                    Ext.select('.user-title').setHtml(getName(record.data.number));
                    
                    Ext.select('.tink-in-friend').setHtml(showTinkTime(record.data.inout.split("-")[0]));
                    Ext.select('.tink-out-friend').setHtml(showTinkTime(record.data.inout.split("-")[1]));

                    total_time = record.data.inout.split("-")[0] + record.data.inout.split("-")[1];
                    percent = (record.data.inout.split("-")[1]/total_time)*100;
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
	}
});