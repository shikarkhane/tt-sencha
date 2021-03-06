Ext.define('ttapp.util.ContactsProxy', {
    singleton: true,
    requires: ['Ext.device.Contacts', 'ttapp.util.ContactsCleaner'],

    areOnTinktime: function(cStore, contacts) {
        Ext.getStore('profilestore').getPhoneNumber(function(num){
            Ext.Ajax.request({
                url: ttapp.config.Config.getBaseURL() + '/are-on-network-plus-timesplit/' + num + '/',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                disableCaching: false,
                jsonData: {
                    "contacts": contacts
                },
                success: function(response) {

                    // remove all existing contacts
                    cStore.removeAll(true);

                    var json = Ext.JSON.decode(response.responseText);

                    for (var i = 0; i < json.length; i++) {
                        var item = json[i];

                        var lname = ttapp.util.ContactsCleaner.decode_utf8(item.last_name),
                            fname = ttapp.util.ContactsCleaner.decode_utf8(item.first_name),
                            pnumber = item.phone_number,
                            pType = item.phone_type,
                            onTinkTime = item.on_tinktime,
                            time_split = item.time_split,
                            profile_url = item.profile_url;

                        if(Ext.isEmpty(fname) || fname === 'undefined'){
                            fname = null;
                        }
                        if(Ext.isEmpty(lname) || lname === 'undefined'){
                            lname = null;
                        }

                        if (Ext.isEmpty(fname) && Ext.isEmpty(lname)) {
                            continue;
                        }

                        cStore.add({
                            id: i,
                            first_name: fname,
                            last_name: lname,
                            on_tinktime: onTinkTime,
                            phone_type: pType,
                            phone_number: pnumber,
                            time_split: time_split,
                            profile_url: profile_url /*ttapp.config.Config.getBaseURL()+'/static/img/user_profile/'+pnumber+'.jpeg'*/

                        });
                    }

                    cStore.sync();

                    cStore._processed = true;
                    cStore.fireEvent('processed', this);
                    //ttapp.app.getController('PhoneContact').showCircles();
                },
                failure: function(response, opts) {
                    Ext.Msg.alert('Is on netwk', "error", Ext.emptyFn);
                }
            });
        });

    },
    process: function(cStore) {

        console.log('SLOWNESS-CONTACTS: contacts-process starts');
        console.log('SLOWNESS-CONTACTS: contacts-process starts: ' + Ext.os.deviceType);
        Ext.Viewport.mask({
            xtype: 'loadmask',
            html: '<img src="resources/images/green-loader.png" alt="loader">'
        });
        if (Ext.os.deviceType === 'Phone') {
            navigator.contactsPhoneNumbers.list(function(contacts) {

                console.log('SLOWNESS-CONTACTS: received contacts');

                Ext.Viewport.setMasked(false);

                console.log('ONLYPHONENUMBER: ' + contacts.length + ' contacts found');

                if (contacts.length > 0) {
                    x = ttapp.util.ContactsCleaner.process(contacts);

                    console.log('SLOWNESS-CONTACTS: contacts cleaned');

                    ttapp.util.ContactsProxy.areOnTinktime(cStore, x);

                    console.log('SLOWNESS-CONTACTS: are on tinktime');
                }
            }, function(error) {
                Ext.Viewport.setMasked(false);
                console.log(error);
            });
        } else {
            // test contacts only for desktop testing
            /*var contacts = [{
                'id': 1,
                'name': {
                    'givenName': 'nike',
                    'familyName': 'shikari'
                },
                'phoneNumbers': [{
                    'value': '+460705438947'
                }],
                'first_name': 'Eddåäöielksjdflkdsfkljsdlfkjsdlkfj',
                'last_name': 'Huang',
                'on_tinktime': true,
                'phone_type': 'mobile',
                'phone_number': '+46700907802',
                'photo': ttapp.config.Config.getBaseURL()+'/static/img/user_profile/+46705438947.jpeg'
            }];*/
            var contacts = [];
            x = ttapp.util.ContactsCleaner.process(contacts, 'default');
            this.areOnTinktime(cStore, x);
            Ext.Viewport.setMasked(false);
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
        data: []
        //sort the store using the lastname field
        //sorters: 'first_name'/*'lastName'*/,

        //group the store using the lastName field
        //groupField: 'lastName'
    },
    getContactObject: function(phoneNumber){
        var i = this.find('phone_number', phoneNumber);
        if (i === -1) {
            // if user doesnt exist, make a dummy object, to that reply to a unknown phonenumber works
            var o = {};
            o['data'] = {};
            o['data']['phone_number'] = phoneNumber;
            o['data']['first_name'] = phoneNumber;
            o['data']['last_name'] = '';
            o['data']['on_tinktime'] = true;
            return o;
        } else {
            return this.getAt(i);
        }
    },
    getFirstLastName: function(phoneNumber) {
        var i = this.find('phone_number', phoneNumber);
        if (i === -1) {
            return phoneNumber;
        } else {
            var fn = this.getAt(i).get('first_name'),
                ln = this.getAt(i).get('last_name'),
                fullname = '';

            if (Ext.isString(fn)) {
                fullname = fn + ' ';
            }
            if (Ext.isString(ln)) {
                fullname = fullname + ln;
            }

            return fullname;
        }
    },
    isOnTinkTime: function(phoneNumber) {
        var result = false;
        var i = this.find('phone_number', phoneNumber);

        if (i > -1) {
            result = this.getAt(i).get('on_tinktime');
        }
        return result;
    },
    getUserImage: function(phoneNumber) {
        var i = this.find('phone_number', phoneNumber);

        if(i > -1) {
            return this.getAt(i).get('profile_url');
        } else {
            return null;
        }
    }
});
