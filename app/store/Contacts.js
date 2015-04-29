Ext.define('ttapp.util.ContactsProxy', {
    singleton: true,
    requires: ['Ext.device.Contacts', 'ttapp.util.ContactsCleaner'],
    areOnTinktime: function(cStore, contacts){
        Ext.Ajax.request({
            url:  ttapp.config.Config.getBaseURL() + '/are-on-network/',
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            disableCaching: false,
            jsonData: {
                "contacts" : contacts
            },

            success: function(response) {
                var cModel;

                // remove all existing contacts
                cStore.removeAll(true);
                Ext.Array.each(Ext.JSON.decode(response.responseText), function(item, index, contacts_itself){
                    var lname = ttapp.util.ContactsCleaner.decode_utf8(item.last_name),
                        fname = ttapp.util.ContactsCleaner.decode_utf8(item.first_name),
                        pnumber = item.phone_number,
                        pType = item.phone_type,
                        onTinkTime = item.on_tinktime;

                // item.name.familyName, item.name.givenName, item.phoneNumbers[0].value
                    cModel = Ext.create('ttapp.model.Contact', {
                            id: index,
                            first_name: fname,
                            last_name: lname,
                            on_tinktime: onTinkTime,
                            phone_type: pType,
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
    process: function(cStore) {
        if (Ext.os.deviceType == 'Phone'){
            var opts = new ContactFindOptions();
            opts.filter = "";
            opts.multiple = true;
            var contactsConfig = {        
                options: opts,
                fields: ["name", "phoneNumbers"],
                success: function(contacts){
                    
                    if ( contacts.length > 0){
                        x = ttapp.util.ContactsCleaner.process(contacts);
                        ttapp.util.ContactsProxy.areOnTinktime(cStore, x);
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
                'name': { 'givenName': 'nike', 'familyName': 'shikari'},
                'phoneNumbers': [{'value': '+46705438947'}],
                'first_name' : 'Eddåäöie',
                'last_name' : 'Huang',
                'on_tinktime' : true,
                'phone_type'  : 'mobile',
                'phone_number' : '+46700907802'
            },
            { 
                'id' : 2,
                'phoneNumbers': [{'value': '+46700907802'}],
                'first_name' : 'Edith',
                'last_name' : 'Jones',
                'on_tinktime' : true,
                'phone_type'  : 'home',
                'phone_number' : '(514) 316-4528'
            },
            { 
                'id' : 3,
                'name': { 'givenName': 'nike', 'familyName': 'shikari'},
                'phoneNumbers': [{'value': '0101010101'}],
                'first_name' : 'Elijah',
                'last_name' : 'Talinger',
                'on_tinktime' : true,
                'phone_type'  : 'mobile',
                'phone_number' : '(235) 453-1258'
            },{ 
                'id' : 4,
                'name': { 'givenName': 'nike', 'familyName': 'shikari'},
                'phoneNumbers': [{'value': '+0101010101'}],
                'first_name' : 'Emanuel',
                'last_name' : 'Lindberg',
                'on_tinktime' : false,
                'phone_type'  : 'work',
                'phone_number' : '(978) 165-3214'
            }
        ];
        
            x = ttapp.util.ContactsCleaner.process(contacts, 'default');
            this.areOnTinktime(cStore, x);
            
        }
    }
});
Ext.define('ttapp.store.Contacts', {
    extend: 'Ext.data.Store',
    //requires: [ 'Ext.data.proxy.LocalStorage'],
    config: {
        storeId: 'phonecontacts',
        model: 'ttapp.model.Contact',
        // proxy: {
        //     type: 'localstorage',
        //     id: 'contactstoreproxy'
        // },
        data:[{ 
                'id' : 1,
                'name': { 'givenName': 'nike', 'familyName': 'shikari'},
                'phoneNumbers': [{'value': '0101010101'}],
                'first_name' : 'Eddie',
                'last_name' : 'Huang',
                'on_tinktime' : true,
                'phone_type'  : 'mobile',
                'phone_number' : '+46700907802'
            },
            { 
                'id' : 2,
                'phoneNumbers': [{'value': '0101010131'}],
                'first_name' : 'Edith',
                'last_name' : 'Jones',
                'on_tinktime' : true,
                'phone_type'  : 'home',
                'phone_number' : '(514) 316-4528'
            },
            { 
                'id' : 3,
                'name': { 'givenName': 'nike', 'familyName': 'shikari'},
                'phoneNumbers': [{'value': '0101010101'}],
                'first_name' : 'Elijah',
                'last_name' : 'Talinger',
                'on_tinktime' : true,
                'phone_type'  : 'mobile',
                'phone_number' : '(235) 453-1258'
            },{ 
                'id' : 4,
                'name': { 'givenName': 'nike', 'familyName': 'shikari'},
                'phoneNumbers': [{'value': '0101010101'}],
                'first_name' : 'Emanuel',
                'last_name' : 'Lindberg',
                'on_tinktime' : false,
                'phone_type'  : 'work',
                'phone_number' : '(978) 165-3214'
            }],
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