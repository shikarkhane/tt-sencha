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
    deviceSpecificFormat: function(d, i){
        if( d == 'default'){
            return [i.first_name, i.last_name, i.phoneNumbers[0].value]
        }
        if(d == 'ios'){
            if (i.phoneNumbers){
                if(i.phoneNumbers.length > 0){
                    return [i.name.givenName, i.name.familyName, i.phoneNumbers[0].value];    
                }
            }
        }
        return null;
    },
    process: function(contacts, device){
        var c = {};
        var c_array = [];

        Ext.Array.each(contacts, function(item, index, contacts_itself){
            ds = ttapp.util.ContactsCleaner.deviceSpecificFormat( device, item);
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
            });
    return c_array;
    }
});