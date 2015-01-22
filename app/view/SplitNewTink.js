Ext.define('ttapp.view.SplitNewTink', {
    extend: 'Ext.Container',
    xtype: 'splitnewtink',
    requires: ['Ext.Label'],
    config:{
        styleHtmlContent: true,
        items:
            [
                {
                    xtype: 'label',
                    html: '<h1>New Tink</h1>'
                }
            ],
        listeners: {
            tap : {
                element: 'element',
                fn: function(){
                    this.fireEvent("toNewTink", this);
                }
            }
        }

    }
});