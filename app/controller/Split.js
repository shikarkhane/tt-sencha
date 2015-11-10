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
        ttapp.util.FeedProxy.process(true);
        this.updateNotifyRedDot();
    },
    updateNotifyRedDot: function(){
        var unreadRedDot = ttapp.config.Config.getUnreadMessage();
        ttapp.util.Common.updateNotifySymbol(unreadRedDot);
    },
    onNewTink: function(){
      ttapp.util.Analytics.trackView('Tink');
         Ext.Viewport.animateActiveItem('tink',{type:'slide', direction: 'right'});
    },
    onTinkBox: function(){
      ttapp.util.Analytics.trackView('Feed');
        Ext.Viewport.animateActiveItem('feed',{type:'slide', direction: 'left'});
    },
    showSentTrinketThumbnail: function(){

        Ext.getStore('profilestore').getLastSentSeconds(function(secondsSent) {
            Ext.getStore('profilestore').getActiveTrinket(function(trinketName) {
                Ext.getStore('trinketstore').getThumbnailPath( trinketName, function(activeTrinketThumbnailPath) {
                    console.log(secondsSent);
                    var sendSec = Ext.select('.clsSplitSeconds');
                    sendSec.setHtml(secondsSent + ' S');

                    var width = ttapp.config.Config.getWidth(),
                    height = ttapp.config.Config.getHeight();

                    var pt = Ext.ComponentQuery.query('#sentTrinket')[0];
                    pt.setSrc(activeTrinketThumbnailPath);
                    // pt.setTop((ttapp.config.Config.getHeight()/4)-50);
                    // pt.setLeft((ttapp.config.Config.getWidth()/2)-50);
                });

            });
        });
    }
});
