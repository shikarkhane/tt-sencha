Ext.define('ttapp.view.Thinking', {
    extend: 'Ext.Container',
    xtype: 'thinkingbutton',
    id: 'thinkbutton',
    
    config: {
        layout: {
            type: 'vbox',
            pack: 'center',
            align: 'stretch'
        },
        items: [
            {
                
                xtype: 'button',                
                cls: 'clsTinkButton button_white',
                id:'clsTinkButtonPressed'
                
            }
        ]
    }
});
