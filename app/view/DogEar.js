Ext.define('ttapp.view.DogEar', {
    extend: 'Ext.Toolbar',
    xtype: 'dogear',
    config: {
            ui: 'neutral',
            docked: 'top',
            scrollable: null,
            cls:'top-bar',
            items: [
                   {
                    xtype:'button',
                    cls:'top-btn btn-tink flip-design-left',
                    docked:'left'
                },{
                    xtype:'button',
                    cls:'top-btn btn-mail current',
                    docked:'right',
                }
            ]
    }
});
