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
        ttapp.util.Analytics.trackView('Trinket');

        Ext.Viewport.animateActiveItem('trinket', {
            type: 'slide',
            direction: 'right'
        });
    },
    onThinking: function() {
        this.hideActiveTrinketThumbnail();
        this.getClock().start();
        this.runAnimation();

        Ext.getCmp('tinkScreen').addCls('show-full-frame');

        ttapp.util.Analytics.trackEvent('Tink', 'Started thinking');

        try {
            navigator.notification.vibrate(1000);
        } catch(e) {

        }
    },
    onStoppedThinking: function() {
        var me = this;

        me.stopAnimation();

        me.getClock().pause();

        var periodInSeconds = me.getClock().getDuration();
        ttapp.util.Analytics.trackEvent('Tink', 'Stopped thinking', null, periodInSeconds);
        
        if (periodInSeconds < 1) {
            periodInSeconds = '00'+':'+'00'+':'+'01';
        } else {
            periodInSeconds = me.getClock().formatTime(periodInSeconds)
        }

        Ext.getStore('profilestore').getActiveTrinket(function(trinketName) {
            Ext.getStore('profilestore').getActiveTrinket(function(trinketName) {
                Ext.getStore('profilestore').setLastSecondsSent(periodInSeconds);
                me.getApplication().getController('SendTo').showSendTo(me, periodInSeconds, trinketName);
                Ext.getCmp('tinkScreen').removeCls('show-full-frame');
            });
        });
    },
    onShow: function() {
        Ext.Viewport.mask({
            xtype: 'loadmask',
            html: '<img src="resources/images/green-loader.png" alt="loader">'
        });

        this.resetTimerClock();
        this.useActiveTrinket();

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
            cls: 'clsTimerClock',
            docked: 'bottom'
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

                        Ext.Viewport.unmask();
                    };

                    iframe.dom.src = activeTrinketSwiffyPath;
                });
            });
        });
    },
    runAnimation: function() {
        var me = this;

        try {
            Ext.getDom('tinkcontainer').contentWindow.tt_start_animation();
        } catch(e) {
            setTimeout(function() {
                me.runAnimation();
            }, 500);
        }
    },
    stopAnimation: function() {
        Ext.getDom('tinkcontainer').contentWindow.tt_stop_animation();
    }
});
