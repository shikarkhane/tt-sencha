Ext.define('ttapp.view.TinkChat', {
	extend: 'Ext.Container',
	xtype: 'tinkchat',
	config: {
		cls:'bg-light-gray',
		items: [
			{
                xtype: 'panel',
                docked: 'top',
                cls: 'new-header header-chat',
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
            			html: '<div class="tink-in"><span class="heading">Tink In</span><span class="time tink-in-friend"></span></div>',/*01:08:24*/
            		}, {
                        xtype:'image',
                        cls:'in-out-list in-out-bar',
                        html:'<div class="circle" id="tinkChatCircle"></div>'
            		}, {
                        xtype:'panel',
                        cls:'in-out-list',
            			html: '<div class="tink-in"><span class="heading">Tink Out</span><span class="time tink-out-friend"></span></div>'/*06:21:30*/
            		}
            	]
            }, {
                title: 'swiffy',
                xtype: 'panel',
                id: "swiffydivtinkchat",
                //flex: 5,
                html: '<iframe id="tinkcontainer_tinkchat" class="tinkanimation" style="" ></iframe>'
            }
		]
	}
});