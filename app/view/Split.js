Ext.define('ttapp.view.Split', {
    extend: 'Ext.Container',
    xtype: 'split',
    requires: ['ttapp.view.SplitNewTink', 'ttapp.view.SplitTinkBox'],
    config: {
        fullscreen: true,
        layout: 'hbox',
        items: [
        {
            xtype: 'image',
            itemId: 'sentTrinket',
            width: 100,
            height: 100,
            cls: 'prev-trinket',
            html: '<h2>Done!</h2>',
            styleHtmlCls : 'clsSentTrinket',
            styleHtmlContent: true
        },
        {
            xtype: 'container',
            flex: 1,
            layout: 'vbox',
            cls: 'cls-tt-split-left',
            items:
            [
                {xtype: 'spacer', flex:6},
                {
                    xtype: 'splitnewtink',
                    flex: 1,
                    style: 'text-align:center;'
                },
                {xtype: 'spacer', flex:2}
            ]
        },
        {
            xtype: 'container',
            layout: 'vbox',
            flex: 1,
            cls: 'cls-tt-split-right',
            items:
            [
                {xtype: 'spacer', flex:6},
                {
                    xtype: 'splittinkbox',
                    flex: 1,
                    style: 'text-align:center;'
                },
                {xtype: 'spacer', flex:2}
            ]
        }
        ],
        listeners: {
            swipeleft : {
                element: 'element',
                fn: function(){
                    this.fireEvent("toNewTink", this);
                }
            },
            swiperight : {
                element: 'element',
                fn: function(){
                    this.fireEvent("toTinkBox", this);
                }
            }
        }
    }
});
