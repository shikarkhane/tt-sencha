Ext.define('ttapp.view.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'main',
    requires: [
        'Ext.TitleBar', 'ttapp.store.trinkets'
    ],
    config: {
        tabBarPosition: 'bottom',

        items: [
            {
                title: 'Home tab',
                iconCls: 'home',

                styleHtmlContent: true,
                scrollable: true,

                items: [{
                    docked: 'top',
                    xtype: 'titlebar',
                    title: 'tinktime'
                },
                {
                    store: 'ttapp.store.trinkets',
                    itemTpl: '{name}'
                }],

                html: "I changed the default** to something different!"
                    
            },
            {
                title: 'Toojoo',
                iconCls: 'action',

                items: [
                    {
                        docked: 'top',
                        xtype: 'titlebar',
                        title: 'Getting Started'
                    }
                ]
            }
        ]
    }
});
