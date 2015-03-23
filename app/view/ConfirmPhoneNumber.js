Ext.define('ttapp.view.ConfirmPhoneNumber', {
	extend: 'Ext.Container',
	xtype: 'confirmphonenumber',
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
	            html: 'Confirm code'
		        },
		        {
		        	id: 'myVerificationCode',
	                xtype: 'numberfield',
	                name: 'verify-phone-number',
	                cls:'form-field',
	                clearIcon:false             
		        },
		        {
	                xtype: 'button',
	                text: "Confirm code!",
	                cls:'form-btn'
		        }]
		  
		  }
    	]
	}
 });