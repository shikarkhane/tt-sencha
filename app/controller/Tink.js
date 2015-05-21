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
        this.getSwiffyObject('newall');
        //this.runAnimation();
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
        var trinketName = Ext.getStore('profilestore').getActiveTrinket();
        var activeTrinketThumbnailPath = Ext.getStore('trinketstore').getThumbnailPath(trinketName);

        this.showActiveTrinketThumbnail(activeTrinketThumbnailPath);
    },
    runAnimation: function(swiffyobject){
        var width = ttapp.config.Config.getWidth(),
        height = ttapp.config.Config.getHeight();

        var c = document.getElementById('swiffycontainer');
        c.setAttribute("style","display:block;width:"+ width +"px;height:"+ height + "px");
        c.style.width=width+'px';
        c.style.height = height+'px';
        
        this.stage = new swiffy.Stage(c, swiffyobject, {  });
        this.stage.start();
        
    },
    getSwiffyObject: function(trinketname){
        Ext.Ajax.request({
            url:  ttapp.config.Config.getBaseURL() + '/trinket-swiffy/' + trinketname + '/',
            method: 'GET',
            headers: { 'Content-Type': 'application/json'},
            disableCaching: false,
            
            success: function(response) {        
                debugger;
                var swiffyobject = JSON.parse(response.responseText);

                ttapp.app.getController('ttapp.controller.Tink').runAnimation(swiffyobject);
            }
        });
    },
    stopAnimation: function(){
        this.stage.destroy();
    }

});
