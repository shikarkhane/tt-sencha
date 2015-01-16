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
                xtype: 'splitnewtink'
            },
            {
                xtype: 'splittinkbox'
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
