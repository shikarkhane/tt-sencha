Ext.define('ttapp.config.Config', {
    singleton: true,
    config: { /** here you can put any objects of your choice that will be accessible globally**/
        baseURL         : 'http://localhost:8888',
        width			: (window.innerWidth > 0) ? window.innerWidth : screen.width,
        height			: (window.innerHeight > 0) ? window.innerHeight : screen.height
    },
    constructor: function(config) {
        this.initConfig(config);
        return this;
    }
});