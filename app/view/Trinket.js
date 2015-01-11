Ext.define('ttapp.view.Trinket', {
    extend: 'Ext.Container',
    xtype: 'trinket',
    requires: ['ttapp.model.Trinket', 'ttapp.store.Trinkets'],
    config: {
        layout: 'fit',
        items: [{
            xtype: 'dataview',
            scrollable: true,
            inline: true,
            //cls: 'dataview-inline',
            itemTpl: '<div class="img" style="width:256px;height:256px;background-image: url({thumbnail_path});"></div>',
            store: 'trinketstore'
        }]
    }
});
