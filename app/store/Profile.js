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
    addProfile: function(phoneNumber, isVerified, lastUpdatedOn, selectedTrinketName){
        var result = false;
        //empty store if exists
        //this.removeAll();
        this.getProxy().clear();
        this.data.clear();
        this.sync();

        
        var usr = Ext.create('ttapp.model.Profile',{
            phone_number: phoneNumber,
            is_verified: isVerified,
            last_updated_on: lastUpdatedOn,
            selected_trinket_name: selectedTrinketName
            });
        var errors = usr.validate();

        if(errors.isValid()){
            this.add(usr);
            this.sync();
            result = true;
        }
        else{
            Ext.Msg.alert('Check number', 'Phone number is not correct', Ext.emptyFn); 
        }

        return result;
    },
    getPhoneNumber: function(){
        this.load();
        if(this.getAt(0)){
            return this.getAt(0).get('phone_number');
        }
        else{ return false;}
    },
    verified: function(){
        this.load();
        this.getAt(0).set('is_verified', true);
        this.sync();
    },
    setActiveTrinket: function(trinket_name){
        this.load();
        this.getAt(0).set('selected_trinket_name', trinket_name);
        this.sync();
    },
    getActiveTrinket: function(){
        this.load();
        return this.getAt(0).get('selected_trinket_name');
    }

});