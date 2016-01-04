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
    removeExtraZeroPrefixAfterDialCode: function( phn){
        // make phn = +460707547878 into +46707547878, provided that +46 is a country code
        s = Ext.application.dict_dial_codes;
debugger;
        var f = -1,
            f2 = phn.substring(0,2),
            f3 = phn.substring(0,3),
            f4 = phn.substring(0,4),
            f5 = phn.substring(0,5),
            f6 = phn.substring(0,6);

        if (s[f2]){f = 2;}
        else if(s[f3]){f = 3;}
        else if(s[f4]){f = 4;}
        else if(s[f5]){f = 5;}
        else if(s[f6]){f = 6;}
        else{ f = -1};

        if ( f > 0){
            if(phn.charAt(f) == '0'){
                return phn.substring(0,f) + phn.substring(f+1);
            }
        }

        return phn;
    },
    cleanPhoneNumber: function(dialcode, n) {
        var f = 0;

        n = this.removeExtraZeroPrefixAfterDialCode(n);

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


        Ext.application.dict_dial_codes = ttapp.util.Common.makeDictOfCountryDialCodes();

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
