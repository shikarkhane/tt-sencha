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

    this.showSendTo();
},
showSendTo: function(){
    //Ext.Viewport.setActiveItem('sendto');
    Ext.Viewport.add({
        xtype: 'sendto',
        id: 'choose-recepients',
        modal: true,
        hideOnMaskTap: true,
        showAnimation: {
            type: 'popIn',
            duration: 250,
            easing: 'ease-out'
        },
        hideAnimation: {
            type: 'popOut',
            duration: 250,
            easing: 'ease-out'
        },
        centered: true,
        width: Ext.filterPlatform('ie10') ? '100%' : (Ext.os.deviceType == 'Phone') ? 260 : 400,
        height: Ext.filterPlatform('ie10') ? '30%' : Ext.os.deviceType == 'Phone' ? 220 : 400
    });
}
});
