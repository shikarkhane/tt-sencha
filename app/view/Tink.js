Ext.define('ttapp.view.Tink', {
    extend: 'Ext.Container',
    xtype: 'tink',
    requires: [
        'ttapp.view.Thinking', 'ttapp.view.TimerClock'
    ],
    config: {
        layout: {
                type: 'vbox',
                align: 'middle'
            },
        items: [
            {
                xtype: 'dogear'
            },
            {
                xtype: 'timerClock'   
            },
            {
                title: 'swiffy',
                xtype: 'panel',
                id: "swiffydiv",
                height: '500px',
                width: '350px',
                flex: 5,
                html: '<iframe id="tinkcontainer" style="width:350px;height:500px;" src="resources/tinks/default.html"></iframe>',
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
                flex: 1,
                xtype: 'thinkingbutton'
            }
        ]

    },
    initialize: function() {
        this.callParent(arguments);

        var thinkElement = Ext.get('thinkbutton');

        thinkElement.on(['touchstart'], 'onStartThinkingEvent', this);
        thinkElement.on(['touchend'], 'onStopThinkingEvent', this);
    },
    onChooseTrinket: function(e, target, options, eventController) {
        this.fireEvent("choosetrinket", this);
    },
    onStartThinkingEvent: function(e, target, options, eventController) {
        this.fireEvent("startedthinking", this);
    },
    onStopThinkingEvent: function(e, target, options, eventController) {
        this.fireEvent("stoppedthinking", this);
    }

});


/* dog ear on the top corner code snippet
var p = Ext.widget('panel', {
    floating: true
    , html: '<img src="http://img.stockfresh.com/files/c/ccaetano/x/88/475832_69663329.jpg"/ '
    , shadow: false
});

p.show().alignTo(Ext.getBody(), 'tr-tr');
*/
