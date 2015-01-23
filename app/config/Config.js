Ext.define('ttapp.config.Config', {
    singleton: true,
    config: { /** here you can put any objects of your choice that will be accessible globally**/
        baseURL         : 'http://localhost:8888'
    },
    constructor: function(config) {

        this.initConfig(config);
        return this;
    }
});