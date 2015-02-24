Ext.define('ttapp.util.ContactsProxy', {
    singleton: true,
    requires: ['Ext.device.Contacts', 'ttapp.util.ContactsCleaner', 'ttapp.store.Contacts'],
    areOnTinktime: function(cStore, contacts){
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
                                var cModel;

                                // remove all existing contacts
                                cStore.removeAll(true);
                                Ext.Array.each(Ext.JSON.decode(response.responseText), function(item, index, contacts_itself){
                                    var lname = item.last_name,
                                        fname = item.first_name,
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
                        //Ext.Msg.alert('Contacts', contacts.length, Ext.emptyFn);   
                        x = ttapp.util.ContactsCleaner.process(contacts, 'ios');
                        //Ext.Msg.alert('Count', x.length, Ext.emptyFn);   
                        ttapp.util.ContactsProxy.areOnTinktime(Ext.getStore('phonecontacts'), x);
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
                'phoneNumbers': [{'value': '0101010101'}],
                'first_name' : 'Nikhil',
                'last_name' : 'Shikarkhane',
                'on_tinktime' : true,
                'phone_number' : '+46705438947'
            },
            { 
                'id' : 2,
                'phoneNumbers': [],
                'first_name' : 'Monica',
                'last_name' : 'Sylvander',
                'on_tinktime' : true,
                'phone_number' : '+0701234567'
            }
        ]
            x = ttapp.util.ContactsCleaner.process(contacts, 'default');
            this.areOnTinktime(Ext.getStore('phonecontacts'), x);
            
        }
    }
});