Ext.define('ttapp.view.TinkChat', {
	extend: 'Ext.Container',
	xtype: 'tinkchat',
	config: {
		cls:'bg-light-gray',
		items: [
			{
                xtype: 'panel',
                docked: 'top',
                cls: 'new-header',
                items: [
                    {
						xtype: 'button',
						cls: 'back-btn-icon',
						docked: 'left'
					}, {
						xtype: 'image',
						mode: 'image',
						cls:'header-user-img',
						src: 'resources/images/user-icon.png',
						docked: 'right',
					}, {
                        xtype: 'panel',
                        html:'<div class="user-title">John Clein</div>',
                        docked: 'top'
                    }
                ]
            }, {
            	layout: 'hbox',
            	cls:'tink-in-out tinkchat-page',
            	items: [
            		{   
                        xtype:'panel',
                        cls:'in-out-list',  
            			html: '<div class="tink-in"><span class="heading">Tink In</span><span class="time">01:08:24</span></div>',
            		}, {
                        xtype:'image',
                        cls:'in-out-list in-out-bar',
                        html:'<div class="circle" id="tinkChatCircle"></div>',
                        listeners: {
                        	'painted': {
                        		fn: function(element) {
                        			// (id, radius, border-width, percent)
                        			testCircleCss(element.dom.firstChild.firstChild.id, 25, 5, 50);
                        		}
                        	}
                        }
            		}, {
                        xtype:'panel',
                        cls:'in-out-list',
            			html: '<div class="tink-in"><span class="heading">Tink Out</span><span class="time">06:21:30</span></div>'
            		}
            	]
            }
		]
	},
	initialize: function() {
		var list = Ext.create('Ext.List', {
			height: '100%',
			cls:'tinkchat-list',
			itemTpl: [
				'<tpl if="send == 1">',
					'<div class="chat-list">',
						'<span class="left-sec">{message}</span><span class="right-sec"><span class="seconds">{second}</span><span class="img"><img class="tink" src="{img}"></span><span class="date">{date}</span></span>',
					'</div>',
				'<tpl else>',
					'<tpl if="unread == 1">',
						'<div class="chat-list receive-chat">',
							'<span class="right-sec"><span class="open">Open it!</span><span class="img"><img src="{img}"></span><span class="date">{date}</span></span><span class="left-sec">{message}</span>',
						'</div>',
					'<tpl else>',
						'<div class="chat-list receive-chat">',
							'<span class="right-sec"><span class="seconds">{second}</span><span class="img"><img src="{img}"></span><span class="date">{date}</span></span><span class="left-sec">{message}</span>',
						'</div>',
					'</tpl>',
				'</tpl>'
			],
			store: {
				id: 'TinkChatStore',
				fields: ['message', 'second', 'img', 'date', 'send', 'unread'],
				data: [
					{	
						send    : 1,
						message : 'Dolor sit amet Ut enim ad minim veniam, quis nostrud exer',
						second  : '10 sec',
						img   : 'resources/images/chat-icon.png',
						date    : 'Thu. 29 Sep',
						unread: 0
					}, {	
						send    : 0,
						message : 'Dolor sit amet Ut enim ad minim veniam, quis nostrud exer',
						second  : '10 sec',
						img   : 'resources/images/chat-icon.png',
						date    : 'Thu. 29 Sep',
						unread: 0
					}, {	
						send    : 1,
						message : 'Dolor sit amet Ut enim ad minim veniam, quis nostrud exer',
						second  : '10 sec',
						img   : 'resources/images/chat-icon.png',
						date    : 'Thu. 29 Sep',
						unread: 0
					}, {	
						send    : 0,
						message : 'Dolor sit amet Ut enim ad minim veniam, quis nostrud exer',
						second  : '10 sec',
						img   : 'resources/images/chat-open-icon.png',
						date    : 'Thu. 29 Sep',
						unread: 1
					}, {	
						send    : 1,
						message : 'Dolor sit amet Ut enim ad minim veniam, quis nostrud exer',
						second  : '10 sec',
						img   : 'resources/images/chat-icon.png',
						date    : 'Thu. 29 Sep',
						unread: 0
					}
				]
			}
		});

		this.add(list);
	}
});