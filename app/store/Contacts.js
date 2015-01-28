Ext.define('ttapp.util.ContactsProxy', {
    singleton: true,
    requires: ['Ext.device.Contacts'],
    process: function() {
            
        if (Ext.os.deviceType == 'Phone'){
            var opts = new ContactFindOptions();
            opts.filter = "";
            opts.multiple = true;
            var contactsConfig = {        
                options: opts,
                fields: ["name", "phoneNumbers"],
                success: function(contacts){
                    if ( contacts.length > 0){
                        var cStore = Ext.getStore('phonecontacts'),
                            cModel;

                        // remove all existing contacts
                        cStore.removeAll(true);

                        Ext.Array.each(contacts, function(item, index, contacts_itself){

                        // item.name.familyName, item.name.givenName, item.phoneNumbers[0].value
                            cModel = Ext.create('ttapp.model.Contact', {
                                    'id': index,
                                    'first_name': item.name.givenName,
                                    'last_name': item.name.familyName,
                                    'on_tinktime': true,
                                    'phone_number': item.phoneNumbers[0].value
                                });
                            cStore.add(cModel);    
                        });
                   }
                },
                    
                failure: function(context){
                     Ext.Msg.alert('Change privacy!', 'Allow tinktime in settings > privacy > contacts', Ext.emptyFn);
               },
               scope: this,
               includeImages: false
            };
            Ext.device.Contacts.getContacts(contactsConfig);
        }
    }
});

Ext.define('ttapp.store.Contacts', {
    extend: 'Ext.data.Store',

    config: {
        storeId: 'phonecontacts',
        model: 'ttapp.model.Contact',
    	//sort the store using the lastname field
        sorters: 'lastName',

        //group the store using the lastName field
        groupField: 'lastName',
        data: [
	        { 
	        	'id' : 1,
	            'first_name' : 'Nikhil',
	            'last_name' : 'Shikarkhane',
	            'on_tinktime' : true,
	            'phone_number' : '0705438947'
	        },
	        { 
	        	'id' : 2,
	            'first_name' : 'Monica',
	            'last_name' : 'Sylvander',
	            'on_tinktime' : true,
	            'phone_number' : '0701234567'
	        },
	        { 
	        	'id' : 3,
	            'first_name' : 'Justyna',
	            'last_name' : 'Mach',
	            'on_tinktime' : false,
	            'phone_number' : '0707654321'
	        },
	        { 
	        	'id' : 4,
	            'first_name' : '51512',
	            'last_name' : '',
	            'on_tinktime' : true,
	            'phone_number' : '07051512'
	        },
            { 
                'id' : 5,
                'first_name' : '5050',
                'last_name' : '',
                'on_tinktime' : true,
                'phone_number' : '5050'
            }

        ]
    },
    getFirstLastName: function(phoneNumber){
    	this.load();
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
        this.load();
        var i = this.find('phone_number', phoneNumber);
        
        if ( i > -1){
            result = this.getAt(i).get('on_tinktime');
        }
        return result
    }

});