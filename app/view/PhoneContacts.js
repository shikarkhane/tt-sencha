Ext.define('ttapp.view.PhoneContacts', {
	extend: 'Ext.Container',
	xtype: 'phoneContacts',
    requires: [
        'ttapp.util.Common'
    ],
	config: {
        cls: 'bg-white-color',
		items: [
			{
                xtype: 'panel',
                docked: 'top',
                cls: 'new-header',
                items: [
                    {
                        xtype: 'panel',
                        cls: 'tinktime-logo',
                        docked: 'top'
                    }
                ]
            }
		]
	}
});

