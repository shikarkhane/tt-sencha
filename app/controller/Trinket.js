Ext.define('ttapp.controller.Trinket', {
    extend: 'Ext.app.Controller',
    xtype: 'trinketselection',
    requires: ['Ext.util.DelayedTask'],
    config: {
        control: {
            'trinket dataview': {
                itemtap: 'onTrinketSelection'
            }
        }
    },
    onTrinketSelection : function(list, idx, target, record, evt){
        Ext.getStore('profilestore').setActiveTrinket(record.data.file_path);
        
        var task = Ext.create('Ext.util.DelayedTask', function() {
            Ext.Viewport.setActiveItem('tink');
        });

        task.delay(1500);
    }
});
