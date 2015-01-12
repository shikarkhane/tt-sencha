Ext.define('ttapp.view.DogEar', {
    extend: 'Ext.Toolbar',
    xtype: 'dogear',
    config: {
            ui: 'neutral',
            docked: 'top',
            scrollable: null,
            defaults: {
                ui: 'plain'
            },
            items: [
                { 
                    iconCls: 'action'
                },
                { 
                    iconCls: 'add'
                }
            ],
            layout: {
                pack : (Ext.filterPlatform('ie10') && !Ext.os.is.Phone) ? 'start' : 'center',
                align: 'center'
            }

    }
});
