Ext.define('ttapp.util.ContactsCleaner', {
    singleton: true,
    cleaner: function(contacts, device){
        var c = {};
        var c_array = [];

        if ( device == 'default'){
            console.log('cleaning default');
            Ext.Array.each(contacts, function(item, index, contacts_itself){
                c = {"first_name": item.first_name, "last_name" : item.last_name, "phone_number" : item.phone_number}
                c_array.push(c);
            });
        }
        if ( device == 'ios'){
            console.log('cleaning ios');
        }
    console.log(c_array);
    return c_array;
    }
});
Ext.define('ttapp.util.ContactsProxy', {
    singleton: true,
    requires: ['Ext.device.Contacts'],
    areOnTinktime: function(contacts){
        //console.log(device);
        Ext.Ajax.request({
                            url:  ttapp.config.Config.getBaseURL() + '/are-on-network/',
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json'},
                            disableCaching: false,
                            jsonData: {
                                "contacts" : contacts
                            },

                            success: function(response) {
                                var cStore = Ext.getStore('phonecontacts'),
                                                cModel;

                                // remove all existing contacts
                                cStore.removeAll(true);
debugger;
                                Ext.Array.each(Ext.JSON.decode(response.responseText), function(item, index, contacts_itself){
                                    var lname = item.first_name,
                                        fname = item.last_name,
                                        pnumber = item.phone_number,
                                        onTinkTime = item.on_tinktime;

                                // item.name.familyName, item.name.givenName, item.phoneNumbers[0].value
                                    cModel = Ext.create('ttapp.model.Contact', {
                                            id: index,
                                            first_name: fname,
                                            last_name: lname,
                                            on_tinktime: onTinkTime,
                                            phone_number: pnumber
                                        });
                                    cStore.add(cModel);    
                                    cStore.sync();
                                });
                            },
                                failure: function(response, opts) {
                                    Ext.Msg.alert('Is on netwk', "error", Ext.emptyFn);           
                                    
                                }
                        });
    },
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
                        x = ttapp.util.ContactsCleaner.cleaner(contacts, 'ios');
                        ttapp.util.ContactsProxy.areOnTinktime(x);
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
        else{
            //populate static test values
            var contacts = [
            { 
                'id' : 1,
                'first_name' : 'Nikhil',
                'last_name' : 'Shikarkhane',
                'on_tinktime' : true,
                'phone_number' : '+46705438947'
            },
            { 
                'id' : 2,
                'first_name' : 'Monica',
                'last_name' : 'Sylvander',
                'on_tinktime' : true,
                'phone_number' : '+0701234567'
            },
            { 
                'id' : 3,
                'first_name' : 'Justyna',
                'last_name' : 'Mach',
                'on_tinktime' : false,
                'phone_number' : '+0707654321'
            },
            { 
                'id' : 4,
                'first_name' : '51512',
                'last_name' : '',
                'on_tinktime' : true,
                'phone_number' : '+07051512'
            },
            { 
                'id' : 5,
                'first_name' : '5050',
                'last_name' : '',
                'on_tinktime' : true,
                'phone_number' : '+5050'
            }

        ]
            x = ttapp.util.ContactsCleaner.cleaner(contacts, 'default');
            this.areOnTinktime(x);
            
        }
    }
});

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