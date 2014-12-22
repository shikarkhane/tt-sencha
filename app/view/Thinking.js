Ext.define('ttapp.view.Thinking', {
    extend: 'Ext.Container',
    xtype: 'thinkingbutton',
    id: 'thinkbutton',
    
    config: {
        flex: 1,
        margin: 10,
        
        layout: {
            type: 'vbox',
            pack: 'center',
            align: 'stretch'
        },
        
        
        items: [
            {
                xtype: 'button',
                text: "tink",
                ui: 'confirm-round'
            }
        ]
    }
});
