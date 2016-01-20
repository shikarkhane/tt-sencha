Ext.define('ttapp.controller.Trinket', {
    extend: 'Ext.app.Controller',
    xtype: 'trinketselection',
    requires: ['Ext.util.DelayedTask'],
    config: {
        control: {
            'trinket dataview': {
                itemtap: 'onTrinketSelection'
            },
            'trinket': {
                show: 'renderTrinkets'
            }
        }
    },
    onTrinketSelection: function(list, idx, target, record, evt) {
        Ext.getStore('profilestore').setActiveTrinket(record.data.name);
        ttapp.util.Analytics.trackView('Tink');

        Ext.Viewport.animateActiveItem('tink', {
            type: 'slide'
        });
    },
    renderTrinkets: function(component) {
        var list = Ext.create('Ext.List', {
            scrollable: {
                direction: 'vertical',
                directionLock: true
            },
            /*id: 'p_' + 1,*/
            inline: {
                wrap: true
            },
            height: '100%',
            cls: 'trinket-new-list',
            itemTpl: [
                '<div class="img-bg"><img src="{thumbnail_path}" alt="img"></div>'
            ],
            store: Ext.getStore('trinketstore')
        });

        component.add(list);
        component.add(ttapp.util.Common.createMenuButton());


    }
});