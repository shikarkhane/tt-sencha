Ext.define('ttapp.view.Main', {
    extend: 'Ext.Container',
    xtype: 'main',
    requires: [
        'ttapp.view.Thinking', 'ttapp.view.TimerClock'
    ],
    config: {
        //tabBarPosition: 'bottom',

        items: [
            {
                xtype: 'timerClock'   
            },
            {
                title: 'swiffy',
                xtype: 'panel',
                id: "swiffydiv",
                html: '<iframe id="tinkcontainer" src="resources/tinks/default/default.html" style="width: 550px; height: 550px"></iframe>'
            },
            {
                xtype: 'thinkingbutton'
            }
        ]

    },
    initialize: function() {
        this.callParent(arguments);

        var thinkElement = Ext.get('thinkbutton');

        thinkElement.on(['touchstart'],
        'onStartThinkingEvent', this);
        thinkElement.on(['touchend'],
        'onStopThinkingEvent', this);
    },
    onStartThinkingEvent: function(e, target, options, eventController) {
        //this.down('toucheventlogger').addLog(eventController.info.eventName);
        console.log('touchstart event');
        Ext.getDom('tinkcontainer').contentWindow.tt_start_animation();
    },
    onStopThinkingEvent: function(e, target, options, eventController) {
        //this.down('toucheventlogger').addLog(eventController.info.eventName);
        console.log('touchend event');
        Ext.getDom('tinkcontainer').contentWindow.tt_stop_animation();
    }

});
