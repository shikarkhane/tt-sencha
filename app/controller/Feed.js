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
        console.log('here i am ');
    },
    showSentTrinketThumbnail: function(imgUrl){
        var trinketName = Ext.getStore('profilestore').getActiveTrinket();
        var activeTrinketThumbnailPath = Ext.getStore('trinketstore').getThumbnailPath(trinketName);

        var width = ttapp.config.Config.getWidth(),
        height = ttapp.config.Config.getHeight();

        var pt = Ext.ComponentQuery.query('#sentTrinket')[0];
        pt.setSrc(activeTrinketThumbnailPath);
        pt.setTop((ttapp.config.Config.getHeight()/10));
        pt.setLeft((ttapp.config.Config.getWidth()/2)-50);
    }
});
