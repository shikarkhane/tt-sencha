Ext.define('ttapp.view.SplitNewTink', {
    extend: 'Ext.Container',
    xtype: 'splitnewtink',
    config:{
        styleHtmlContent: true,
        items:
            [
                {
                    xtype: 'panel',
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