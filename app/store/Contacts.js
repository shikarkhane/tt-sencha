Ext.define('ttapp.store.Contacts', {
    extend: 'Ext.data.Store',
    requires: [ 'Ext.data.proxy.LocalStorage'],
    config: {
        storeId: 'phonecontacts',
        model: 'ttapp.model.Contact',
        proxy: {
            type: 'localstorage',
            id: 'contactstoreproxy'
        },
    	//sort the store using the lastname field
        sorters: 'lastName',

        //group the store using the lastName field
        groupField: 'lastName'
    },
    getFirstLastName: function(phoneNumber){
    	var i = this.find('phone_number', phoneNumber);
    	if ( i === -1){
    		return phoneNumber;
    	}
    	else{
    		return this.getAt(i).get('first_name') + ' ' + this.getAt(i).get('last_name');
    	}
    },
    isOnTinkTime: function(phoneNumber){
        
        var result = false
        var i = this.find('phone_number', phoneNumber);
        
        if ( i > -1){
            result = this.getAt(i).get('on_tinktime');
        }
        return result
    }

});