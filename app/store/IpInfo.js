Ext.define('ttapp.store.IpInfo', {
    extend: 'Ext.data.Store',
    alias: 'store.IpInfo',
    requires: [
        'ttapp.model.IpInfo', 'Ext.data.proxy.LocalStorage'
    ],

    config: {
        model: 'ttapp.model.IpInfo',
        storeId: 'ipinfostore',
        proxy: {
            type: 'localstorage',
            id: 'ipinfostoreproxy'
        }
    },
    getDialCode: function(callback) {
        var me = this;

        if (!callback) {
            if (me.getAt(0)) {
                return me.getAt(0).get('country_dial_code');
            }
            return null;
        }

        me.load({
            scope: me,
            callback: function(records, osmething, success) {
                if (me.getAt(0)) {
                    callback(me.getAt(0).get('country_dial_code'), me.getAt(0).get('country'));
                }
                else {
                  setTimeout(function() {
                    me.getDialCode(callback);
                  }, 1000);
                }
            }
        });
    }

});
