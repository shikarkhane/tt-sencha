Ext.define('ttapp.view.ConfirmPhoneNumber', {
	extend: 'Ext.Container',
	xtype: 'confirmphonenumber',
	requires: ['Ext.field.Number'],
	config:{
		fullscreen: true,	
		cls: 'bg-transparent',	
		items: 
		  [{
            xtype: 'toolbar',
            docked:'top',
            cls:'top-bar top-x-top-bar',
            title:'Verification code'  
            },{
			xtype:'panel',
		  	cls:'verify-page',
		  	items:[{
	        	xtype: 'panel',
	        	cls:'help-text',
	            html: 'Please Enter the 5-digit verification code.'
		        },
		        {
		        	id: 'myVerificationCode',
	                xtype: 'numberfield',
	                name: 'verify-phone-number',
	                cls:'form-field',
	                placeHolder: 'Verification code',
	                maxLength: 5,
	                clearIcon:false             
		        },
		        {
	                xtype: 'button',
	                text: "Confirm code!",
	                cls:'form-btn cls-confirm-code-btn'
		        },{
		        	xtype:'panel',
		        	cls:'help-text-sm',
		        	html:'We will not display your phone number to other people',
		        },{
		        	xtype:'panel',
		        	cls:'help-text-sm',
		        	itemId: 'entered_mobile_number',
		        	html:'+010100101',
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
		        },
		        {
		        	xtype:'panel',
		        	cls:'help-text-sm',
		        	html:'Read our <span class="privacy_policy">Privacy Policy</span> to learn more.',
		        	listeners:[{
		        		element: 'element',
                        delegate: 'span.privacy_policy',
                        event: 'tap',
                        fn: function(){
                        	Ext.Viewport.animateActiveItem('privacypolicy',{type:'fade'});
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