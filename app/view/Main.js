Ext.define('ttapp.view.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'main',
    requires: [
        'Ext.TitleBar', 'ttapp.store.trinkets', 'Ext.dataview.List'
    ],
    config: {
        tabBarPosition: 'bottom',

        items: [
            {
                title: 'Home tab',
                xtype: 'list',
                store: 'defaultTrinket',
                itemTpl: '{name}'
                    
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
