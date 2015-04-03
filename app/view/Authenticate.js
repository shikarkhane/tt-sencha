Ext.define('ttapp.view.Authenticate', {
	extend: 'Ext.Container',
	xtype: 'authenticate',
	requires: ['Ext.field.Number'],
	config:{
		fullscreen: true,
		cls: 'bg-transparent',	
		items: 
		  [{
            xtype: 'toolbar',
            docked:'top',
            cls:'top-bar',
            title:'Verify Number'  
            },{
		  	xtype:'panel',
		  	cls:'verify-page',
		  	items:[
		        {
	        	xtype: 'panel',
	        	cls:'help-text',
	            html: 'Please verify your phone number... so we know it\'s real!'
		        },
		        {
		        	id: 'myPhoneNumber',
	                xtype: 'textfield',
	                name: 'verify-phone-number',
	                placeHolder: '+46705432112',
	                cls:'form-field',
	                clearIcon:false             
		        },
		        {
	                xtype: 'button',
	                text: "Send code!",
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
		  }]
	}
 });