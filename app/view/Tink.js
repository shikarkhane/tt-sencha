Ext.define('ttapp.view.Tink', {
    extend: 'Ext.Container',
    xtype: 'tink',
    requires: [
        'ttapp.view.Thinking', 'ttapp.view.TimerClock'
    ],
    config: {
        itemId: 'tinkPage',
        cls: 'bg-transparent-white flip-design-right',
        layout: {
                type: 'vbox',
                align: 'middle'
            },
        items: [
            {
                xtype: 'toolbar',
                docked:'top',
                cls:'top-bar',
                items:[{
                    xtype:'button',
                    cls:'top-btn btn-tink',
                    docked:'left'
                },{
                    xtype:'button',
                    cls:'top-btn btn-mail current flip-design-right',
                    docked:'right',
                }]
            },
            {
                itemId: 'tinkTimerClock',
                xtype: 'timerClock'   
            },
            {
                xtype: 'image',
                itemId: 'placeholderTrinket',
                width: 100,
                height: 100,
                hidden: true,
                cls: 'prev-trinket',
                listeners: {
                        tap : {
                            element: 'element',
                            fn: function(){
                                this.fireEvent("choosetrinket", this);
                            }
                         }
                    }
            },
            {
                title: 'swiffy',
                xtype: 'panel',
                id: "swiffydiv",
                //flex: 5,
                html: '<iframe id="tinkcontainer" class="tinkanimation" style="" src="resources/tinks/swiffy/default.html"></iframe>'                
            },
            {
                //flex: 1,                
                xtype: 'thinkingbutton',
                docked:'bottom',
            }
        ]

    },
    initialize: function() {
        this.callParent(arguments);

        var thinkElement = Ext.get('thinkbutton');

        thinkElement.on(['touchstart'], 'onStartThinkingEvent', this);
        thinkElement.on(['touchend'], 'onStopThinkingEvent', this);
    },
    onStartThinkingEvent: function(e, target, options, eventController) {
        this.fireEvent("startedthinking", this);
    },
    onStopThinkingEvent: function(e, target, options, eventController) {
        this.fireEvent("stoppedthinking", this);
    }

});

