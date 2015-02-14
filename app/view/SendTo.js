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
            itemTpl: '{first_name} ({phone_number})',
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
	            {xtype: 'spacer', flex: 1},
	            {
	            	xtype: 'container',
	            	layout: 'float',
	            	cls: 'clsPreviewSelection',
	            	//styleHtmlCls : 'clsPreviewSelection',
	            	//styleHtmlContent : true,
	            	flex: 1.4,
	            	items:[
	            		{xtype: 'image', height:100, width: 100, itemId: 'previewTrinket'},
	            		{
	            			xtype: 'label', 
	            			itemId: 'previewSeconds', 
	            			cls: 'clsSecondsSentPreview', 
	            			width: 100, 
	            			height:100, 
	            			zIndex: 1, 
	            			left: 0, 
	            			top: 0
	            		},
	            		{xtype: 'textareafield', left: 100, maxRows: 4, placeHolder: "Add a message!", itemId: 'previewTextMsg'}
	            	]
	            },
	            {xtype: 'spacer', flex: 1},
	            {
	            	xtype: 'container',
	            	layout: 'hbox',
	            	items:[
		            	{xtype: 'spacer'},
		            	{
			            	xtype: 'button',
			            	cls: 'clsSendTink',	            	
			            	text: 'Send',
			            	ui: 'ttButton'
		            	},
		            	{xtype: 'spacer'}
	            	]
	            },
				{xtype: 'spacer', flex: 1}
        ]
    }
});