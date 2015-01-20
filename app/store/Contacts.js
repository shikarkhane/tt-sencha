Ext.define('ttapp.util.ContactsProxy', {
    singleton: true,
    requires: ['Ext.device.Contacts'],
    process: function() {
        var contactsStore = Ext.getStore('Contacts'),
            contactModel;
            
        if (Ext.os.deviceType == 'Phone'){
            var contactsConfig = {            
                success: function(context, contacts){
                    Ext.Msg.alert('Contacts?', 'wrong place', Ext.emptyFn);

                    Ext.Array.each(contacts, function(c){
                        Ext.Msg.alert('Title', c, Ext.emptyFn);
                    });
                },
                    
                failure: function(context){
                     Ext.Msg.alert('Failure', 'It did not work.', Ext.emptyFn);
               },
                scope: this,                                    
                includeImages: true
            };
            var contactsArray = Ext.device.Contacts.getContacts(contactsConfig);
            Ext.Msg.alert('what', contactsArray.length, Ext.emptyFn);            
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
	            'on_tinktime' : true,
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
    }

});