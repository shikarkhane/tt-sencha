Ext.define('ttapp.view.Feed', {
    extend: 'Ext.Container',
    xtype: 'feed',
    requires: ['ttapp.model.Message','Ext.dataview.List', 'Ext.ProgressIndicator'],
    config: {
    	layout: 'vbox',
    	items: [
        {
            xtype: 'dogear'
        },
    	{
            xtype: 'list',
            flex: 5,
            ui: 'round',
            pinHeaders: false,
            scrollable: {
                direction: 'vertical'
            },
            itemTpl: '<b>{from_user_name}</b>  sent <b>{seconds_sent} secs</b> of trinket <b>{trinket_name}</b> to <b>{to_user_name}</b>',
            store: 'Messages'
        }
        ]
    }
});