Ext.define('ttapp.controller.Split', {
    extend: 'Ext.app.Controller',
    config: {
        refs: {
        },
        control: {
            'splittinkbox': {
                toTinkBox: 'onTinkBox'
            },
            'splitnewtink': {
                toNewTink: 'onNewTink'
            }
        }
    },
    onNewTink: function(){
         Ext.Viewport.setActiveItem('tink','slide');
        //Ext.ComponentQuery.query('#options')[0].setActiveItem(1, 'slide');
    },
    onTinkBox: function(){
        Ext.Viewport.setActiveItem('feed','slide');
        //Ext.ComponentQuery.query('#options')[0].setActiveItem(3, 'slide');
    }
});
