Ext.define('ttapp.view.Tink', {
    extend: 'Ext.Panel',
    xtype: 'tink',
    requires: [
       'ttapp.store.trinkets', 'Ext.dataview.List'
    ],
    config: {
    	title: "Tink",
    	items: [
	    	{
	    		html: 'inside tink'
	    	},
    		{
    			title: 'Home tab',
    			xtype: 'list',
                store: 'defaultTrinket',
                itemTpl: '{name}'  
            }
    	]
    }
});