Ext.define('ttapp.view.Authenticate', {
	extend: 'Ext.Container',
	xtype: 'authenticate',
	requires: ['Ext.field.Number'],
	config:{
		fullscreen: true,
		cls: 'bg-transparent',	
		items: 
		  [{
		  	xtype:'panel',
		  	cls:'authenticate-page',
		  	items:[{
	        	xtype: 'panel',
	        	cls:'page-title',
	            html: 'Verify - phone number'
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
		        }]
		  }]
	}
 });