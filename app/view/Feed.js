Ext.define('ttapp.view.Feed', {
    extend: 'Ext.Container',
    xtype: 'feed',
    requires: ['ttapp.model.Message','Ext.dataview.List', 'Ext.ProgressIndicator'],
    config: {
    	layout: 'vbox',
        cls: 'cls-tt-tinkbox',
    	items: [
        {
            xtype: 'dogear'
        },
    	{
            xtype: 'list',
            flex: 5,
            //style: 'opacity:0.5;',
            pinHeaders: false,
            scrollable: {
                direction: 'vertical'
            },
            itemTpl: '<b>{from_user_name}</b>  sends <b>{seconds_sent} secs</b> of <b>{trinket_name}</b> with msg <b>{text}</b> to <b>{to_user_name}</b>',
            store: 'Messages'
        }
        ]
    }
});