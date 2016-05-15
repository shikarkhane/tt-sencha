Ext.define('ttapp.view.Authenticate', {
	extend: 'Ext.Container',
	xtype: 'authenticate',
	requires: ['Ext.field.Number', 'Ext.field.Select', 'ttapp.view.NumberField'],
	config:{
		fullscreen: true,
		cls: 'bg-transparent',
		scrollable : {
		      direction     : 'vertical',
		      directionLock : true
		},
		items:
		  [{
	            xtype: 'panel',
	            cls: 'landing-page top-20-p',
	            items: [{
	                xtype: 'panel',
	                cls: 'logo'
	            }]
	        },{
		  	xtype:'panel',
		  	cls:'verify-page new-verify',
		  	items:[
		        {
	        	xtype: 'panel',
	        	cls:'help-text',
	            html: 'please confirm the country code and enter your phone number.'
		        },
		        {
		        	xtype: 'container',
		        	items: [
		        		{
			                xtype: 'selectfield',
			                id: 'selectCountry',
			                cls:'select-form-field',
			                clearIcon:false
			        	},{
			        		xtype:'container',
			        		layout:'hbox',
			        		cls:'margin_bottom50',
			        		items:[
			        			{
									itemId: 'myDialCode',
					                xtype: 'textfield',
					                placeHolder: '+1',
					                cls:'form-field border-r-2 text-center',
					                clearIcon:false ,
					                flex:3
					        	},
					        	{
						        	itemId: 'myPhoneNumber',
					                // xtype: 'numberfield',
									xclass: 'ttapp.view.NumberField',
									component: {
										xtype: 'input',
										type: 'tel'
									},
					                name: 'verify-phone-number',
					                placeHolder: 'e.g. 705432112',
					                cls:'form-field clsAuthenticatePhoneNumber',
					                clearIcon:false,
					                flex: 6
					            },{
					                html:'<div class="phone-icon form-field"></div>',
					                flex: 1
					            }
			        		]
			        	}
		        	]
		        },
		        {
	                xtype: 'button',
	                text: "Next",
	                cls:'white-button'
		        }]
		  }]
	},
	initialize: function() {
		var countries = ttapp.util.Common.setDialCode('123');
        var finalCountries = [];
        for(i=0; i<countries.length; i++) {
            finalCountries.push({
                value: countries[i].code,
                text: countries[i].name
            });
        }
        Ext.getCmp('selectCountry').setOptions(finalCountries);
	}
 });
