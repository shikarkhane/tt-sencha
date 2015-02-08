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
            baseCls: 'clsFeed',
            itemCls: 'clsMessageItem',
            //style: 'opacity:0.5;',
            pinHeaders: false,
            scrollable: {
                direction: 'vertical'
            },
            itemTpl: '<div class="clsMessage{to_user_name}"><div class="clsTextMessage"><div>{from_user_name}</div><div>{text}</div><div>{to_user_name}</div></div><div class="clsTrinketMessage"><div>{seconds_sent} secs</div><div><img src={trinket_file_path} width=65px height=65px></div></div></div>',
            store: 'Messages'
        }
        ]
    }
});