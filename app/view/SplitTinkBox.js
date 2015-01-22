Ext.define('ttapp.view.SplitTinkBox', {
    extend: 'Ext.Container',
    xtype: 'splittinkbox',
    requires: ['Ext.Label'],
    config:{
        styleHtmlContent: true,
        items:
            [
                {
                    xtype: 'label',
                    html: '<h1>Tinkbox</h1>'
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