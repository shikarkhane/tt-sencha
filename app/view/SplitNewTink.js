Ext.define('ttapp.view.SplitNewTink', {
    extend: 'Ext.Container',
    xtype: 'splitnewtink',
    requires: ['Ext.Label'],
    config:{
        // styleHtmlContent: true,
        items:
            [
                {
                    xtype: 'button',
                    html: 'Send Another'
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