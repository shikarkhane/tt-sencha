Ext.define('ttapp.view.ConfirmPhoneNumber', {
	extend: 'Ext.Container',
	xtype: 'confirmphonenumber',
	requires: ['Ext.field.Number'],
	config:{
		fullscreen: true,
		styleHtmlContent: true,		
		items: 
		  [
	        {
	        	xtype: 'panel',
	            html: '<h1>Confirm code</h1>'
	        },
	        {
	        	id: 'myVerificationCode',
                xtype: 'numberfield',
                name: 'verify-phone-number',
                maxLength: 5,
                minLength: 5                
	        },
	        {
                xtype: 'button',
                text: "Confirm code!",
                ui: 'confirm-round'
	        }	
    	]
	}
 });