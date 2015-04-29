Ext.define('ttapp.view.SendTo', {
    extend: 'Ext.Container',
    xtype: 'sendto',
    requires: [
    	'ttapp.model.Contact',
    	'Ext.dataview.List',
    	'Ext.field.Search',
    	'Ext.Toolbar'
    ],
    config: {
    	itemId: 'choose-recepients',
    	fullscreen: true,
    	cls:'bg-transparent-white cls-tt-tinking',
    	layout: 'vbox',
    	items: [
    		{
	            xtype: 'toolbar',
	            docked: 'top',
	            cls:'top-bar',
	            items: [
	            	{ 
	                	xtype: 'button',
	                	cls: 'top-btn btn-delete',
	                	docked: 'right',
	                	handler: function (){
	                		ttapp.app.getController('ttapp.controller.SendTo').returnToTink(); 
	                	}
	                }
	            ]
	        },{
	        	xtype:'panel',
	        	cls:'search-panel',
	        	items: [
	        		{
	        			itemId: 'contactsListToChoose',
			    		id:'contactsListToChoose',
			    		xtype: 'list',
			    		height:'30%',
			    		cls:'search-list-sec',
			            scrollable: {
			                direction: 'vertical'
			            },
			            itemTpl: '<div class="on-tinktime-{on_tinktime}"><div>{first_name} {last_name}</div> <div><span>{phone_type }</span> {phone_number}</div></div>',
			            store: 'phonecontacts',
		        		items: [
		        			{
		                        xtype: 'searchfield',
		                        cls:'search-contacts-field',
		                        clearIcon:false,
		                        docked:'top',
		                        itemID:'searchBox',
		                        placeHolder: 'Search...',
		                        label:'To'
	                    	}
	                	]
	        		}
	        	]
	        }, {
	        	xtype: 'spacer', 
	        	flex: 1
	        }, {
	        	xtype: 'container',
	        	cls: 'message-box',
	        	//styleHtmlCls : 'clsPreviewSelection',
	        	//styleHtmlContent : true,
	        	//flex: 1.4,
	        	items:[
	        		{
	        			xtype: 'image',
	        			itemId: 'previewTrinket', 
	        			src:'resources/images/others/tink_design.png',
	        			cls:'preview-trinket'
	        		}, {
	        			xtype: 'label', 
	        			itemId: 'previewSeconds', 
	        			cls: 'seconds-preview'
	        		}, {
	        			xtype: 'textareafield',
	        			placeHolder: "Add a message!", 
	        			itemId: 'previewTextMsg',
	        			cls:'text-msg-preview',
	        			maxLength: 140,
	        			clearIcon:false
	        		}
	        	]
	        }, {
	        	xtype: 'spacer', flex: 1
	        }, {
	        	xtype: 'container',
	        	layout: 'hbox',
	        	items: [
	            	{
	            		xtype: 'spacer'
	            	}, {
		            	xtype: 'button',
		            	cls: 'clsSendTink form-btn send-btn',	            	
		            	text: 'Send',
		            	ui: 'ttButton'
	            	}, {
	            		xtype: 'spacer'
	            	}
	        	]
	        }, {
	        	xtype: 'spacer',
	        	flex: 1
	       	}
        ]
    }
});