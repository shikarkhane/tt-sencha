Ext.define('ttapp.view.Authenticate', {
	extend: 'Ext.Container',
	xtype: 'authenticate',
	requires: ['Ext.field.Number'],
	config:{
		fullscreen: true,
		styleHtmlContent: true,	
		cls: 'cls-tt-landing',	
		items: 
		  [
	        {
	        	xtype: 'panel',
	            html: '<h1>Verify - phone number</h1>'
	        },
	        {
	        	id: 'myPhoneNumber',
                xtype: 'textfield',
                name: 'verify-phone-number',
                placeHolder: '+46705432112',
                maxLength: 12,
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