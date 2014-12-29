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
            'tink': {
                startedthinking: 'onThinking',
                stoppedthinking: 'onStoppedThinking'
            }
        }
    },
onThinking : function(){
    //console.log('thinking');
    this.getClock().start();
    Ext.getDom('tinkcontainer').contentWindow.tt_start_animation();
    
},
onStoppedThinking : function(){
    //console.log('stopped thinking');

    Ext.getDom('tinkcontainer').contentWindow.tt_stop_animation();
    this.getClock().pause();
    var periodInSeconds = this.getClock().getDuration();

    this.getApplication().getController('SendTo').showSendTo();
}

});
