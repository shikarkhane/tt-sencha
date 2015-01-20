Ext.define('ttapp.view.Split', {
    extend: 'Ext.Container',
    xtype: 'split',
    requires: ['ttapp.view.SplitNewTink', 'ttapp.view.SplitTinkBox'],
    config: {
        fullscreen: true,
        layout: 'hbox',
        defaults: {
            flex: 1
        },
        items: [
        {
            xtype: 'container',
            layout: 'vbox',
            items:
            [
                {xtype: 'spacer', flex:4},
                {
                    xtype: 'splitnewtink',
                    flex: 1,
                    style: 'text-align:center;'
                },
                {xtype: 'spacer', flex:4}
            ]
        },
        {
            xtype: 'container',
            layout: 'vbox',
            items:
            [
                {xtype: 'spacer', flex:4},
                {
                    xtype: 'splittinkbox',
                    flex: 1,
                    style: 'text-align:center;'
                },
                {xtype: 'spacer', flex:4}
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
