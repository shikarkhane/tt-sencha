Ext.define('ttapp.controller.tink', {
    extend: 'Ext.app.Controller',
    requires: [
        'ttapp.view.TimerClock'
    ],
    config: {
        refs: {
            clock : 'timerClock'
        },
        control: {
            'main panel' : {
            viewready : 'onSwiffyReady'
        },
            'main': {
                startedthinking: 'onThinking',
                stoppedthinking: 'onStoppedThinking'
            }
        }
    },
    
onSwiffyReady : function(me) {
        console.log('inside controller function');
        
},
onThinking : function(){
    console.log('thinking');

    Ext.getDom('tinkcontainer').contentWindow.tt_start_animation();
    
},
onStoppedThinking : function(){
    console.log('stopped thinking');

    Ext.getDom('tinkcontainer').contentWindow.tt_stop_animation();
    this.getClock().pause();
    var periodInSeconds = this.getClock().getDuration();
    
}

});
