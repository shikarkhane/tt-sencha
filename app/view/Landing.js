Ext.define('ttapp.view.Landing', {
	extend: 'Ext.Container',
	xtype: 'landing',
	config:{
		fullscreen: true,
		styleHtmlContent: true,		
		layout: 'vbox',
		items: 
		  [
		  { xtype: 'spacer', flex: 1 },
		  {
		  	xtype: 'container',
		  	layout: 'hbox',
		  	items:
		  	[
			  	{xtype: 'spacer', flex:1},
			  	{
				  	xtype: 'label',
					html: '<h2>Tinktime</h2>',
					flex: 1,
					style: 'text-align:center;'
				},
				{xtype: 'spacer', flex:1}
		  	]
	       },	
	       { xtype: 'spacer', flex: 1 },
    	],
        listeners: {
        	tap : {
        		element: 'element',
		        fn: function(){
		        	this.fireEvent("userAcknowledge", this);
		        }
		     }
		}

	}
 });