Ext.define('ttapp.controller.ReplayTink', {
    extend: 'Ext.app.Controller',
    config: {
        refs: {
        },
        control: {
            'replaytink': {
                show: 'startReplay'
            },
            'replaytink toolbar button': {
                tap: 'closeReplay'
            }
        }
    },
    startReplay: function(){
        Ext.getDom('replaytinkcontainer').contentWindow.tt_start_animation();
    },
    closeReplay: function(){
        Ext.Viewport.animateActiveItem('feed',{type:'fade'});
    }
});
