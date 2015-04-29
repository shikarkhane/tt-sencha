Ext.define('ttapp.view.ReplayTink', {
    extend: 'Ext.Container',
    xtype: 'replaytink',
    config: {
        itemId: 'replayTinkPage',
        cls: 'cls-tt-tinkbox cls-tt-replaytink',
        layout: {
        type: 'vbox',
        align: 'middle'
        },
        items: [
        {
                    xtype: 'toolbar',
                    docked: 'top',
                    cls:'top-bar',
                    items: [{ 
                            xtype: 'button',
                            cls: 'top-btn btn-delete',
                            docked: 'right',
                            handler: function (){
                                ttapp.app.getController('ttapp.controller.ReplayTink').closeReplay(); 
                            }
                        }]
                },
        {
            xtype: 'panel',
            cls:'clsTimerClock',
            style:'z-index:9',
            flex: 1,
            html: '13 sec'
        },
            {
                xtype: 'panel',
                flex: 5,
                html: '<iframe id="replaytinkcontainer" class="tinkanimation" src="resources/tinks/swiffy/cute-dancing-guy.html"></iframe>'                
            },
            {
                xtype: 'panel',
                cls: 'clsReplayTextMessage',
                flex: 1,
                html: '<h2>thinking abt you!</h2>'
            }
        ]

    }
});

