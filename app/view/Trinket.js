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
            title:'Tink gallery',  
            items: [
                {
                    xtype:'button',
                    cls:'top-btn btn-mail flip-design-right',
                    docked:'right'
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


    }
});
