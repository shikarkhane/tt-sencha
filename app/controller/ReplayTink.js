Ext.define('ttapp.controller.ReplayTink', {
    extend: 'Ext.app.Controller',
    config: {
        refs: {
            replaypage: 'container[cls~=cls-tt-replaytink]',
            closereplay: 'button[cls~=replay-tink-close-btn]'
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
        var task = Ext.create('Ext.util.DelayedTask', function() {
             Ext.getDom('replaytinkcontainer').contentWindow.tt_start_animation();
        });

        task.delay(1000);
    },
    closeReplay: function(){
        Ext.ComponentQuery.query('#replayTinkPage')[0].destroy();

        Ext.Viewport.animateActiveItem('feed',{type:'fade'});
    },
    addReplay: function(seconds, text, trinket_name){
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
                                        cls: 'top-btn btn-delete replay-tink-close-btn',
                                        docked: 'right'
                                    }]
                            },
                    {
                        xtype: 'panel',
                        cls:'clsTimerClock',
                        zIndex:9,
                        flex: 1,
                        html: seconds + ' sec'
                    },
                    {
                        xtype: 'panel',
                        itemId: 'replaycomponent',
                        flex: 5,
                        html: '<iframe id="replaytinkcontainer" class="tinkanimation" src="resources/tinks/swiffy/'+ trinket_name + '.html"></iframe>'                
                    }
                    ]

            });
        
        if ( text.length > 0){
            r.add({
                    xtype: 'panel',
                    cls: 'clsReplayTextMessage',    
                    flex: 1,
                    html: '<h2>'+ text + '</h2>'
                });
        }

        Ext.Viewport.animateActiveItem(r,{type:'slide', direction: 'right'}); 
    }
});
