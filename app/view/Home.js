Ext.define('ttapp.view.Home', {
	extend: 'Ext.Container',
	xtype: 'home',
	config:{
		fullscreen: true,
		styleHtmlContent: true,
		  items: [
        {
            html: '<h1>Tinktime</h1>'
                    
        }
    ]
	}
 });