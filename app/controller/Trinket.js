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
    onTrinketSelection: function(list, idx, target, record, evt) {
        Ext.getStore('profilestore').setActiveTrinket(record.data.name);
        ttapp.util.Analytics.trackView('Tink');

        Ext.Viewport.animateActiveItem('tink', {
            type: 'slide'
        });
    }
});
