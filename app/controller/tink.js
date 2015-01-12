Ext.define('ttapp.controller.Tink', {
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
                stoppedthinking: 'onStoppedThinking',
                show: 'useActiveTrinket'
            },
            'tink panel':{
                choosetrinket: 'onChooseTrinket'
            }
        }
    },
    onChooseTrinket: function(){
        Ext.Viewport.setActiveItem('trinket');
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
        var trinketId = Ext.getStore('trinketstore').getTrinketId(Ext.getStore('profilestore').getActiveTrinket());
        this.getApplication().getController('SendTo').showSendTo(periodInSeconds, trinketId);
    },
    useActiveTrinket : function(){
        var trinketArea = Ext.get('swiffydiv');
        var activeTrinketFilePath = Ext.getStore('trinketstore').getFilePath(Ext.getStore('profilestore').getActiveTrinket());
        trinketArea.setHtml('<iframe id="tinkcontainer" style="width:350px;height:500px;" src="resources/tinks/'+ activeTrinketFilePath + '"></iframe>');
    }

});
