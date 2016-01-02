Ext.define('ttapp.util.ContactsCleaner', {
    singleton: true,
    encode_utf8: function(s) {
        if (s === null){ return null;}
        return unescape(encodeURIComponent(s));
    },
    decode_utf8: function(s) {
        if (s === null){ return null;}
        return decodeURIComponent(escape(s));
    },
    cleanPhoneNumber: function(dialcode, n) {
        var f = 0;

        if (n.charAt(0) == '+') {
            f = 1;
        }

        n = n.replace(/\D/g, '');

        if (n.match(/[0-9]+/)) {
            if (f == 1) {
                return '+' + n;
            } else if (dialcode) {
                if (n.charAt(0) == '0') {
                    n = n.substring(1); //remove the leading zero
                }
                return dialcode + n;
            }
            else {
                return n;
            }
        } else {
            return n;
        }
    },
    deviceSpecificFormat: function(i) {
        if (Ext.os.is.Desktop) {
            return [[i.first_name, i.last_name, i.phoneNumbers[0].value]];
        } else {
            if (i.phoneNumbers) {
                if (i.phoneNumbers.length > 0) {
                    var results = [];
                    for (var j = 0; j < i.phoneNumbers.length; j++) {
                        results.push([i.firstName, i.lastName, i.phoneNumbers[j].number, i.phoneNumbers[j].type]);
                    }
                    return results;
                }
            }
        }
        return null;
    },
    process: function(contacts) {
        var c = {},
            c_array = [],
            dc = '+46',
            dc_based_on_ip = Ext.getStore('ipinfostore').getDialCode(),
            dc_based_on_profile;

        Ext.getStore('profilestore').getDialCode(function(dc){
            dc_based_on_profile = dc;
        });

        if ( dc_based_on_profile){
            dc = dc_based_on_profile;
        }
        else if(dc_based_on_ip){
            dc = dc_based_on_ip;
        }
        else{
            dc = '+46';
        }

        //Ext.Array.each(contacts, function(item, index, contacts_itself){
        for (var i = 0; i < contacts.length; i++) {
            ds = ttapp.util.ContactsCleaner.deviceSpecificFormat(contacts[i]);

            if (ds) {
                for (var j = 0; j < ds.length; j++) {
                    var value = ds[j],
                        phn = ttapp.util.ContactsCleaner.cleanPhoneNumber(dc, value[2]);

                    if (phn) {
                        c = {
                            "first_name": ttapp.util.ContactsCleaner.encode_utf8(value[0]),
                            "last_name": ttapp.util.ContactsCleaner.encode_utf8(value[1]),
                            "phone_number": phn,
                            "phone_type": (value[3] && value[3] !== "") ? value[3] : null
                        };
                        c_array.push(c);
                    }
                }
            }
        }
        return c_array;
    }
});
