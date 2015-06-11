Ext.define('ttapp.store.Profile', {
    extend: 'Ext.data.Store',
    alias: 'store.Profile',
    requires: [
        'ttapp.model.Profile', 'Ext.data.proxy.LocalStorage'
    ],

    config: {
        model: 'ttapp.model.Profile',
        storeId: 'profilestore',
        autoLoad: true,
        proxy: {
            type: 'localstorage',
            id: 'profilestoreproxy'
        }
    },
    isUserVerified: function(callback) {
        var record = this.getAt(0);
        if (record) {
            callback(record.get('is_verified'));
        } else {
            callback(false);
        }
    },
    addProfile: function(phoneNumber, isVerified, lastUpdatedOn, selectedTrinketName) {
        var result = false;
        //empty store if exists
        //this.removeAll();
        this.getProxy().clear();
        this.data.clear();
        this.sync();

        var usr = Ext.create('ttapp.model.Profile', {
            phone_number: phoneNumber,
            is_verified: isVerified,
            last_updated_on: lastUpdatedOn,
            selected_trinket_name: selectedTrinketName
        });

        var errors = usr.validate();
        if (errors.isValid()) {
            this.add(usr);
            this.sync();

            result = true;
        } else {
            Ext.Msg.alert('Check number', 'Phone number is not correct', Ext.emptyFn);
        }

        return result;
    },
    getPhoneNumber: function(callback) {
        var record = this.getAt(0);
        if (record) {
            callback(record.get('phone_number'));
        } else {
            callback(false);
        }
    },
    verified: function() {
        var record = this.getAt(0);
        if (record) {
            record.set('is_verified', true);
        }

        this.sync();
    },
    setActiveTrinket: function(trinket_name) {
        var record = this.getAt(0);
        if (record) {
            record.set('selected_trinket_name', trinket_name);
        }

        this.sync();
    },
    getActiveTrinket: function(callback) {
        var record = this.getAt(0);
        callback(record ? record.get('selected_trinket_name') : false);
    }
});
