Ext.define('ttapp.util.ContactsCleaner', {
    singleton: true,
    encode_utf8: function( s ) {
      return unescape( encodeURIComponent( s ) );
    },
    decode_utf8: function( s ) {
      return decodeURIComponent( escape( s ) );
    },
    cleanPhoneNumber: function(n){
        var f = 0;
        
        if( n.charAt(0) == '+'){ 
            f = 1;
        }
        
        n = n.replace(/\D/g,'');
        
        if (n.match(/[0-9]+/)){
            if ( f == 1){
                return '+'+ n;
            }
        }
        else{
            return null;    
        }        
    },
    deviceSpecificFormat: function(i){
        if( Ext.os.is.Other){
            return [i.first_name, i.last_name, i.phoneNumbers[0].value]
        }
        if(Ext.os.is.iOS){
            if (i.phoneNumbers){
                if(i.phoneNumbers.length > 0){
                    return [i.name.givenName, i.name.familyName, i.phoneNumbers[0].value];    
                }
            }
        }
        if(Ext.os.is.Android){
            if (i.phoneNumbers){
                if(i.phoneNumbers.length > 0){
                    return [i.name.givenName, i.name.familyName, i.phoneNumbers[0].value];    
                }
            }
        }
        return null;
    },
    process: function(contacts){
        var c = {};
        var c_array = [];

        //Ext.Array.each(contacts, function(item, index, contacts_itself){
        for (var i = 0, l = contacts.length; i < l; i++) {
            ds = ttapp.util.ContactsCleaner.deviceSpecificFormat( contacts[i]);
            if(ds){
                var phn = ttapp.util.ContactsCleaner.cleanPhoneNumber(ds[2]);
                if (phn){
                    c = {
                        "first_name": ttapp.util.ContactsCleaner.encode_utf8(ds[0]), 
                        "last_name" : ttapp.util.ContactsCleaner.encode_utf8(ds[1]), 
                        "phone_number" : phn
                    };
                    c_array.push(c);                                    
                }
            }
        };
    return c_array;
    }
});