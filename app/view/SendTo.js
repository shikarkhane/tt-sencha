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
    	//scrollable: true,
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
            }, {
            	xtype: 'button',
            	cls:'add-option-btn',
	            html:'<img class="option-add-icon animated rotateOut" src="resources/images/add_icon.png" />',
	            listeners: {
	                tap: {
	                    fn: function() {
	                        btnPanel = Ext.getCmp('btn-panel');

	                        if (!btnPanel) {
	                            Ext.Viewport.add ({
	                                xtype:'panel',
	                                centered : true,
	                                width:'100%',
	                                height:'100%',
	                                id:'btn-panel',
	                                hideAnimation: {type: 'fadeOut', duration: 200, easing: 'ease-out'},
	                                cls:'option-overlay clickable',
	                                modal:true,
	                                html: '<div class="option-btn-grp">' +
	                                '<div class="btn tink-meter slideInUp3"><span id="tinkometer" class="icon"></span><span class="title">Tinkometer</span></div>' +
	                                '<div class="btn tink-box slideInUp2"><span id="tinkbox" class="icon"></span><span class="title">Tinkbox</span></div>' +
	                                '<div class="btn tink slideInUp1"><span id="tink" class="icon"></span><span class="title">Tink</span></div>' +
	                                '</div>'
	                            });

	                            Ext.getCmp('btn-panel').show();

	                            if(Ext.Viewport.getActiveItem().config.xtype == 'phoneContacts') {
	                                Ext.select('.tink').hide();
	                            }

	                            $('.btn').on('click', function() {
	                                var anim = {type: 'fade', direction: 'up', duration: 100, easing: 'ease-out'};
	                                switch(this.children[0].id) {
	                                    case 'settingsProfile':
	                                        break;
	                                    case 'tinkometer':
	                                        $("body").removeClass("option-mask");
	                                        $(".add-option-btn").removeClass("btn-close");
	                                        $("body").addClass("mask-fade-effect");
	                                        
	                                        Ext.getCmp('btn-panel').destroy();
	                                        Ext.Viewport.animateActiveItem('tinkometer', anim);
	                                        break;
	                                    case 'tinkbox':
	                                        $("body").removeClass("option-mask");
	                                        $(".add-option-btn").removeClass("btn-close");
	                                        $("body").addClass("mask-fade-effect");
	                                        
	                                        Ext.getCmp('btn-panel').destroy();
	                                        Ext.Viewport.animateActiveItem('tinkbox', anim);
	                                        break;
	                                    case 'tink':
	                                        $("body").removeClass("option-mask");
	                                        $(".add-option-btn").removeClass("btn-close");
	                                        Ext.getCmp('btn-panel').destroy();
	                                        Ext.Viewport.animateActiveItem('phoneContacts', anim);
	                                        break;
	                                    default:    
	                                }
	                            });

	                            $(".btn").addClass("slide-animation animated");
	                            $(".add-option-btn").addClass("btn-close");
	                            $("body").addClass("option-mask");
	                        } else {
	                            $("body").removeClass("option-mask");
	                            $(".add-option-btn").removeClass("btn-close");
	                            $("body").addClass("mask-fade-effect");
	                            
	                            Ext.getCmp('btn-panel').hide();
	                            setTimeout(function() {
	                                $("body").removeClass("mask-fade-effect");
	                                Ext.getCmp('btn-panel').destroy();
	                            }, 100);
	                        }

	                        // $('.clickable').on('click', function() {
	                        //     $("body").removeClass("option-mask");
	                        //     $(".add-option-btn").removeClass("btn-close");
	                        //     $("body").addClass("mask-fade-effect");
	                            
	                        //     Ext.getCmp('btn-panel').hide();
	                        //     setTimeout(function() {
	                        //         $("body").removeClass("mask-fade-effect");
	                        //         Ext.getCmp('btn-panel').destroy();
	                        //     }, 300);
	                        // });
	                    }
	                }
	            }
            }, {
            	scrollable: true,
            	layout: 'vbox',
            	cls:'tink-send-page',
            	items: [
            		{
			        	xtype: 'container',
			        	cls:'tinktime-user-sec',
			        	items:[
			        		{
			        			xtype:'image',
			        			cls:'user-img',
			        			setStyleHtmlContent: true,
			        			style: 'background:url(resources/images/user-icon.png)',
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
			        	items:[
			        		{
			        			xtype: 'image',
			        			itemId: 'previewTrinket',
			        			src:'resources/images/others/tink_design.png',
			        			cls:'preview-trinket msg-box-img'
			        		}, {
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
        ]
    }
});
