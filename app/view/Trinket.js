Ext.define('ttapp.view.Trinket', {
    extend: 'Ext.Container',
    xtype: 'trinket',
    requires: ['ttapp.model.Trinket'],
    config: {
        layout: 'fit',
        items: [{
            xtype: 'dataview',
            scrollable: true,
            inline: true,
            //cls: 'dataview-inline',
            itemTpl: '<div class="img" style="width:75px;height:100px;background-image: url({thumbnail_path});"></div>',
            store: 'Trinkets'
        }]
    }
});
