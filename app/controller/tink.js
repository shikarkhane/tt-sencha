Ext.define('ttapp.controller.Tink', {
    extend: 'Ext.app.Controller',
    requires: [
        'ttapp.view.TimerClock', 'ttapp.config.Config', 'Ext.Img'
    ],
    config: {
        refs: {
            clock : 'timerClock'
        },
        control: {
            'tink': {
                startedthinking: 'onThinking',
                stoppedthinking: 'onStoppedThinking',
                show: 'onShow',
                resetTinkOnActivate: 'onShow'
            },
            'tink image':{
                choosetrinket: 'onChooseTrinket'
            }
        }
    },
    onChooseTrinket: function(){
        Ext.Viewport.setActiveItem('trinket');
    },
    onThinking : function(){
        this.hideActiveTrinketThumbnail();
        this.getClock().start();
        Ext.getDom('tinkcontainer').contentWindow.tt_start_animation();

    },
    onStoppedThinking : function(){

        Ext.getDom('tinkcontainer').contentWindow.tt_stop_animation();
        this.getClock().pause();
        var periodInSeconds = this.getClock().getDuration();
        var trinketName = Ext.getStore('profilestore').getActiveTrinket();
        this.getApplication().getController('SendTo').showSendTo(this, periodInSeconds, trinketName);
    },
    onShow: function(){
        this.resetTimerClock();
        this.useActiveTrinket();
    },
    showActiveTrinketThumbnail: function(imgUrl){
        var pt = Ext.ComponentQuery.query('#placeholderTrinket')[0];
        pt.setSrc(imgUrl);
        pt.setTop(ttapp.config.Config.getHeight()/3);
        pt.setLeft(ttapp.config.Config.getWidth()/3);
        pt.setHidden(false);
    },
    hideActiveTrinketThumbnail: function(imgUrl){
        var pt = Ext.ComponentQuery.query('#placeholderTrinket')[0];
        pt.setHidden(true);
    },
    resetTimerClock: function(){
        var tc = Ext.ComponentQuery.query('#tinkTimerClock')[0];
        tc.destroy();
        var tp = Ext.ComponentQuery.query('#tinkPage')[0];
        tp.add({
            itemId: 'tinkTimerClock',
            xtype: 'timerClock'
        });
    },
    useActiveTrinket : function(){
        var trinketArea = Ext.get('swiffydiv');
        var trinketName = Ext.getStore('profilestore').getActiveTrinket();
        var activeTrinketFilePath = Ext.getStore('trinketstore').getFilePath(trinketName);
        var activeTrinketThumbnailPath = Ext.getStore('trinketstore').getThumbnailPath(trinketName);

        var width = ttapp.config.Config.getWidth(),
        height = ttapp.config.Config.getHeight();

        this.showActiveTrinketThumbnail(activeTrinketThumbnailPath);

        trinketArea.setHtml('<iframe id="tinkcontainer" style="width:' + width +'px;height:' + height + 'px;" src="resources/tinks/swiffy/' + activeTrinketFilePath + '"></iframe>');
    }

});
