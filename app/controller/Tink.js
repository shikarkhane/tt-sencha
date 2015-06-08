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
        // Ext.Viewport.setActiveItem('trinket');
        Ext.Viewport.animateActiveItem('trinket',{type:'slide', direction: 'right'}); 
    },
    onThinking : function(){
        this.hideActiveTrinketThumbnail();
        this.getClock().start();        
        this.runAnimation();
        //Ext.getDom('tinkcontainer').contentWindow.tt_start_animation();
        Ext.getCmp('tinkScreen').addCls('show-full-frame');

    },
    onStoppedThinking : function(){
        this.stopAnimation();
        //Ext.getDom('tinkcontainer').contentWindow.tt_stop_animation();
        this.getClock().pause();
        
        var periodInSeconds = this.getClock().getDuration();
        if ( periodInSeconds < 1) { periodInSeconds = 1;}

        var trinketName = Ext.getStore('profilestore').getActiveTrinket();
        this.getApplication().getController('SendTo').showSendTo(this, periodInSeconds, trinketName);
        Ext.getCmp('tinkScreen').removeCls('show-full-frame');
    },
    onShow: function(){
        this.resetTimerClock();
        this.useActiveTrinket();
        this.updateNotifyRedDot();
        
    },
    updateNotifyRedDot: function(){
        var unreadRedDot = ttapp.config.Config.getUnreadMessage();
        ttapp.util.Common.updateNotifySymbol(unreadRedDot);
    },
    showActiveTrinketThumbnail: function(imgUrl){
        var pt = Ext.ComponentQuery.query('#placeholderTrinket')[0];
        pt.setSrc(imgUrl);
        pt.setTop((ttapp.config.Config.getHeight()/3)+50);
        // pt.setLeft((ttapp.config.Config.getWidth()/2)-50);
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
            xtype: 'timerClock',
            cls: 'clsTimerClock'
        });
    },
    useActiveTrinket : function(){
        this.activeTrinketName = Ext.getStore('profilestore').getActiveTrinket();
        var activeTrinketThumbnailPath = Ext.getStore('trinketstore').getThumbnailPath(this.activeTrinketName);
        var activeTrinketSwiffyPath = Ext.getStore('trinketstore').getSwiffyPath(this.activeTrinketName);

        this.showActiveTrinketThumbnail(activeTrinketThumbnailPath);

        var trinketArea = Ext.get('swiffydiv');

        trinketArea.setHtml('<iframe id="tinkcontainer" class="tinkanimation" style="opacity:0;" src="' + activeTrinketSwiffyPath + '"></iframe>');
    
        setTimeout(function() {

            var el = Ext.Element.get('tinkcontainer');
            if (el) {
                el.setStyle('opacity', '1');
            }
        }, 650);
    },
    runAnimation: function(){        
        Ext.getDom('tinkcontainer').contentWindow.tt_start_animation();        
    },
    stopAnimation: function(){
        //this.stage.destroy();
        Ext.getDom('tinkcontainer').contentWindow.tt_stop_animation();

    }

});
