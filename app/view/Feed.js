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
            cls: 'clsFeed',
            //style: 'opacity:0.5;',
            pinHeaders: false,
            scrollable: {
                direction: 'vertical'
            },
            itemTpl: '<div class="clsMessage"><div class="clsTextMessage"><b>{from_user_name}</b><b>{text}</b><b>{to_user_name}</b></div><div class="clsTrinketMessage"><b>{seconds_sent} secs</b><img src={trinket_file_path} width=65px height=65px></div></div>',
            store: 'Messages'
        }
        ]
    }
});