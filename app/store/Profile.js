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
        var m = this.getAt(0);
        debugger;
        if (! m === null){
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
        return this.getAt(0).get('phone_number');
    },
    verified: function(){
        this.getAt(0).set('is_verified', true);
        this.sync();
    }

});