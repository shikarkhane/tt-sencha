Ext.define('ttapp.controller.Trinket', {
    extend: 'Ext.app.Controller',
    xtype: 'trinketselection',
    requires: ['Ext.util.DelayedTask'],
    config: {
        control: {
            'trinket dataview': {
                itemtap: 'onTrinketSelection'
            },
            'trinket carousel': {
                
            }
        }
    },
    onTrinketSelection : function(list, idx, target, record, evt){
        Ext.getStore('profilestore').setActiveTrinket(record.data.name);
        
        Ext.Viewport.animateActiveItem('tink',{type:'slide'}); 
        
    }
});
