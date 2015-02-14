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
    },
    onNewTink: function(){
         Ext.Viewport.setActiveItem('tink','slide');
    },
    onTinkBox: function(){
        Ext.Viewport.setActiveItem('feed','slide');
    },
    showSentTrinketThumbnail: function(imgUrl){
        var trinketName = Ext.getStore('profilestore').getActiveTrinket();
        var activeTrinketThumbnailPath = Ext.getStore('trinketstore').getThumbnailPath(trinketName);

        var width = ttapp.config.Config.getWidth(),
        height = ttapp.config.Config.getHeight();

        var pt = Ext.ComponentQuery.query('#sentTrinket')[0];
        pt.setSrc(activeTrinketThumbnailPath);
        pt.setTop((ttapp.config.Config.getHeight()/4));
        pt.setLeft((ttapp.config.Config.getWidth()/2)-50);
    }
});
