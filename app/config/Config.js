Ext.define('ttapp.config.Config', {
    singleton: true,
    config: { /** here you can put any objects of your choice that will be accessible globally**/
        baseURL         : 'http://feeder.tinktime.com',
        //baseURL         : /*'http://tinktime.com',*/ 'http://localhost:9090',
        width			: (window.innerWidth > 0) ? window.innerWidth : screen.width,
        height			: (window.innerHeight > 0) ? window.innerHeight : screen.height,
        launchedViaNotification: false,
        androidSenderId: "0000000"
    },
    constructor: function(config) {
        this.initConfig(config);
        return this;
    }
});
