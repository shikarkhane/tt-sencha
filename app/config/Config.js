Ext.define('ttapp.config.Config', {
    singleton: true,
    config: { /** here you can put any objects of your choice that will be accessible globally**/
        //baseURL         : 'http://tinktime.com',
        baseURL         : /*'http://tinktime.com',*/ 'http://52.19.171.73',
        width			: (window.innerWidth > 0) ? window.innerWidth : screen.width,
        height			: (window.innerHeight > 0) ? window.innerHeight : screen.height,
        unreadMessage   : false,
        currentFeedPageNumber : 0,
        feedPageSize       : 8
    },
    constructor: function(config) {
        this.initConfig(config);
        return this;
    }
});
