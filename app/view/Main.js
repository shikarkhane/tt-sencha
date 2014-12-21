Ext.define('ttapp.view.Main', {
    extend: 'Ext.Container',
    xtype: 'main',
    requires: [
        'Ext.TitleBar', 'ttapp.store.trinkets', 'Ext.dataview.List'
    ],
    config: {
        //tabBarPosition: 'bottom',

        items: [
            {
                title: 'swiffy',
                xtype: 'panel',
                id: "swiffydiv",
                html: '<iframe id="tinkcontainer" src="resources/tinks/default/default.html" style="width: 550px; height: 550px"></iframe>',
                initialize : function() {
                    console.log('inside initialize');
                    var me = this;
                    
                    me.on('painted', function() {
                        me.fireEvent('viewready', me);
                    }, null, { single : true });

                    
                }
            },
            {
                xtype: 'button',
                text: "tink",
                ui: 'confirm-round'
            }
        ]

    }
});
