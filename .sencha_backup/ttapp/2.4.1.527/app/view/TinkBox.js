Ext.define('ttapp.view.TinkBox', {
	extend: 'Ext.Container',
	xtype: 'tinkbox',
	config: {
        cls:'bg-white-color tinkometer-section',
		items: [
			{
                xtype: 'panel',
                docked: 'top',
                cls: 'new-header',
                items: [
                    {
                        xtype: 'panel',
                        cls: 'tinkbox-logo',
                        docked: 'top'
                    }
                ]
            }
		]
	}
});