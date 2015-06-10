Ext.define('ttapp.controller.Tink', {
    extend: 'Ext.app.Controller',
    requires: [
        'ttapp.view.TimerClock', 'ttapp.config.Config', 'Ext.Img'
    ],
    config: {
        refs: {
            clock: 'timerClock'
        },
        control: {
            'tink': {
                startedthinking: 'onThinking',
                stoppedthinking: 'onStoppedThinking',
                show: 'onShow',
                resetTinkOnActivate: 'onShow'
            },
            'tink image': {
                choosetrinket: 'onChooseTrinket'
            }
        }
    },
    onChooseTrinket: function() {
        // Ext.Viewport.setActiveItem('trinket');
        Ext.Viewport.animateActiveItem('trinket', {
            type: 'slide',
            direction: 'right'
        });
    },
    onThinking: function() {
        this.hideActiveTrinketThumbnail();
        this.getClock().start();
        this.runAnimation();
        //Ext.getDom('tinkcontainer').contentWindow.tt_start_animation();
        Ext.getCmp('tinkScreen').addCls('show-full-frame');

    },
    onStoppedThinking: function() {
        var me = this;

        me.stopAnimation();
        //Ext.getDom('tinkcontainer').contentWindow.tt_stop_animation();
        me.getClock().pause();

        var periodInSeconds = me.getClock().getDuration();
        if (periodInSeconds < 1) {
            periodInSeconds = 1;
        }

        Ext.getStore('profilestore').getActiveTrinket(function(trinketName) {
            Ext.getStore('profilestore').getActiveTrinket(function(trinketName) {
                me.getApplication().getController('SendTo').showSendTo(me, periodInSeconds, trinketName);
                Ext.getCmp('tinkScreen').removeCls('show-full-frame');
            });
        });
    },
    onShow: function() {
        this.resetTimerClock();
        this.useActiveTrinket();
        this.updateNotifyRedDot();
    },
    updateNotifyRedDot: function() {
        var unreadRedDot = ttapp.config.Config.getUnreadMessage();
        ttapp.util.Common.updateNotifySymbol(unreadRedDot);
    },
    showActiveTrinketThumbnail: function(imgUrl) {
        var pt = Ext.ComponentQuery.query('#placeholderTrinket')[0];
        pt.setSrc(imgUrl);
        pt.setTop((ttapp.config.Config.getHeight() / 3) + 50);
        // pt.setLeft((ttapp.config.Config.getWidth()/2)-50);
        pt.setHidden(false);
    },
    hideActiveTrinketThumbnail: function(imgUrl) {
        var pt = Ext.ComponentQuery.query('#placeholderTrinket')[0];
        pt.setHidden(true);
    },
    resetTimerClock: function() {
        var tc = Ext.ComponentQuery.query('#tinkTimerClock')[0];
        tc.destroy();

        var tp = Ext.ComponentQuery.query('#tinkPage')[0];
        tp.add({
            itemId: 'tinkTimerClock',
            xtype: 'timerClock',
            cls: 'clsTimerClock'
        });
    },
    useActiveTrinket: function() {
        var me = this;

        Ext.getStore('profilestore').getActiveTrinket(function(trinketName) {
            me.activeTrinketName = trinketName;

            Ext.getStore('trinketstore').getThumbnailPath(me.activeTrinketName, function(activeTrinketThumbnailPath) {
                Ext.getStore('trinketstore').getSwiffyPath(me.activeTrinketName, function(activeTrinketSwiffyPath) {
                    me.showActiveTrinketThumbnail(activeTrinketThumbnailPath);

                    var trinketArea = Ext.get('swiffydiv');
                    trinketArea.setHtml('<iframe id="tinkcontainer" class="tinkanimation" allowtransparence="true"></iframe>');

                    var iframe = trinketArea.child('iframe');
                    iframe.dom.style.opacity = 0;

                    iframe.dom.onload = function() {
                        iframe.dom.style.opacity = 1;
                        iframe.dom.onload = null;
                    };

                    iframe.dom.src = activeTrinketSwiffyPath;
                });
            });
        });
    },
    runAnimation: function() {
        Ext.getDom('tinkcontainer').contentWindow.tt_start_animation();
    },
    stopAnimation: function() {
        //this.stage.destroy();
        Ext.getDom('tinkcontainer').contentWindow.tt_stop_animation();
    }
});
