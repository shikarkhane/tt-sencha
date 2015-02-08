Ext.define('ttapp.view.Trinket', {
    extend: 'Ext.Container',
    xtype: 'trinket',
    requires: ['ttapp.model.Trinket', 'ttapp.store.Trinkets'],
    config: {
        layout: 'fit',
        cls: 'cls-tt-tinking'
    },
    initialize: function(){
        var width = ttapp.config.Config.getWidth();
        var maxWidth = 100,
            widthToUse;

        widthToUse = width/3 - 10;

        this.add(Ext.create('Ext.DataView',{
            scrollable: true,
            inline: true,
            //cls: 'dataview-inline',
            itemTpl: '<img src={thumbnail_path} height='+widthToUse+' width='+widthToUse+' class="img-trinket">',
            store: 'trinketstore'
        }));
    }
});
