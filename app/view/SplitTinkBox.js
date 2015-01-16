Ext.define('ttapp.view.SplitTinkBox', {
    extend: 'Ext.Container',
    xtype: 'splittinkbox',
    config:{
        styleHtmlContent: true,
        items:
            [
                {
                    xtype: 'panel',
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