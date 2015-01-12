Ext.define('ttapp.store.Contacts', {
    extend: 'Ext.data.Store',

    config: {
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