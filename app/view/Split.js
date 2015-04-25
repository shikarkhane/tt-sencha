Ext.define('ttapp.view.Split', {
    extend: 'Ext.Container',
    xtype: 'split',
    requires: ['ttapp.view.SplitNewTink', 'ttapp.view.SplitTinkBox'],
    config: {
        fullscreen: true,
        layout: 'hbox',
        cls:'split-page',
        items: [{
            xtype:'toolbar',
            
            docked:'top',
            cls:'top-bar',
            items:[{
                xtype:'button',
                cls:'top-btn btn-tink',
                docked:'left',
                handler: function (){
                        Ext.Viewport.animateActiveItem('tink',{type:'slide', direction: 'right'});  
                    }
            },{
                xtype:'button',
                cls:'top-btn btn-mail',
                docked:'right',
                handler: function (){
                        Ext.Viewport.animateActiveItem('feed',{type:'slide', direction: 'left'}); 
                    }
            }]

        
        },
        {
            xtype: 'image',
            itemId: 'sentTrinket',
            src:'resources/images/others/tink_design.png',
            cls: 'prev-trinket',
            html: 'Done!',
            styleHtmlCls : 'clsSentTrinket',
            styleHtmlContent: true
        },
        {
            xtype: 'container',
            layout: 'vbox',
            cls: 'cls-tt-split-left',
            items:
            [ {
                    xtype: 'splitnewtink',
                    style: 'text-align:center;'
                },
            ]
        },
        {
            xtype: 'container',
            layout: 'vbox',
            cls: 'cls-tt-split-right',
            items:
            [
                {
                    xtype: 'splittinkbox',
                    style: 'text-align:center;'
                },
            ]
        }
        ],
        listeners: {
            swipeleft : {
                element: 'element',
                fn: function(){
                    this.fireEvent("toNewTink", this);
                }
            },
            swiperight : {
                element: 'element',
                fn: function(){
                    this.fireEvent("toTinkBox", this);
                }
            }
        }
    }
});
