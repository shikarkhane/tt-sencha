Ext.define('ttapp.view.Tink', {
    extend: 'Ext.Container',
    xtype: 'tink',
    requires: [
        'ttapp.view.Thinking', 'ttapp.view.TimerClock'
    ],
    config: {
        id:'tinkScreen',
        itemId: 'tinkPage',
        cls: 'bg-transparent-white flip-design-right tink-page split-page cls-tt-tinking',
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
                    docked:'left',
                    handler: function (){
                        Ext.Viewport.animateActiveItem('trinket',{type:'slide', direction: 'right'});  
                    }
                },{
                    xtype:'button',
                    cls:'top-btn btn-mail flip-design-right',
                    docked:'right',
                    handler: function (){
                        Ext.Viewport.animateActiveItem('feed',{type:'slide'});  
                    }
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
                //xtype: 'thinkingbutton',
                id: 'thinkbutton',
                cls: 'clsTinkButton button_white',
                docked:'bottom'

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
        Ext.get('thinkbutton').toggleCls('button_red');
        this.fireEvent("startedthinking", this);
    },
    onStopThinkingEvent: function(e, target, options, eventController) {
        Ext.get('thinkbutton').toggleCls('button_red');
        this.fireEvent("stoppedthinking", this);
    }

});

