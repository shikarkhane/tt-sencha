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
            cls:'top-bar',
            title:'Verification code'  
            },{
			xtype:'panel',
		  	cls:'verify-page',
		  	items:[{
	        	xtype: 'panel',
	        	cls:'help-text',
	            html: 'Please Enter the 6-digit verification code.'
		        },
		        {
		        	id: 'myVerificationCode',
	                xtype: 'numberfield',
	                name: 'verify-phone-number',
	                cls:'form-field',
	                placeHolder: 'Verification code',
	                clearIcon:false             
		        },
		        {
	                xtype: 'button',
	                text: "Confirm code!",
	                cls:'form-btn'
		        },{
		        	xtype:'panel',
		        	cls:'help-text-sm',
		        	html:'We will not display your phone number to other people',
		        },{
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
		  	docked:'bottom',
		  	handler: function (){
        		Ext.Msg.alert('Sent', 'Verification Code Sent', Ext.emptyFn); 
        	}
		  }
    	]
	}
 });