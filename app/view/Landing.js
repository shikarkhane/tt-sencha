Ext.define('ttapp.view.Landing', {
	extend: 'Ext.Container',
	xtype: 'landing',
	config:{
		fullscreen: true,
		styleHtmlContent: true,		
		items: 
		  [
	        {
	        	xtype: 'panel',
	            html: '<h1>Tinktime</h1>'
	        }	
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