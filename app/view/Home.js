Ext.define('ttapp.view.Home', {
	extend: 'Ext.carousel.Carousel',
	xtype: 'home',
	 requires: [
        'ttapp.view.Tink', 'ttapp.view.Feed'
    ],
	config:{
		fullscreen: true,
		styleHtmlContent: true,
		  items: [
        {
            xtype: 'tink'
                    
        },
        {
         	//xtype: 'feed'
         	html : 'Item 2'
        }
    ]
	}
 });