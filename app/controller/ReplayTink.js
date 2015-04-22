Ext.define('ttapp.controller.ReplayTink', {
    extend: 'Ext.app.Controller',
    config: {
        refs: {
            replaypage: 'container[cls~=cls-tt-replaytink]',
            closereplay: 'button[cls~=btn-delete]'
        },
        control: {
            replaypage: {
                show: 'startReplay'
            },
            closereplay: {
                tap: 'closeReplay'
            }
        }
    },
    startReplay: function(){
        Ext.getDom('replaytinkcontainer').contentWindow.tt_start_animation();
    },
    closeReplay: function(){
        Ext.Viewport.animateActiveItem('feed',{type:'fade'});
    },
    addReplay: function(){
        r = Ext.create('Ext.Container',{
                    xtype: 'replaytink',
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
                                        docked: 'right'
                                    }]
                            },
                    {
                        xtype: 'panel',
                        cls:'clsTimerClock',
                        zIndex:9,
                        flex: 1,
                        html: '13 sec'
                    },
                        {
                            xtype: 'panel',
                            itemId: 'replaycomponent',
                            flex: 5,
                            html: '<iframe id="replaytinkcontainer" class="tinkanimation" src="resources/tinks/swiffy/cute-dancing-guy.html"></iframe>'                
                        },
                        {
                            xtype: 'panel',
                            flex: 1,
                            html: '<h2>thinking abt you!</h2>'
                        }
                    ]

            });
        Ext.Viewport.animateActiveItem(r,{type:'slide', direction: 'right'}); 
    }
});
