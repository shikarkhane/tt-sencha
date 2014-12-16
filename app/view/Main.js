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
                title: 'swiffy',
                xtype: 'panel',
                id: "swiffydiv",
                html: '<div id="swiffycontainer" style="width: 750px; height: 750px"></div>',
                initialize : function() {
                    console.log('inside initialize');
                    var me = this;
                    
                    me.on('painted', function() {
                        me.fireEvent('viewready', me);
                    }, null, { single : true });

                    
                }
            }
        ]

    }
});
