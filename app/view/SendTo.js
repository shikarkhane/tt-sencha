Ext.define('ttapp.view.SendTo', {
    extend: 'Ext.Container',
    xtype: 'sendto',
    requires: ['ttapp.model.Contact','Ext.dataview.List','Ext.field.Search', 'Ext.Toolbar'],
    config: {
    	layout: 'fit',
    	items: [{
            xtype: 'list',
            ui: 'round',
            pinHeaders: false,
            scrollable: {
                direction: 'vertical'
            },
            itemTpl: '{first_name} {last_name}',
            store: 'phonecontacts',
	        items: [
	                {
	                    xtype: 'toolbar',
	                    docked: 'top',

	                    items: [
	                        { xtype: 'spacer' },
	                        {
	                            xtype: 'searchfield',
	                            cls: 'searchContactsField',
	                            placeHolder: 'Search...'
	                        },
	                        { xtype: 'spacer' }
	                    ]
	                }
	                ]
	            }
        ]
    }
});