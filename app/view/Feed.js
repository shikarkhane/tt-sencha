Ext.define('ttapp.view.Feed', {
    extend: 'Ext.Container',
    xtype: 'feed',
    requires: ['ttapp.model.Message','Ext.dataview.List', 'Ext.ProgressIndicator'],
    config: {
    	layout: 'vbox',
        cls: 'cls-tt-tinkbox bg-transparent-colored flip-design-left',
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
            itemTpl: '<div class="left-{for_inbox}"><div class="{unread}"><div class="clsMessage{to_user_name}"><div class="clsTrinketMessage"><div class="clsSeconds">{seconds_sent}<span>s</span></div><div class="clsTrinketFile"><div class="img-bg" style="background:url({trinket_file_path});"></div></div></div><div class="clsTextMessage"><div class="name-panel">{from_user}</div><div class="des-panel">{text}</div><div class="date-panel">{send_timestamp}</div></div></div></div></div>',
            
            store: 'Messages'
        }
        ]
    }
});