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
    	scrollable: true,
    	itemId: 'choose-recepients',
    	fullscreen: true,
    	cls:'bg-light-gray',
    	layout: 'vbox',
    	items: [
			{
                xtype: 'panel',
                docked: 'top',
                cls: 'new-header',
                items: [
                    {
                        xtype: 'panel',
                        cls: 'tinktime-logo',
                        docked: 'top',
                        items:[
                        	{
			                	xtype: 'button',
			                	cls: 'close-gray-btn',
			                	docked: 'right',
			                	handler: function (){
			                		ttapp.app.getController('ttapp.controller.SendTo').returnToTink();
			                	}
			                }
                        ]
                    }
                ]
            },  /*{
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
			            itemTpl: '<div class="on-tinktime-{on_tinktime}"><div class="send-to-contacts name-panel">{first_name} {last_name}</div> <div><tpl if="phone_type"><span>{phone_type}</span> </tpl>{phone_number}</div></div>',
			            store: 'phonecontacts',
                        infinite: true,
                        itemHeight: 62,
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
	        },*/ {
	        	xtype: 'container',
	        	cls:'tinktime-user-sec',
	        	items:[
	        		{
	        			xtype:'image',
	        			cls:'user-img',
	        			setStyleHtmlContent: true,
	        			style: 'background:url(resources/images/user-icon.png)',
	        			//src:'resources/images/user-icon.png',
	        			id: 'sendToImage',
	        			mode:'image'
	        		}, {
	        			xtype: 'label',
	        			cls: 'user-name',
	        			html:'User Name'
	        		}, {
	        			xtype: 'label',
	        			itemId: 'previewSeconds',
	        			cls: 'seconds-preview'
	        		},
	        	]
	        }, {
	        	xtype: 'container',
	        	cls: 'message-box custom-msgbox',
	        	//styleHtmlCls : 'clsPreviewSelection',
	        	//styleHtmlContent : true,
	        	//flex: 1.4,
	        	items:[
	        		{
	        			xtype: 'image',
	        			itemId: 'previewTrinket',
	        			src:'resources/images/others/tink_design.png',
	        			cls:'preview-trinket msg-box-img'
	        		}, /*{
	        			xtype: 'label',
	        			itemId: 'previewSeconds',
	        			cls: 'seconds-preview'
	        		},*/ {
	        			xtype: 'textareafield',
	        			//placeHolder: "Add a message!",
	        			label: "Add Message",
	        			labelAlign: 'top',
	        			itemId: 'previewTextMsg',
	        			cls:'text-msg-preview edit-text-area',
	        			maxLength: 140,
	        			clearIcon:false
	        		}
	        	]
	        }, {
	        	xtype: 'spacer', 
	        	cls:'height-space'
	        }, {
	        	xtype: 'container',
	        	layout: 'hbox',
	        	items: [
	            	 {
		            	xtype: 'button',
		            	cls: 'clsSendTink form-btn send-new-button',
		            	text: 'Send',
		            	ui: 'ttButton'
	            	} 
	        	]
	        }
        ]
    }
});
