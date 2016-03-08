Ext.define('ttapp.view.Tink', {
    extend: 'Ext.Container',
    xtype: 'tink',
    requires: [
        'ttapp.view.Thinking', 'ttapp.view.TimerClock'
    ],
    config: {
        fullscreen: true,
        id: 'tinkScreen',
        itemId: 'tinkPage',
        cls: 'bg-transparent flip-design-right tink-page split-page',
        layout: {
            type: 'vbox',
            align: 'middle'
        },
        items: [{
                xtype: 'panel',
                docked: 'top',
                cls: 'new-header send-to-header',
                items: [
                    {
                        xtype: 'button',
                        cls: 'back-btn-icon',
                        docked: 'left',
                        handler: function() {
                          ttapp.util.Analytics.trackView('Trinket');
                            Ext.Viewport.animateActiveItem('trinket', {
                                type: 'slide',
                                direction: 'right'
                            });
                        }
                    },
                ]
            }, {
            xtype: 'image',
            itemId: 'placeholderTrinket',
            hidden: true,
            top:'50%',
            cls: 'prev-trinket msg-box-img',
            listeners: {
                tap: {
                    element: 'element',
                    fn: function() {
                        this.fireEvent("choosetrinket", this);
                    }
                }
            }
        }, {
            title: 'swiffy',
            xtype: 'panel',
            id: "swiffydiv",
            //flex: 5,
            html: '<iframe id="tinkcontainer" class="tinkanimation" style="" ></iframe>'
        }, {
            itemId: 'tinkTimerClock',
            xtype: 'timerClock'
        }, {
            //flex: 1,
            xtype: 'image',
            id: 'thinkbutton',
            cls: 'clsTinkButton rotate-image',
            docked: 'bottom',
            src:'resources/images/circle-icon-blank.png',
            html: '<p>Press & hold</p>',
            styleHtmlContent: true,
            styleHtmlCls: 'cls-press-n-hold'
        }]
    },
    initialize: function() {
        this.callParent(arguments);

        var thinkElement = Ext.get('thinkbutton');

        thinkElement.on(['touchstart'], 'onStartThinkingEvent', this);
        thinkElement.on(['touchend'], 'onStopThinkingEvent', this);
    },
    onStartThinkingEvent: function(e, target, options, eventController) {
        Ext.get('thinkbutton').toggleCls('button_red');
        this.fireEvent("startedthinking", this);
    },
    onStopThinkingEvent: function(e, target, options, eventController) {
        Ext.get('thinkbutton').toggleCls('button_red');
        this.fireEvent("stoppedthinking", this);
    }
});
