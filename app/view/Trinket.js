Ext.define('ttapp.view.Trinket', {
    extend: 'Ext.Container',
    xtype: 'trinket',
    requires: ['ttapp.model.Trinket', 'ttapp.store.Trinkets'],
    config: {
        layout: 'fit',
        cls: 'bg-white-color',
        items: [
            {
                xtype: 'panel',
                docked: 'top',
                cls: 'new-header',
                items: [
                    {
                        xtype: 'panel',
                        cls: 'logo-green',
                        docked: 'top',
                        items:[
                            {
                                xtype: 'button',
                                cls: 'back-btn-icon trinket-back-btn',
                                docked: 'top',
                                listeners: [
                                    {
                                        element: 'element',
                                        event: 'tap',
                                        fn: function() {
                                            Ext.Viewport.animateActiveItem('phoneContacts', {type: 'slide', direction: 'right'});
                                            ttapp.util.Analytics.trackView('Contacts');
                                            return false;
                                        }
                                    }
                                ]
                            }
                        ]
                    }, {
                        html:'Choose animation',
                        cls:'top-text-heading'
                    }
                ],
            }
        ]
    }
});
