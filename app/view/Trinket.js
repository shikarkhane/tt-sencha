Ext.define('ttapp.view.Trinket', {
    extend: 'Ext.Container',
    xtype: 'trinket',
    requires: ['ttapp.model.Trinket', 'ttapp.store.Trinkets'],
    config: {
        //layout: 'fit',
        cls: 'bg-transparent-white flip-design-right'
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
                cls:'top-btn btn-tink',
                docked:'left'
            },{
                xtype:'button',
                cls:'top-btn btn-mail current flip-design-right',
                docked:'right',
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
        // Ext.getCmp('carouselList').add();

        Ext.getCmp('carouselList').add(Ext.create('Ext.List',{
            scrollable: false,
            inline: {
                    wrap: true
                },
             height:'100%',
            itemTpl: ['<img src={thumbnail_path} height='+widthToUse+' width='+widthToUse+' class="img-trinket">'],
            listeners:{
                    painted: function(){

                        $('img.img-trinket').each(function(){
                            var html="<div class='img-bg' style='background:url(" + $(this).attr('src')+ ");''></div>"
                            $(html).insertBefore($(this));
                            $(this).remove();
                        });
                    }
                },
            store: 'trinketstore',
            
        }));
        Ext.getCmp('carouselList').add(Ext.create('Ext.List',{
            scrollable: false,
            inline: true,
             height:'100%',
            itemTpl: '<img src={thumbnail_path} height='+widthToUse+' width='+widthToUse+' class="img-trinket">',
            store: 'trinketstore'
        }));
    }
});
