Ext.define('ttapp.view.Trinket', {
    extend: 'Ext.Container',
    xtype: 'trinket',
    requires: ['ttapp.model.Trinket', 'ttapp.store.Trinkets'],
    config: {
        //layout: 'fit',
        cls: 'bg-transparent-white flip-design-right cls-tt-tinking'
    },
    initialize: function(){
        var width = ttapp.config.Config.getWidth();
        var maxWidth = 100,
            widthToUse;
        this.add(Ext.create('Ext.Toolbar',{
            docked:'top',
            cls:'top-bar',
            items:[{
                xtype:'button',
                cls:'top-btn btn-mail show-notification flip-design-right',
                docked:'right',
                handler: function (){
                    Ext.Viewport.animateActiveItem('feed',{type:'slide'});  
                }
            }]

        }
        ));
        // widthToUse = width/3 - 10;
        this.add(Ext.create('Ext.Carousel',{
            id:'carouselList',
            cls:'trinket-list',
            height:'100%',
            indicator:false,
            
        }));
        Ext.getCmp('carouselList').add(Ext.create('Ext.List',{
            scrollable: false,
            inline: {
                    wrap: true
                },
            height:'100%',
            itemTpl: ['<div class="img-bg" style="background:url({thumbnail_path});"></div>'],
            store: 'trinketstore',
        }));
        Ext.getCmp('carouselList').add(Ext.create('Ext.List',{
            scrollable: false,
            inline: true,
            height:'100%',
            itemTpl: '<div class="img-bg" style="background:url({thumbnail_path});"></div>',
            store: 'trinketstore'
        }));
    }
});
