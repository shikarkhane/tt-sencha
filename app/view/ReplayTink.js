Ext.define('ttapp.view.ReplayTink', {
    extend: 'Ext.Container',
    xtype: 'replaytink',
    config: {
        itemId: 'replayTinkPage',
        cls: 'cls-tt-replaytink',
        layout: {
        type: 'vbox',
        align: 'middle'
        },
        items: [
        {
                        xtype: 'toolbar',
                        docked: 'top',

                        items: [
                        
                            { 
                                xtype: 'button',
                                iconCls: 'delete',
                                docked: 'right'
                            }
                        ]
                    },
        {
            xtype: 'panel',
            flex: 1,
            html: '<h2>13 sec</h2>'
        },
            {
                xtype: 'panel',
                flex: 5,
                html: '<iframe id="replaytinkcontainer" style="width:320px;height:480px;" src="resources/tinks/swiffy/default.html"></iframe>'                
            },
            {
                xtype: 'panel',
                flex: 1,
                html: '<h2>thinking abt you!</h2>'
            }
        ]

    }
});

