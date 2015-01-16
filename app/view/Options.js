Ext.define('ttapp.view.Options', {
    extend: 'Ext.carousel.Carousel',
    xtype: 'options',
    config: {
        fullscreen: true,
        defaults: {
            styleHtmlContent: true
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