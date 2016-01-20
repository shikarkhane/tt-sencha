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
                    },
                    {
                        xtype: 'image',
                        mode: 'image',
                        cls:'header-user-img',
                        setStyleHtmlContent: true,
                        style: 'background:url(resources/images/user-icon.png)',
                        itemId: 'trinketProfileImg',
                        //src: 'resources/images/user-icon.png',
                        docked: 'right',
                    }, {
                        xtype: 'panel',
                        html:'<div class="user-title"></div>',
                        docked: 'top'
                    }
                    ,
                    {
                        html:'Choose animation',
                        cls:'top-text-heading'
                    }
                ],
            }
        ]
    }
});
