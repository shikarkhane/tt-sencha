Ext.define('ttapp.controller.TinkChat', {
	extend: 'Ext.app.Controller',
	config: {
		refs: {
            backBtn: 'button[cls~=back-btn-icon]',
        },
		control: {
			'tinkchat': {
				show: 'renderList'
			},
			'tinkchat dataview': {
				itemtap: 'onChatSelect'
			},
			'backBtn': {
				tap: 'backToTinkBox'
			}
		}
	},

	renderList: function(component) {

		var list = Ext.create('Ext.List', {
			height: '100%',
			cls:'tinkchat-list',
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
							'<span class="right-sec"><span class="open">Open it!</span><span class="img"><img src="{original_trinket_file_path}"></span><span class="date">{formatted_timestamp}</span></span><span class="left-sec">{text}</span>',
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
				//fields: ['message', 'second', 'img', 'date', 'send', 'unread'],
				// data: [
				// 	{	
				// 		send    : 1,
				// 		message : 'Dolor sit amet Ut enim ad minim veniam, quis nostrud exer',
				// 		second  : '10 sec',
				// 		img   : 'resources/images/chat-icon.png',
				// 		date    : 'Thu. 29 Sep',
				// 		unread: 0
				// 	}, {	
				// 		send    : 0,
				// 		message : 'Dolor sit amet Ut enim ad minim veniam, quis nostrud exer',
				// 		second  : '10 sec',
				// 		img   : 'resources/images/chat-icon.png',
				// 		date    : 'Thu. 29 Sep',
				// 		unread: 0
				// 	}, {	
				// 		send    : 1,
				// 		message : 'Dolor sit amet Ut enim ad minim veniam, quis nostrud exer',
				// 		second  : '10 sec',
				// 		img   : 'resources/images/chat-icon.png',
				// 		date    : 'Thu. 29 Sep',
				// 		unread: 0
				// 	}, {	
				// 		send    : 0,
				// 		message : 'Dolor sit amet Ut enim ad minim veniam, quis nostrud exer',
				// 		second  : '10 sec',
				// 		img   : 'resources/images/chat-open-icon.png',
				// 		date    : 'Thu. 29 Sep',
				// 		unread: 1
				// 	}, {	
				// 		send    : 1,
				// 		message : 'Dolor sit amet Ut enim ad minim veniam, quis nostrud exer',
				// 		second  : '10 sec',
				// 		img   : 'resources/images/chat-icon.png',
				// 		date    : 'Thu. 29 Sep',
				// 		unread: 0
				// 	}, {	
				// 		send    : 1,
				// 		message : 'Dolor sit amet Ut enim ad minim veniam, quis nostrud exer',
				// 		second  : '10 sec',
				// 		img   : 'resources/images/chat-icon.png',
				// 		date    : 'Thu. 29 Sep',
				// 		unread: 0
				// 	}, {	
				// 		send    : 1,
				// 		message : 'Dolor sit amet Ut enim ad minim veniam, quis nostrud exer',
				// 		second  : '10 sec',
				// 		img   : 'resources/images/chat-icon.png',
				// 		date    : 'Thu. 29 Sep',
				// 		unread: 0
				// 	}
				// ]
			}
		});
		component.add(list);
		component.add(ttapp.util.Common.createMenuButton());
	},
	
	/*onChatSelect: function(target, index, e, record, eOpts) {
		if(eOpts.target.nodeName == 'IMG') {
			Ext.Viewport.animateActiveItem
		}
	},*/

	backToTinkBox: function() {
		Ext.Viewport.animateActiveItem('tinkbox', {type: 'slide', direction: 'right'});
	}
});