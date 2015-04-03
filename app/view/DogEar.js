Ext.define('ttapp.view.DogEar', {
    extend: 'Ext.Toolbar',
    xtype: 'dogear',
    config: {
            ui: 'neutral',
            docked: 'top',
            scrollable: null,
            cls:'top-bar',
            title: 'tinkbox',
            items: [
                   {
                    xtype:'button',
                    cls:'top-btn btn-tink flip-design-left',
                    docked:'left',
                    handler: function (){
                        Ext.Viewport.animateActiveItem('trinket',{type:'slide', direction: 'right'});  
                    }
                },{
                    xtype:'button',
                    cls:'top-btn btn-mail show-notification',
                    docked:'right',
                }
            ]
    }
});
