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
            },
            'split': {
                show: 'onShow'
            }
        }
    },
    onShow: function(){
        this.showSentTrinketThumbnail();
        // ajax load the feed
        ttapp.util.FeedProxy.process();

    },
    onNewTink: function(){
         Ext.Viewport.animateActiveItem('tink',{type:'slide', direction: 'right'});
    },
    onTinkBox: function(){
        Ext.Viewport.animateActiveItem('feed',{type:'slide', direction: 'left'});
    },
    showSentTrinketThumbnail: function(imgUrl){
        var trinketName = Ext.getStore('profilestore').getActiveTrinket();
        var activeTrinketThumbnailPath = Ext.getStore('trinketstore').getThumbnailPath(trinketName);

        var width = ttapp.config.Config.getWidth(),
        height = ttapp.config.Config.getHeight();

        var pt = Ext.ComponentQuery.query('#sentTrinket')[0];
        pt.setSrc(activeTrinketThumbnailPath);
        // pt.setTop((ttapp.config.Config.getHeight()/4)-50);
        // pt.setLeft((ttapp.config.Config.getWidth()/2)-50);
    }
});
