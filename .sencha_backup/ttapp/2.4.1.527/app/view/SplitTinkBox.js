Ext.define('ttapp.view.SplitTinkBox', {
    extend: 'Ext.Container',
    xtype: 'splittinkbox',
    requires: ['Ext.Label'],
    config:{
        styleHtmlContent: true,
        items:
            [
                {
                    xtype: 'button',
                    html: 'View Tinkbox'
                }
            ],
        listeners: {
            tap : {
                element: 'element',
                fn: function(){
                    this.fireEvent("toTinkBox", this);
                }
            }
        }

    }
});