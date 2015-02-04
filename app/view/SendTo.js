Ext.define('ttapp.view.SendTo', {
    extend: 'Ext.Container',
    xtype: 'sendto',
    requires: ['ttapp.model.Contact','Ext.dataview.List','Ext.field.Search', 'Ext.Toolbar'],
    config: {
    	itemId: 'choose-recepients',
    	fullscreen: true,
    	layout: 'vbox',
    	items: [{
    		itemId: 'contactsListToChoose',
    		xtype: 'list',
    		flex: 3,
            scrollable: {
                direction: 'vertical'
            },
            itemTpl: '{first_name} {last_name}',
            store: 'phonecontacts',
	        items: [
	                {
	                    xtype: 'toolbar',
	                    docked: 'top',

	                    items: [
	                    
	                        {
	                            xtype: 'searchfield',
	                            cls: 'searchContactsField',
	                            placeHolder: 'Search...',
	                            docked: 'left'
	                        },
	                        { 
	                        	xtype: 'button',
	                        	iconCls: 'delete',
	                        	docked: 'right'
	                        }
	                    ]
	                }
	                ]
	            },
	            {
	            	xtype: 'container',
	            	layout: 'hbox',
	            	flex: 2,
	            	items:[
	            		{xtype: 'image', height:100, width: 100, flex: 1, itemId: 'previewTrinket'},
	            		{xtype: 'label', itemId: 'previewSeconds'},
	            		{xtype: 'textfield', flex: 1, placeHolder: "Add a message!", itemId: 'previewTextMsg'}
	            	]
	            },
	            {
	            	xtype: 'button',
	            	cls: 'clsSendTink',
	            	flex: 1,
	            	text: 'Send'
	            }
        ]
    }
});