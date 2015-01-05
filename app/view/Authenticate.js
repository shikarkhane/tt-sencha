Ext.define('ttapp.view.Authenticate', {
	extend: 'Ext.Container',
	xtype: 'authenticate',
	requires: ['Ext.field.Number'],
	config:{
		fullscreen: true,
		styleHtmlContent: true,		
		items: 
		  [
	        {
	        	xtype: 'panel',
	            html: '<h1>Verify - phone number</h1>'
	        },
	        {
	        	id: 'myPhoneNumber',
                xtype: 'numberfield',
                name: 'verify-phone-number',
                maxLength: 10,
                minLength: 10                
	        },
	        {
                xtype: 'button',
                text: "Send code!",
                ui: 'confirm-round'
	        }	
    	]
	}
 });