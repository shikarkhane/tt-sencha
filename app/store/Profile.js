Ext.define('ttapp.store.Profile', {
    extend: 'Ext.data.Store',
    alias: 'store.Profile',
    requires: [
        'ttapp.model.Profile', 'Ext.data.proxy.LocalStorage'
    ],
 
    config: {
        model: 'ttapp.model.Profile',
        storeId: 'profilestore',
        proxy: {
            type: 'localstorage',
            id: 'profilestoreproxy'
        }
    }
});