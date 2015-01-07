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
    },
    isUserVerified: function(){
        this.load();
        var m = this.getAt(0);
        if ( Ext.isDefined(m) ){
            return m.get('is_verified');    
        }
        else{ return false;}
        
    },
    addProfile: function(phoneNumber, isVerified, lastUpdatedOn ){
        var usr = Ext.create('ttapp.model.Profile',{
            phone_number: phoneNumber,
            is_verified: isVerified,
            last_updated_on: lastUpdatedOn
            });

        this.add(usr);
        this.sync();
    },
    getPhoneNumber: function(){
        this.load();
        return this.getAt(0).get('phone_number');
    },
    verified: function(){
        this.load();
        this.getAt(0).set('is_verified', true);
        this.sync();
    }

});