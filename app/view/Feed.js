Ext.define('ttapp.view.Feed', {
    extend: 'Ext.Container',
    xtype: 'feed',
    requires: ['ttapp.model.Message', 'Ext.dataview.List'],
    config: {
        layout: 'fit',
        cls: 'cls-tt-tinkbox bg-transparent-colored flip-design-left',
        items: [{
            xtype: 'dogear'
        }, {
            layout: 'vbox',
            scrollable: {
                direction: 'vertical'
            },
            items: [{
                xtype: 'button',
                text: 'back',
                itemId: 'previous',
                cls: 'clsPagingButton',
                hidden: true
            }, {
                xtype: 'list',
                baseCls: 'clsFeed',
                itemCls: 'clsMessageItem',
                // pinHeaders: false,
                scrollable: false,
                itemTpl: ['<tpl if=\'for_inbox == true\'>',
                    '<div class="left-{for_inbox}"><div class="{unread} read-or-not"><div class="clsMessage{to_user_name}"><div class="clsTrinketMessage"><div class="clsSeconds">{seconds_sent}<span>s</span></div><div class="clsTrinketFile"><div class="img-bg" style="background:url({trinket_file_path});"></div></div></div><div class="clsTextMessage"><div class="name-panel">{from_user_name}</div><div class="des-panel">{text}</div><div class="date-panel">{formatted_timestamp}</div></div></div></div></div>',
                    '<tpl else>',
                    '<div class="left-{for_inbox}"><div class="{unread} read-or-not"><div class="clsMessage{to_user_name}"><div class="clsTrinketMessage"><div class="clsSeconds">{seconds_sent}<span>s</span></div><div class="clsTrinketFile"><div class="img-bg" style="background:url({trinket_file_path});"></div></div></div><div class="clsTextMessage"><div class="name-panel">{to_user_name}</div><div class="des-panel">{text}</div><div class="date-panel">{formatted_timestamp}</div></div></div></div></div>',
                    '</tpl>'
                ],
                store: 'Messages'
            }, {
                xtype: 'button',
                text: 'show more',
                itemId: 'next',
                cls: 'clsPagingButton'
            }]
        }]
    }
});
