Ext.define('ttapp.view.ConfirmPhoneNumber', {
	extend: 'Ext.Container',
	xtype: 'confirmphonenumber',
	requires: ['Ext.field.Number'],
	config:{
		fullscreen: true,
		cls: 'bg-transparent',
		items:
		  [/*{
            xtype: 'toolbar',
            docked:'top',
            cls:'top-bar top-x-top-bar',
            title:'Verification code'
            },*/{
	            xtype: 'panel',
	            cls: 'landing-page top-20-p',
	            items: [{
	                xtype: 'panel',
	                cls: 'logo'
	            }]
	        },{
			xtype:'panel',
		  	cls:'verify-page new-verify',
		  	items:[{
	        	xtype: 'panel',
	        	cls:'help-text',
	            html: 'a message was sent to your phone number, please enter your five-digit code'
		        },
		        {
		        	id: 'myVerificationCode',
	                xtype: 'numberfield',
	                name: 'verify-phone-number',
	                cls:'form-field enter-code-icon',
	                placeHolder: 'ENTER CODE',
	                maxLength: 5,
	                clearIcon:false
		        },
		        {
	                xtype: 'button',
	                text: "Send",
	                cls:'cls-confirm-code-btn white-button margin_top50'
		        },{
		        	xtype:'panel',
		        	cls:'help-text-sm',
		        	html:'We will not display your phone number to other people'
		        },{
		        	xtype:'panel',
		        	cls:'help-text-sm',
		        	itemId: 'entered_mobile_number',
		        	html:'+010100101'
		        },
		        {
		        	xtype:'panel',
		        	cls:'help-text-sm',
		        	html:'To change phone number, <span class="change_phone_number">click here</span>',
		        	listeners:[{
		        		element: 'element',
                        delegate: 'span.change_phone_number',
                        event: 'tap',
                        fn: function(){
                        	Ext.Viewport.animateActiveItem('authenticate',{type:'fade'});
                        }
		        	}]
		        }]

		  },{
		  	xtype:'button',
		  	cls:'send-again-btn',
		  	text:'Send Code Again',
		  	docked:'bottom'
		  }
    	]
	}
 });
