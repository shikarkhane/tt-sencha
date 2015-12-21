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
    addProfile: function(phoneNumber, isVerified, lastUpdatedOn, selectedTrinketName, lastSecondsSent) {
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
            selected_trinket_name: selectedTrinketName,
            last_seconds_sent: lastSecondsSent,
            profile_url: null
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
    setLastSecondsSent: function(seconds) {
        var record = this.getAt(0);
        if (record) {
            record.set('last_seconds_sent', seconds);
        }

        this.sync();
    },
    getActiveTrinket: function(callback) {
        var record = this.getAt(0);
        callback(record ? record.get('selected_trinket_name') : false);
    },
    getLastSentSeconds: function(callback) {
        var record = this.getAt(0);
        callback(record ? record.get('last_seconds_sent') : false);
    },

    setUserImage: function() {
        var me = this;
        var record = this.getAt(0);

        Ext.Ajax.request({
            url: ttapp.config.Config.getBaseURL()+'/profile-picture/'+record.get('phone_number')+'/',
            method: 'GET',
            disableCaching: false,
            success: function(response) {
                console.log('SETUSERIMAGE: before');
                //todo: change this to use CDN
                record.set('profile_url', response.responseText+ '?notToCacheThisOneHack='+(new Date()).getTime());
                //record.set('profile_url', ttapp.config.Config.getBaseURL()+ '/static/img/user_profile/'+
                //    record.get('phone_number')+ '.jpeg?notToCacheThisOneHack='+(new Date()).getTime());
                console.log('SETUSERIMAGE: after');
                me.sync();
            },
            failure: function(response) {
                console.log('SETUSERIMAGE:' + response);
            }
        });
    },

    getUserImage: function(callback) {
        var record = this.getAt(0);
        callback(record ? record.get('profile_url') : false);
        //callback(record ? ttapp.config.Config.getBaseURL()+ '/static/img/user_profile/'+ record.get('phone_number')+ '.jpeg' : false);
    }
});
