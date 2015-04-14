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
            items: [
                {
                    xtype:'button',
                    cls:'top-btn btn-mail show-notification flip-design-right',
                    docked:'right',
                    handler: function() {
                        Ext.Viewport.animateActiveItem('feed',{type:'slide'});  
                    }
                }
            ]
        }));

       /*this.add();*/
        this.add(Ext.create('Ext.Carousel',{
            id:'carouselList',
            cls:'trinket-list',
            height:'100%',
            //indicator:false,
        }));
<<<<<<< HEAD
        var store = Ext.getStore('trinketstore');
        store.clearFilter();
        store.filter(function(record) {
            if ( record.get('trinket_id') < 10 )
                return true;
        });
        Ext.getCmp('carouselList').add(Ext.create('Ext.List',{
            scrollable: false,
            inline: {
                    wrap: true
                },
            height:'100%',
            itemTpl: ['<div class="img-bg" style="background:url({thumbnail_path});"></div>'],
            store: 'trinketstore',
        }));
        /*store.clearFilter();
        store.filter(function(record) {
            if ( record.get('trinket_id') >= 10 )
                return true;
        });
        Ext.getCmp('carouselList').add(Ext.create('Ext.List',{
=======

        var store_data = Ext.getStore('trinketstore');
        var group_count = Math.ceil((store_data.data.all.length)/9);
        //var store_data_display = Ext.getStore('trinketstore');
        // var a = [];
        var offset_start = 0;
        var offset_end = 0;
        for(var i=0; i<group_count; i++){
           

           //store_data.filter("group_id", i);

           var all = store_data.data.all;

           var store = Ext.create('Ext.data.Store', {
              model: 'ttapp.model.Trinket',
              storeId: 'trinketstore_'+i
            });

            offset_start = (i*9);
            offset_end = offset_start + 9;
            
            store.setData(all.slice(offset_start, offset_end));


           // console.log(store);
            Ext.getCmp('carouselList').add(Ext.create('Ext.List',{
                scrollable: false,
                id: 'p_'+i,
                inline: {
                    wrap: true
                },
                height:'100%',
                itemTpl: [
                    '<div class="img-bg" style="background:url({thumbnail_path});"></div>'
                ],
                store: Ext.getStore('trinketstore_'+i)
                
            }));
        }


        /*Ext.getCmp('carouselList').add(Ext.create('Ext.List',{
                scrollable: false,
                inline: {
                    wrap: true
                },
                height:'100%',
                itemTpl: [
                    '<div class="img-bg" style="background:url({thumbnail_path});"></div>'
                ],
                store: store_data_display,
            }));
        ,
        listeners:{
            load: function(){
                var all = store.data.all;
                aStore.setData(all.slice(0,8));
            }
        }
        */
        /*for(var i=1; i<=group_count; i++){
            var store_data_display = Ext.getStore('trinketstore');
            
            // store_data_display.filter("group_id", 1);

            Ext.getCmp('carouselList').add(Ext.create('Ext.List',{
                scrollable: false,
                inline: {
                    wrap: true
                },
                height:'100%',
                // itemTpl: [
                //     '<tpl if=\'trinket_id <= "9"\'>',
                //         '<div class="img-bg" style="background:url({thumbnail_path});"></div>',
                //     '<tpl else>',
                //         '<div class="row"><span class="date-sec">{date}</span><div class="title-sec">{title}</div></div><div class="des">{description}</div>',
                //     '</tpl>'
                // ],

                itemTpl: [
                    '<div class="img-bg" style="background:url({thumbnail_path});"></div>'
                ],
                store: store_data_display,
            }));
        }*/
        //this.add(carousel);
        /*Ext.getCmp('carouselList').add(Ext.create('Ext.List',{
>>>>>>> bd2b4f8e9c982b2d4f724e10ef657618557c142c
            scrollable: false,
            inline: true,
            height:'100%',
            itemTpl: '<div class="img-bg" style="background:url({thumbnail_path});"></div>',
<<<<<<< HEAD
            store: 'trinketstore'
        }));*/
=======
            store: store_data
        }));*/

>>>>>>> bd2b4f8e9c982b2d4f724e10ef657618557c142c
    }
});
