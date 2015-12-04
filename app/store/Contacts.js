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
                    var cModel;

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

                        if (fname == "" && lname == "") {
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
                            profile_url: profile_url/*ttapp.config.Config.getBaseURL()+'/static/img/user_profile/'+pnumber+'.jpeg'*/
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
        /*old code*/
        /*Ext.Ajax.request({
            url: ttapp.config.Config.getBaseURL() + '/are-on-network/',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            disableCaching: false,
            jsonData: {
                "contacts": contacts
            },
            success: function(response) {
                var cModel;

                // remove all existing contacts
                cStore.removeAll(true);

                var json = Ext.JSON.decode(response.responseText);

                for (var i = 0; i < json.length; i++) {
                    var item = json[i];

                    var lname = ttapp.util.ContactsCleaner.decode_utf8(item.last_name),
                        fname = ttapp.util.ContactsCleaner.decode_utf8(item.first_name),
                        pnumber = item.phone_number,
                        pType = item.phone_type,
                        onTinkTime = item.on_tinktime;

                    cStore.add({
                        id: i,
                        first_name: fname,
                        last_name: lname,
                        on_tinktime: onTinkTime,
                        phone_type: pType,
                        phone_number: pnumber
                    });
                }

                cStore.sync();

                cStore._processed = true;
                cStore.fireEvent('processed', this);
            },
            failure: function(response, opts) {
                Ext.Msg.alert('Is on netwk', "error", Ext.emptyFn);
            }
        });*/
    },
    process: function(cStore) {
        console.log('SLOWNESS-CONTACTS: contacts-process starts');
       /* Ext.Viewport.mask({
            xtype: 'loadmask',
            html: '<img src="resources/images/green-loader.png" alt="loader">'
        });*/
        if (Ext.os.deviceType == 'Phone') {
            var opts = new ContactFindOptions();
            opts.filter = "";
            opts.multiple = true;
            var contactsConfig = {
                options: opts,
                fields: ["name", "phoneNumbers"],
                success: function(contacts) {
                    console.log('SLOWNESS-CONTACTS: received contacts');
                    // Ext.Viewport.setMasked(false);
                    console.log('SLOWNESS-CONTACTS: remove mask');
                    if (contacts.length > 0) {
                        x = ttapp.util.ContactsCleaner.process(contacts);
                        console.log('SLOWNESS-CONTACTS: contacts cleaned');
                        ttapp.util.ContactsProxy.areOnTinktime(cStore, x);
                        console.log('SLOWNESS-CONTACTS: are on tinktime');
                    }
                },
                failure: function(context) {
                    Ext.Viewport.setMasked(false);
                    Ext.Msg.alert('Change privacy!', 'Allow tinktime in settings > privacy > contacts', Ext.emptyFn);
                },
                scope: this,
                includeImages: true
            };
            console.log('SLOWNESS-CONTACTS: get contacts');
            Ext.device.Contacts.getContacts(contactsConfig);
        } else {
            //populate static test values
            if (Ext.os.deviceType != 'Phone') {
                var contacts = [{
                    'id': 1,
                    'name': {
                        'givenName': 'nike',
                        'familyName': 'shikari'
                    },
                    'phoneNumbers': [{
                        'value': '+46705438947'
                    }],
                    'first_name': 'Eddåäöielksjdflkdsfkljsdlfkjsdlkfj',
                    'last_name': 'Huang',
                    'on_tinktime': true,
                    'phone_type': 'mobile',
                    'phone_number': '+46700907802',
                    'photo': ttapp.config.Config.getBaseURL()+'/static/img/user_profile/+46705438947.jpeg'
                }, {
                    'id': 2,
                    'phoneNumbers': [{
                        'value': '+46700907802'
                    }],
                    'first_name': 'Edith',
                    'last_name': 'Jones',
                    'on_tinktime': true,
                    'phone_type': 'home',
                    'phone_number': '(514) 316-4528',
                    'photo': ''
                }, {
                    'id': 3,
                    'name': {
                        'givenName': 'nike',
                        'familyName': 'shikari'
                    },
                    'phoneNumbers': [{
                        'value': '(235) 453-1258'
                    }],
                    'first_name': 'Nikhil',
                    'last_name': 'Talinger',
                    'on_tinktime': true,
                    'phone_type': 'mobile',
                    'phone_number': '(235) 453-1258',
                    'photo': ''
                }, {
                    'id': 4,
                    'name': {
                        'givenName': 'nike',
                        'familyName': 'shikari'
                    },
                    'phoneNumbers': [{
                        'value': '+0101010101'
                    }],
                    'first_name': 'Emanuel',
                    'last_name': 'Lindberg',
                    'on_tinktime': true,
                    'phone_type': 'work',
                    'phone_number': '(978) 165-3214',
                    'photo': ''
                }, {
                    'id': 5,
                    'name': {
                        'givenName': 'nike',
                        'familyName': 'shikari'
                    },
                    'phoneNumbers': [{
                        'value': '+919610614914'
                    }],
                    'first_name': 'Rajesh',
                    'last_name': 'Gehlawat',
                    'on_tinktime': false,
                    'phone_type': 'work',
                    'phone_number': '+919610614914',
                    'photo': ''
                }, {
                    'id': 6,
                    'name': {
                        'givenName': 'nike',
                        'familyName': 'shikari'
                    },
                    'phoneNumbers': [{
                        'value': '+919352427971'
                    }],
                    'first_name': 'Rishi',
                    'last_name': 'Khangwal',
                    'on_tinktime': false,
                    'phone_type': 'work',
                    'phone_number': '+919352427971',
                    'photo': ''
                }, {
                    'id': 7,
                    'name': {
                        'givenName': 'nike',
                        'familyName': 'shikari'
                    },
                    'phoneNumbers': [{
                        'value': '+919549194555'
                    }],
                    'first_name': 'Maneesh',
                    'last_name': 'Jangid',
                    'on_tinktime': false,
                    'phone_type': 'work',
                    'phone_number': '+919549194555',
                    'photo': ''
                }];
            }

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
        data: [{
            'id': 1,
            'name': {
                'givenName': 'nike',
                'familyName': 'shikari'
            },
            'phoneNumbers': [{
                'value': '0101010101'
            }],
            'first_name': 'Eddie',
            'last_name': 'Huang',
            'on_tinktime': true,
            'phone_type': 'mobile',
            'phone_number': '+46700907802'
        }, {
            'id': 2,
            'phoneNumbers': [{
                'value': '0101010131'
            }],
            'first_name': 'Edith',
            'last_name': 'Jones',
            'on_tinktime': true,
            'phone_type': 'home',
            'phone_number': '(514) 316-4528'
        }, {
            'id': 3,
            'name': {
                'givenName': 'nike',
                'familyName': 'shikari'
            },
            'phoneNumbers': [{
                'value': '0101010101'
            }],
            'first_name': 'Nikhil',
            'last_name': 'Talinger',
            'on_tinktime': true,
            'phone_type': 'mobile',
            'phone_number': '(235) 453-1258'
        }, {
            'id': 4,
            'name': {
                'givenName': 'nike',
                'familyName': 'shikari'
            },
            'phoneNumbers': [{
                'value': '0101010101'
            }],
            'first_name': 'Emanuel',
            'last_name': 'Lindberg',
            'on_tinktime': false,
            'phone_type': 'work',
            'phone_number': '(978) 165-3214'
        }, {
            'id': 5,
            'name': {
                'givenName': 'nike',
                'familyName': 'shikari'
            },
            'phoneNumbers': [{
                'value': '0101010101'
            }],
            'first_name': 'Rajesh',
            'last_name': 'Gehlawat',
            'on_tinktime': false,
            'phone_type': 'work',
            'phone_number': '+919610614914'
        }, {
            'id': 6,
            'name': {
                'givenName': 'nike',
                'familyName': 'shikari'
            },
            'phoneNumbers': [{
                'value': '0101010101'
            }],
            'first_name': 'Rishi',
            'last_name': 'Ganagwal',
            'on_tinktime': false,
            'phone_type': 'work',
            'phone_number': '+919352427971'
        }, {
            'id': 7,
            'name': {
                'givenName': 'nike',
                'familyName': 'shikari'
            },
            'phoneNumbers': [{
                'value': '0101010101'
            }],
            'first_name': 'Maneesh',
            'last_name': 'Jangid',
            'on_tinktime': false,
            'phone_type': 'work',
            'phone_number': '+919549194555'
        }],
        //sort the store using the lastname field
        //sorters: 'first_name'/*'lastName'*/,

        //group the store using the lastName field
        //groupField: 'lastName'
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
