Ext.define('ttapp.view.Authenticate', {
	extend: 'Ext.Container',
	xtype: 'authenticate',
	requires: ['Ext.field.Number', 'Ext.field.Select'],
	config:{
		fullscreen: true,
		cls: 'bg-transparent',
		scrollable : {
		      direction     : 'vertical',
		      directionLock : true
		},
		items:
		  [/*{
            xtype: 'toolbar',
            docked:'top',
            cls:'top-bar top-x-top-bar',
            title:'Verify Number'
            },*/
            {
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
		        	//layout: 'hbox',
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
						        	id: 'myPhoneNumber',
					                xtype: 'numberfield',
					                name: 'verify-phone-number',
					                placeHolder: '705432112',
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
		        }/*,{
		        	xtype:'panel',
		        	cls:'help-text-sm',
		        	html:'We will not display your phone number to other people'
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
		        }*/]
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
