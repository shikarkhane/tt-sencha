Ext.define('ttapp.view.Feed', {
    extend: 'Ext.Container',
    xtype: 'feed',
    requires: ['ttapp.model.Message','Ext.dataview.List', 'Ext.ProgressIndicator'],
    config: {
    	layout: 'vbox',
    	items: [{
    		xtype: 'progressindicator',
    		// loadingText: 'Tinkmeter',
    		hidden: false,
    		docked: 'top',
    		minProgressInput : 20,
    		flex: 1
    	},
    			{
		            xtype: 'list',
		            flex: 5,
		            ui: 'round',
		            pinHeaders: false,
		            scrollable: {
		                direction: 'vertical'
		            },
		            itemTpl: '<b>{from_user}</b>  sent <b>{seconds_sent} secs</b> of <b>{trinket_id}</b> to <b>{to_user}</b>',
		            store: 'Messages'
	            }
        ]
    }
});