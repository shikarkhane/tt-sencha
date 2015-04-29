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
    getDialCode: function(){
        this.load();
        if(this.getAt(0)){
            return this.getAt(0).get('country_dial_code');
        }
        else{ return false;}
    }

});