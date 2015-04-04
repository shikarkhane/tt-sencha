Ext.define('ttapp.controller.Feed', {
    extend: 'Ext.app.Controller',
    config: {
        refs: {
        },
        control: {
            'feed list': {
                itemtap: 'onShowTinkInFeed'
            }
        }
    },
    onShowTinkInFeed: function(){
        Ext.Viewport.setActiveItem('replaytink',{type:'slide'});
    }
});
