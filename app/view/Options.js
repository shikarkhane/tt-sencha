Ext.define('ttapp.view.Options', {
    extend: 'Ext.carousel.Carousel',
    xtype: 'options',
    config: {
        itemId: 'options',
        fullscreen: true,
        activeItem: 2,
        defaults: {
            styleHtmlContent: true,
            listeners: {
                activate: function(newActiveItem){
                    if ( newActiveItem instanceof ttapp.view.Tink){
                        this.fireEvent("resetTinkOnActivate", this);
                    }
                }
            }
        },
        items: [
            {
                xtype: 'trinket'
            },
            {
                xtype: 'tink'
            },
            {
                xtype: 'split'
            },
            {
                xtype: 'feed'
            }
        ]
    }
});