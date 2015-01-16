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
        Ext.Viewport.setActiveItem('tink');
    },
    onTinkBox: function(){
        Ext.Viewport.setActiveItem('feed');
    }
});
