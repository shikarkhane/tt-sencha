Ext.define('ttapp.util.Common', {
    singleton: true,
    existsUnreadMessages: function(callback){
        Ext.getStore('profilestore').getPhoneNumber(function(num){
            Ext.Ajax.request({
                url: ttapp.config.Config.getBaseURL() + '/groupedfeed/' + num + '/',
                method: 'GET',
                disableCaching: false,
                success: function(response) {
                    var json = Ext.JSON.decode(response.responseText);
                    if ( json.groups.length > 0){
                        //since groupfeed is sorted by unread first, check first element only
                        if (json.groups[0].unread > 0){
                            // goto tinkbox
                            callback(true);
                        }
                        else{
                            callback(false);
                        }
                    }
                    else{
                        callback(false);
                    }
                }
                ,
                failure: function(error) {
                    Ext.Msg.alert('Error', 'Unable to check if unread msgs exists');
                    callback(false);
                }
            });
        });
    },
    askEULAPermission: function(){
        Ext.getStore('profilestore').hasUserAllowedEULAContactsRead(function(success) {
            if(! success) {
                //ask for user confirmation to send sms
                Ext.Msg.confirm(
                    "Allow access to contacts?",
                    "Tinktime would like to access your contacts. Your contacts will be transmitted to our servers and used to " +
                    "find your friends. Do you accept?",
                    function (buttonId) {
                        if (buttonId === 'yes') {
                            Ext.getStore('profilestore').userAllowedEULAContactsRead();
                            // get contacts from device
                            ttapp.util.ContactsProxy.process(Ext.getStore('phonecontacts'));
                        }
                    }, this);
            }
        });
    },
    askPushNotificationPermission: function(){
        Ext.getStore('profilestore').hasUserAllowedPushNotification(function(success) {
            if(! success) {

                Ext.Msg.confirm(
                    "Allow notifications?",
                    "We can buzz you when you receive a new tink. Allow alerts?",
                    function (buttonId) {
                        if (buttonId === 'yes') {
                            Ext.getStore('profilestore').userAllowedPushNotification();

                            // refresh push token
                            ttapp.util.Push.takeUserPermissionForPushNotify();
                            console.log('SLOWNESS: take permission for push');
                        }
                    }, this);
            }
        });
    },
    destroyComponentsIfExists: function( array_of_itemIds){
    for(i=0; i<array_of_itemIds.length; i++){
        try{
            Ext.ComponentQuery.query('#'+ array_of_itemIds[i])[0].destroy();
        }
        catch(e){
            console.log(e);
        }
    }
    },
    isUserVerifiedOnServer: function(callback) {
        // if user is not verified on server, clear local profile and make him authenticate again
        Ext.getStore('profilestore').getPhoneNumber(function(user) {
            if (!user) {
                if (callback) {
                    callback(false);
                }
                return false;
            }

            Ext.Ajax.request({
                url: ttapp.config.Config.getBaseURL() + '/is-user-verified/' + user + '/',
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                disableCaching: false,
                success: function(response) {
                    var json = Ext.JSON.decode(response.responseText);
                    if (!json.status) {
                        var ps = Ext.getStore('profilestore');
                        ps.getProxy().clear();
                        ps.data.clear();
                        ps.sync();

                        if (callback) {
                            callback(false);
                        }
                    }
                    else {
                        if (callback) {
                            callback(true);
                        }
                    }
                }
            });
        });
    },
    makeDictOfCountryDialCodes: function(){
        var countries = this.setDialCode('123');
        var finalCountries = {};
        for(i=0; i<countries.length; i++) {
            finalCountries[countries[i].dial_code] = countries[i].code;
        }
        return finalCountries;
    },
    setDialCode: function(params) {
        var c = [{
            "name": "Afghanistan",
            "dial_code": "+93",
            "code": "AF"
        }, {
            "name": "Albania",
            "dial_code": "+355",
            "code": "AL"
        }, {
            "name": "Algeria",
            "dial_code": "+213",
            "code": "DZ"
        }, {
            "name": "AmericanSamoa",
            "dial_code": "+1 684",
            "code": "AS"
        }, {
            "name": "Andorra",
            "dial_code": "+376",
            "code": "AD"
        }, {
            "name": "Angola",
            "dial_code": "+244",
            "code": "AO"
        }, {
            "name": "Anguilla",
            "dial_code": "+1 264",
            "code": "AI"
        }, {
            "name": "Antarctica",
            "dial_code": "+672",
            "code": "AQ"
        }, {
            "name": "Antigua and Barbuda",
            "dial_code": "+1268",
            "code": "AG"
        }, {
            "name": "Argentina",
            "dial_code": "+54",
            "code": "AR"
        }, {
            "name": "Armenia",
            "dial_code": "+374",
            "code": "AM"
        }, {
            "name": "Aruba",
            "dial_code": "+297",
            "code": "AW"
        }, {
            "name": "Australia",
            "dial_code": "+61",
            "code": "AU"
        }, {
            "name": "Austria",
            "dial_code": "+43",
            "code": "AT"
        }, {
            "name": "Azerbaijan",
            "dial_code": "+994",
            "code": "AZ"
        }, {
            "name": "Bahamas",
            "dial_code": "+1 242",
            "code": "BS"
        }, {
            "name": "Bahrain",
            "dial_code": "+973",
            "code": "BH"
        }, {
            "name": "Bangladesh",
            "dial_code": "+880",
            "code": "BD"
        }, {
            "name": "Barbados",
            "dial_code": "+1 246",
            "code": "BB"
        }, {
            "name": "Belarus",
            "dial_code": "+375",
            "code": "BY"
        }, {
            "name": "Belgium",
            "dial_code": "+32",
            "code": "BE"
        }, {
            "name": "Belize",
            "dial_code": "+501",
            "code": "BZ"
        }, {
            "name": "Benin",
            "dial_code": "+229",
            "code": "BJ"
        }, {
            "name": "Bermuda",
            "dial_code": "+1 441",
            "code": "BM"
        }, {
            "name": "Bhutan",
            "dial_code": "+975",
            "code": "BT"
        }, {
            "name": "Bolivia, Plurinational State of",
            "dial_code": "+591",
            "code": "BO"
        }, {
            "name": "Bosnia and Herzegovina",
            "dial_code": "+387",
            "code": "BA"
        }, {
            "name": "Botswana",
            "dial_code": "+267",
            "code": "BW"
        }, {
            "name": "Brazil",
            "dial_code": "+55",
            "code": "BR"
        }, {
            "name": "British Indian Ocean Territory",
            "dial_code": "+246",
            "code": "IO"
        }, {
            "name": "Brunei Darussalam",
            "dial_code": "+673",
            "code": "BN"
        }, {
            "name": "Bulgaria",
            "dial_code": "+359",
            "code": "BG"
        }, {
            "name": "Burkina Faso",
            "dial_code": "+226",
            "code": "BF"
        }, {
            "name": "Burundi",
            "dial_code": "+257",
            "code": "BI"
        }, {
            "name": "Cambodia",
            "dial_code": "+855",
            "code": "KH"
        }, {
            "name": "Cameroon",
            "dial_code": "+237",
            "code": "CM"
        }, {
            "name": "Canada",
            "dial_code": "+1",
            "code": "CA"
        }, {
            "name": "Cape Verde",
            "dial_code": "+238",
            "code": "CV"
        }, {
            "name": "Cayman Islands",
            "dial_code": "+ 345",
            "code": "KY"
        }, {
            "name": "Central African Republic",
            "dial_code": "+236",
            "code": "CF"
        }, {
            "name": "Chad",
            "dial_code": "+235",
            "code": "TD"
        }, {
            "name": "Chile",
            "dial_code": "+56",
            "code": "CL"
        }, {
            "name": "China",
            "dial_code": "+86",
            "code": "CN"
        }, {
            "name": "Christmas Island",
            "dial_code": "+61",
            "code": "CX"
        }, {
            "name": "Cocos (Keeling) Islands",
            "dial_code": "+61",
            "code": "CC"
        }, {
            "name": "Colombia",
            "dial_code": "+57",
            "code": "CO"
        }, {
            "name": "Comoros",
            "dial_code": "+269",
            "code": "KM"
        }, {
            "name": "Congo",
            "dial_code": "+242",
            "code": "CG"
        }, {
            "name": "Congo, The Democratic Republic of the",
            "dial_code": "+243",
            "code": "CD"
        }, {
            "name": "Cook Islands",
            "dial_code": "+682",
            "code": "CK"
        }, {
            "name": "Costa Rica",
            "dial_code": "+506",
            "code": "CR"
        }, {
            "name": "Cote d'Ivoire",
            "dial_code": "+225",
            "code": "CI"
        }, {
            "name": "Croatia",
            "dial_code": "+385",
            "code": "HR"
        }, {
            "name": "Cuba",
            "dial_code": "+53",
            "code": "CU"
        }, {
            "name": "Cyprus",
            "dial_code": "+357",
            "code": "CY"
        }, {
            "name": "Czech Republic",
            "dial_code": "+420",
            "code": "CZ"
        }, {
            "name": "Denmark",
            "dial_code": "+45",
            "code": "DK"
        }, {
            "name": "Djibouti",
            "dial_code": "+253",
            "code": "DJ"
        }, {
            "name": "Dominica",
            "dial_code": "+1 767",
            "code": "DM"
        }, {
            "name": "Dominican Republic",
            "dial_code": "+1 849",
            "code": "DO"
        }, {
            "name": "Ecuador",
            "dial_code": "+593",
            "code": "EC"
        }, {
            "name": "Egypt",
            "dial_code": "+20",
            "code": "EG"
        }, {
            "name": "El Salvador",
            "dial_code": "+503",
            "code": "SV"
        }, {
            "name": "Equatorial Guinea",
            "dial_code": "+240",
            "code": "GQ"
        }, {
            "name": "Eritrea",
            "dial_code": "+291",
            "code": "ER"
        }, {
            "name": "Estonia",
            "dial_code": "+372",
            "code": "EE"
        }, {
            "name": "Ethiopia",
            "dial_code": "+251",
            "code": "ET"
        }, {
            "name": "Falkland Islands (Malvinas)",
            "dial_code": "+500",
            "code": "FK"
        }, {
            "name": "Faroe Islands",
            "dial_code": "+298",
            "code": "FO"
        }, {
            "name": "Fiji",
            "dial_code": "+679",
            "code": "FJ"
        }, {
            "name": "Finland",
            "dial_code": "+358",
            "code": "FI"
        }, {
            "name": "France",
            "dial_code": "+33",
            "code": "FR"
        }, {
            "name": "French Guiana",
            "dial_code": "+594",
            "code": "GF"
        }, {
            "name": "French Polynesia",
            "dial_code": "+689",
            "code": "PF"
        }, {
            "name": "Gabon",
            "dial_code": "+241",
            "code": "GA"
        }, {
            "name": "Gambia",
            "dial_code": "+220",
            "code": "GM"
        }, {
            "name": "Georgia",
            "dial_code": "+995",
            "code": "GE"
        }, {
            "name": "Germany",
            "dial_code": "+49",
            "code": "DE"
        }, {
            "name": "Ghana",
            "dial_code": "+233",
            "code": "GH"
        }, {
            "name": "Gibraltar",
            "dial_code": "+350",
            "code": "GI"
        }, {
            "name": "Greece",
            "dial_code": "+30",
            "code": "GR"
        }, {
            "name": "Greenland",
            "dial_code": "+299",
            "code": "GL"
        }, {
            "name": "Grenada",
            "dial_code": "+1 473",
            "code": "GD"
        }, {
            "name": "Guadeloupe",
            "dial_code": "+590",
            "code": "GP"
        }, {
            "name": "Guam",
            "dial_code": "+1 671",
            "code": "GU"
        }, {
            "name": "Guatemala",
            "dial_code": "+502",
            "code": "GT"
        }, {
            "name": "Guernsey",
            "dial_code": "+44",
            "code": "GG"
        }, {
            "name": "Guinea",
            "dial_code": "+224",
            "code": "GN"
        }, {
            "name": "Guinea-Bissau",
            "dial_code": "+245",
            "code": "GW"
        }, {
            "name": "Guyana",
            "dial_code": "+595",
            "code": "GY"
        }, {
            "name": "Haiti",
            "dial_code": "+509",
            "code": "HT"
        }, {
            "name": "Holy See (Vatican City State)",
            "dial_code": "+379",
            "code": "VA"
        }, {
            "name": "Honduras",
            "dial_code": "+504",
            "code": "HN"
        }, {
            "name": "Hong Kong",
            "dial_code": "+852",
            "code": "HK"
        }, {
            "name": "Hungary",
            "dial_code": "+36",
            "code": "HU"
        }, {
            "name": "Iceland",
            "dial_code": "+354",
            "code": "IS"
        }, {
            "name": "India",
            "dial_code": "+91",
            "code": "IN"
        }, {
            "name": "Indonesia",
            "dial_code": "+62",
            "code": "ID"
        }, {
            "name": "Iran, Islamic Republic of",
            "dial_code": "+98",
            "code": "IR"
        }, {
            "name": "Iraq",
            "dial_code": "+964",
            "code": "IQ"
        }, {
            "name": "Ireland",
            "dial_code": "+353",
            "code": "IE"
        }, {
            "name": "Isle of Man",
            "dial_code": "+44",
            "code": "IM"
        }, {
            "name": "Israel",
            "dial_code": "+972",
            "code": "IL"
        }, {
            "name": "Italy",
            "dial_code": "+39",
            "code": "IT"
        }, {
            "name": "Jamaica",
            "dial_code": "+1 876",
            "code": "JM"
        }, {
            "name": "Japan",
            "dial_code": "+81",
            "code": "JP"
        }, {
            "name": "Jersey",
            "dial_code": "+44",
            "code": "JE"
        }, {
            "name": "Jordan",
            "dial_code": "+962",
            "code": "JO"
        }, {
            "name": "Kazakhstan",
            "dial_code": "+7 7",
            "code": "KZ"
        }, {
            "name": "Kenya",
            "dial_code": "+254",
            "code": "KE"
        }, {
            "name": "Kiribati",
            "dial_code": "+686",
            "code": "KI"
        }, {
            "name": "Korea, Democratic People's Republic of",
            "dial_code": "+850",
            "code": "KP"
        }, {
            "name": "Korea, Republic of",
            "dial_code": "+82",
            "code": "KR"
        }, {
            "name": "Kuwait",
            "dial_code": "+965",
            "code": "KW"
        }, {
            "name": "Kyrgyzstan",
            "dial_code": "+996",
            "code": "KG"
        }, {
            "name": "Lao People's Democratic Republic",
            "dial_code": "+856",
            "code": "LA"
        }, {
            "name": "Latvia",
            "dial_code": "+371",
            "code": "LV"
        }, {
            "name": "Lebanon",
            "dial_code": "+961",
            "code": "LB"
        }, {
            "name": "Lesotho",
            "dial_code": "+266",
            "code": "LS"
        }, {
            "name": "Liberia",
            "dial_code": "+231",
            "code": "LR"
        }, {
            "name": "Libyan Arab Jamahiriya",
            "dial_code": "+218",
            "code": "LY"
        }, {
            "name": "Liechtenstein",
            "dial_code": "+423",
            "code": "LI"
        }, {
            "name": "Lithuania",
            "dial_code": "+370",
            "code": "LT"
        }, {
            "name": "Luxembourg",
            "dial_code": "+352",
            "code": "LU"
        }, {
            "name": "Macao",
            "dial_code": "+853",
            "code": "MO"
        }, {
            "name": "Macedonia, The Former Yugoslav Republic of",
            "dial_code": "+389",
            "code": "MK"
        }, {
            "name": "Madagascar",
            "dial_code": "+261",
            "code": "MG"
        }, {
            "name": "Malawi",
            "dial_code": "+265",
            "code": "MW"
        }, {
            "name": "Malaysia",
            "dial_code": "+60",
            "code": "MY"
        }, {
            "name": "Maldives",
            "dial_code": "+960",
            "code": "MV"
        }, {
            "name": "Mali",
            "dial_code": "+223",
            "code": "ML"
        }, {
            "name": "Malta",
            "dial_code": "+356",
            "code": "MT"
        }, {
            "name": "Marshall Islands",
            "dial_code": "+692",
            "code": "MH"
        }, {
            "name": "Martinique",
            "dial_code": "+596",
            "code": "MQ"
        }, {
            "name": "Mauritania",
            "dial_code": "+222",
            "code": "MR"
        }, {
            "name": "Mauritius",
            "dial_code": "+230",
            "code": "MU"
        }, {
            "name": "Mayotte",
            "dial_code": "+262",
            "code": "YT"
        }, {
            "name": "Mexico",
            "dial_code": "+52",
            "code": "MX"
        }, {
            "name": "Micronesia, Federated States of",
            "dial_code": "+691",
            "code": "FM"
        }, {
            "name": "Moldova, Republic of",
            "dial_code": "+373",
            "code": "MD"
        }, {
            "name": "Monaco",
            "dial_code": "+377",
            "code": "MC"
        }, {
            "name": "Mongolia",
            "dial_code": "+976",
            "code": "MN"
        }, {
            "name": "Montenegro",
            "dial_code": "+382",
            "code": "ME"
        }, {
            "name": "Montserrat",
            "dial_code": "+1664",
            "code": "MS"
        }, {
            "name": "Morocco",
            "dial_code": "+212",
            "code": "MA"
        }, {
            "name": "Mozambique",
            "dial_code": "+258",
            "code": "MZ"
        }, {
            "name": "Myanmar",
            "dial_code": "+95",
            "code": "MM"
        }, {
            "name": "Namibia",
            "dial_code": "+264",
            "code": "NA"
        }, {
            "name": "Nauru",
            "dial_code": "+674",
            "code": "NR"
        }, {
            "name": "Nepal",
            "dial_code": "+977",
            "code": "NP"
        }, {
            "name": "Netherlands",
            "dial_code": "+31",
            "code": "NL"
        }, {
            "name": "Netherlands Antilles",
            "dial_code": "+599",
            "code": "AN"
        }, {
            "name": "New Caledonia",
            "dial_code": "+687",
            "code": "NC"
        }, {
            "name": "New Zealand",
            "dial_code": "+64",
            "code": "NZ"
        }, {
            "name": "Nicaragua",
            "dial_code": "+505",
            "code": "NI"
        }, {
            "name": "Niger",
            "dial_code": "+227",
            "code": "NE"
        }, {
            "name": "Nigeria",
            "dial_code": "+234",
            "code": "NG"
        }, {
            "name": "Niue",
            "dial_code": "+683",
            "code": "NU"
        }, {
            "name": "Norfolk Island",
            "dial_code": "+672",
            "code": "NF"
        }, {
            "name": "Northern Mariana Islands",
            "dial_code": "+1 670",
            "code": "MP"
        }, {
            "name": "Norway",
            "dial_code": "+47",
            "code": "NO"
        }, {
            "name": "Oman",
            "dial_code": "+968",
            "code": "OM"
        }, {
            "name": "Pakistan",
            "dial_code": "+92",
            "code": "PK"
        }, {
            "name": "Palau",
            "dial_code": "+680",
            "code": "PW"
        }, {
            "name": "Palestinian Territory, Occupied",
            "dial_code": "+970",
            "code": "PS"
        }, {
            "name": "Panama",
            "dial_code": "+507",
            "code": "PA"
        }, {
            "name": "Papua New Guinea",
            "dial_code": "+675",
            "code": "PG"
        }, {
            "name": "Paraguay",
            "dial_code": "+595",
            "code": "PY"
        }, {
            "name": "Peru",
            "dial_code": "+51",
            "code": "PE"
        }, {
            "name": "Philippines",
            "dial_code": "+63",
            "code": "PH"
        }, {
            "name": "Pitcairn",
            "dial_code": "+872",
            "code": "PN"
        }, {
            "name": "Poland",
            "dial_code": "+48",
            "code": "PL"
        }, {
            "name": "Portugal",
            "dial_code": "+351",
            "code": "PT"
        }, {
            "name": "Puerto Rico",
            "dial_code": "+1 939",
            "code": "PR"
        }, {
            "name": "Qatar",
            "dial_code": "+974",
            "code": "QA"
        }, {
            "name": "Romania",
            "dial_code": "+40",
            "code": "RO"
        }, {
            "name": "Russia",
            "dial_code": "+7",
            "code": "RU"
        }, {
            "name": "Rwanda",
            "dial_code": "+250",
            "code": "RW"
        }, {
            "name": "Réunion",
            "dial_code": "+262",
            "code": "RE"
        }, {
            "name": "Saint Barthélemy",
            "dial_code": "+590",
            "code": "BL"
        }, {
            "name": "Saint Helena, Ascension and Tristan Da Cunha",
            "dial_code": "+290",
            "code": "SH"
        }, {
            "name": "Saint Kitts and Nevis",
            "dial_code": "+1 869",
            "code": "KN"
        }, {
            "name": "Saint Lucia",
            "dial_code": "+1 758",
            "code": "LC"
        }, {
            "name": "Saint Martin",
            "dial_code": "+590",
            "code": "MF"
        }, {
            "name": "Saint Pierre and Miquelon",
            "dial_code": "+508",
            "code": "PM"
        }, {
            "name": "Saint Vincent and the Grenadines",
            "dial_code": "+1 784",
            "code": "VC"
        }, {
            "name": "Samoa",
            "dial_code": "+685",
            "code": "WS"
        }, {
            "name": "San Marino",
            "dial_code": "+378",
            "code": "SM"
        }, {
            "name": "Sao Tome and Principe",
            "dial_code": "+239",
            "code": "ST"
        }, {
            "name": "Saudi Arabia",
            "dial_code": "+966",
            "code": "SA"
        }, {
            "name": "Senegal",
            "dial_code": "+221",
            "code": "SN"
        }, {
            "name": "Serbia",
            "dial_code": "+381",
            "code": "RS"
        }, {
            "name": "Seychelles",
            "dial_code": "+248",
            "code": "SC"
        }, {
            "name": "Sierra Leone",
            "dial_code": "+232",
            "code": "SL"
        }, {
            "name": "Singapore",
            "dial_code": "+65",
            "code": "SG"
        }, {
            "name": "Slovakia",
            "dial_code": "+421",
            "code": "SK"
        }, {
            "name": "Slovenia",
            "dial_code": "+386",
            "code": "SI"
        }, {
            "name": "Solomon Islands",
            "dial_code": "+677",
            "code": "SB"
        }, {
            "name": "Somalia",
            "dial_code": "+252",
            "code": "SO"
        }, {
            "name": "South Africa",
            "dial_code": "+27",
            "code": "ZA"
        }, {
            "name": "South Georgia and the South Sandwich Islands",
            "dial_code": "+500",
            "code": "GS"
        }, {
            "name": "Spain",
            "dial_code": "+34",
            "code": "ES"
        }, {
            "name": "Sri Lanka",
            "dial_code": "+94",
            "code": "LK"
        }, {
            "name": "Sudan",
            "dial_code": "+249",
            "code": "SD"
        }, {
            "name": "Suriname",
            "dial_code": "+597",
            "code": "SR"
        }, {
            "name": "Svalbard and Jan Mayen",
            "dial_code": "+47",
            "code": "SJ"
        }, {
            "name": "Swaziland",
            "dial_code": "+268",
            "code": "SZ"
        }, {
            "name": "Sweden",
            "dial_code": "+46",
            "code": "SE"
        }, {
            "name": "Switzerland",
            "dial_code": "+41",
            "code": "CH"
        }, {
            "name": "Syrian Arab Republic",
            "dial_code": "+963",
            "code": "SY"
        }, {
            "name": "Taiwan",
            "dial_code": "+886",
            "code": "TW"
        }, {
            "name": "Tajikistan",
            "dial_code": "+992",
            "code": "TJ"
        }, {
            "name": "Tanzania, United Republic of",
            "dial_code": "+255",
            "code": "TZ"
        }, {
            "name": "Thailand",
            "dial_code": "+66",
            "code": "TH"
        }, {
            "name": "Timor-Leste",
            "dial_code": "+670",
            "code": "TL"
        }, {
            "name": "Togo",
            "dial_code": "+228",
            "code": "TG"
        }, {
            "name": "Tokelau",
            "dial_code": "+690",
            "code": "TK"
        }, {
            "name": "Tonga",
            "dial_code": "+676",
            "code": "TO"
        }, {
            "name": "Trinidad and Tobago",
            "dial_code": "+1 868",
            "code": "TT"
        }, {
            "name": "Tunisia",
            "dial_code": "+216",
            "code": "TN"
        }, {
            "name": "Turkey",
            "dial_code": "+90",
            "code": "TR"
        }, {
            "name": "Turkmenistan",
            "dial_code": "+993",
            "code": "TM"
        }, {
            "name": "Turks and Caicos Islands",
            "dial_code": "+1 649",
            "code": "TC"
        }, {
            "name": "Tuvalu",
            "dial_code": "+688",
            "code": "TV"
        }, {
            "name": "Uganda",
            "dial_code": "+256",
            "code": "UG"
        }, {
            "name": "Ukraine",
            "dial_code": "+380",
            "code": "UA"
        }, {
            "name": "United Arab Emirates",
            "dial_code": "+971",
            "code": "AE"
        }, {
            "name": "United Kingdom",
            "dial_code": "+44",
            "code": "GB"
        }, {
            "name": "United States",
            "dial_code": "+1",
            "code": "US"
        }, {
            "name": "Uruguay",
            "dial_code": "+598",
            "code": "UY"
        }, {
            "name": "Uzbekistan",
            "dial_code": "+998",
            "code": "UZ"
        }, {
            "name": "Vanuatu",
            "dial_code": "+678",
            "code": "VU"
        }, {
            "name": "Venezuela, Bolivarian Republic of",
            "dial_code": "+58",
            "code": "VE"
        }, {
            "name": "Viet Nam",
            "dial_code": "+84",
            "code": "VN"
        }, {
            "name": "Virgin Islands, British",
            "dial_code": "+1 284",
            "code": "VG"
        }, {
            "name": "Virgin Islands, U.S.",
            "dial_code": "+1 340",
            "code": "VI"
        }, {
            "name": "Wallis and Futuna",
            "dial_code": "+681",
            "code": "WF"
        }, {
            "name": "Yemen",
            "dial_code": "+967",
            "code": "YE"
        }, {
            "name": "Zambia",
            "dial_code": "+260",
            "code": "ZM"
        }, {
            "name": "Zimbabwe",
            "dial_code": "+263",
            "code": "ZW"
        }, {
            "name": "Åland Islands",
            "dial_code": "+358",
            "code": "AX"
        }];

        if(!Ext.isEmpty(params)) {
            return c;
        }

        Ext.Ajax.request({
            url: 'http://ipinfo.io/json',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            disableCaching: false,
            success: function(response) {
                cc = Ext.JSON.decode(response.responseText);
                if (cc.country) {
                    for (var i = 0, l = c.length; i < l; i++) {
                        if (c[i].code == cc.country) {
                            if (c[i].dial_code) {
                                //empty store if exists
                                var iistore = Ext.getStore('ipinfostore');
                                //debugger;
                                if (iistore) {
                                    iistore.getProxy().clear();
                                    iistore.data.clear();
                                    iistore.sync();
                                }

                                var x = Ext.create('ttapp.model.IpInfo', {
                                    ip: cc.ip,
                                    hostname: cc.hostname,
                                    city: cc.city,
                                    region: cc.region,
                                    country: cc.country,
                                    loc: cc.loc,
                                    org: cc.org,
                                    postal: cc.postal,
                                    country_dial_code: c[i].dial_code
                                });

                                iistore.add(x);
                                iistore.sync();
                            }
                        }
                    }
                }
                // if nothing found return empty string
                //return '';
            }
        });
    },

    createMenuButton: function() {
        var button = Ext.create('Ext.Button', {
            cls:'add-option-btn',
            itemId: 'menu-button-bottom-right',
            html:'<img class="option-add-icon animated rotateOut" src="resources/images/add_icon.png" />',
            listeners: {
                tap: {
                    fn: function() {
                      ttapp.util.Analytics.trackEvent('App', 'Opened menu');

                        btnPanel = Ext.getCmp('btn-panel');
                        console.log(btnPanel);
                        if (Ext.isEmpty(btnPanel)) {
                            Ext.Viewport.add ({
                                xtype:'panel',
                                centered : true,
                                width:'100%',
                                height:'100%',
                                id:'btn-panel',
                                hideAnimation: {type: 'fadeOut', duration: 200, easing: 'ease-out'},
                                cls:'option-overlay clickable',
                                modal:true,
                                html: '<div class="option-btn-grp">' +
                                '<div class="btn tink-meter slideInUp3"><span id="tinkometer" class="icon"></span><span class="title">Tinkometer</span></div>' +
                                '<div class="btn tink-box slideInUp2"><span id="tinkbox" class="icon"></span><span class="title">Tinkbox</span></div>' +
                                '<div class="btn tink slideInUp1"><span id="tink" class="icon"></span><span class="title">Tink</span></div>' +
                                '</div>'
                            });

                            Ext.getCmp('btn-panel').show();

                            if(Ext.Viewport.getActiveItem().config.xtype == 'phoneContacts') {
                                Ext.select('.tink').hide();
                            }

                            $('.btn').on('click', function() {
                                var anim = {type: 'fade', direction: 'up', duration: 100, easing: 'ease-out'};
                                switch(this.children[0].id) {
                                    case 'settingsProfile':
                                        break;
                                    case 'tinkometer':
                                        ttapp.util.Analytics.trackView('Tinkometer');
                                        $("body").removeClass("option-mask");
                                        $(".add-option-btn").removeClass("btn-close");
                                        $("body").addClass("mask-fade-effect");

                                        Ext.getCmp('btn-panel').destroy();
                                        Ext.Viewport.animateActiveItem('tinkometer', anim);
                                        break;
                                    case 'tinkbox':
                                        ttapp.util.Analytics.trackView('Tinkbox');
                                        $("body").removeClass("option-mask");
                                        $(".add-option-btn").removeClass("btn-close");
                                        $("body").addClass("mask-fade-effect");

                                        Ext.getCmp('btn-panel').destroy();
                                        Ext.Viewport.animateActiveItem('tinkbox', anim);
                                        break;
                                    case 'tink':
                                        ttapp.util.Analytics.trackView('Contacts');
                                        $("body").removeClass("option-mask");
                                        $(".add-option-btn").removeClass("btn-close");
                                        Ext.getCmp('btn-panel').destroy();
                                        Ext.Viewport.animateActiveItem('phoneContacts', anim);
                                        break;
                                    default:
                                }
                            });

                            $(".btn").addClass("slide-animation animated");
                            $(".add-option-btn").addClass("btn-close");
                            $("body").addClass("option-mask");
                        } else {
                            $("body").removeClass("option-mask");
                            $(".add-option-btn").removeClass("btn-close");
                            $("body").addClass("mask-fade-effect");

                            Ext.getCmp('btn-panel').hide();
/*                            setTimeout(function() {
                                $("body").removeClass("mask-fade-effect");
                                Ext.getCmp('btn-panel').destroy();
                            }, 100);
*/
                            Ext.create('Ext.util.DelayedTask', function () {
                                $("body").removeClass("mask-fade-effect");
                                Ext.getCmp('btn-panel').destroy();
                            }).delay(100);
                        }

                        // $('.clickable').on('click', function() {
                        //     $("body").removeClass("option-mask");
                        //     $(".add-option-btn").removeClass("btn-close");
                        //     $("body").addClass("mask-fade-effect");

                        //     Ext.getCmp('btn-panel').hide();
                        //     setTimeout(function() {
                        //         $("body").removeClass("mask-fade-effect");
                        //         Ext.getCmp('btn-panel').destroy();
                        //     }, 100);
                        // });
                    }
                }
            }
        });
        return button;
    },

    animationThumbnail: function() {
        var store = Ext.getStore('trinketstore').getData();
        var storeLength = store.length - 1;
        var random = Math.floor((Math.random() * storeLength) + 0);
        var imagePath = Ext.getStore('trinketstore').getData().all[random].data.thumbnail_path;

        return imagePath;
    },
    logInviteAction: function(user, invitee){
        console.log('log invite action ');
        Ext.Ajax.request({
            url: ttapp.config.Config.getBaseURL() + '/log-invite-action/' + num + '/invitee/'+ invitee + '/',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            disableCaching: false,
            success: function (response) {
                console.log('invite action was logged');
            }
        });
    },
    userDescription: function() {
        var arr = [
            {
                text: 'Time you enjoy wasting is not wasted time.'
            },
            {
                text: 'Time has a wonderful way to show us what really matters.'
            },
            {
                text: 'You can find something truly important in an ordinary minute.'
            },
            {
                text: "With endless time, nothing is special. With no loss or sacrifice, we can’t appreciate what we have"
            },
            {
                text: "It is the time you have wasted for your rose that makes your rose so important."
            },
            {
                text: "Time is a gift – share it!"
            },
            {
                text: 'Time is the most valuable thing that a man can spend.'
            },
            {
                text: "You forget, time doesn't exist anymore. You gave it to me."
            },
            {
                text: 'Any time not spent on love is wasted.'
            }
        ];

        return arr[Math.floor((Math.random() * arr.length) + 0)].text;
    }
});

function displaytimer(millis){
    var  millis = millis * 1000;

    var hours = Math.floor(millis / 36e5),
        mins = Math.floor((millis % 36e5) / 6e4),
        secs = Math.floor((millis % 6e4) / 1000);

    if(hours == 0) {
        return (mins+'m'+' '+secs+'s');
    } else {
        return (hours+'h'+' '+mins+'m'+' '+secs+'s');
    }
}

function showTinkTime(millis){
    var  millis = millis * 1000;

    var hours = Math.floor(millis / 36e5),
        mins = Math.floor((millis % 36e5) / 6e4),
        secs = Math.floor((millis % 6e4) / 1000);

    hours = hours>=10?hours:'0'+hours;
    minutes = mins>=10?mins:'0'+mins;
    seconds = secs>=10?secs:'0'+secs;

    return hours+':'+minutes+':'+seconds;
}

function getName(num) {
    var storeData = Ext.getStore('phonecontacts').findRecord('phone_number', num);
    var firstname, lastname;

    if(Ext.isEmpty(storeData)) {
        return num;
    } else {
        if(!Ext.isEmpty(storeData.data.first_name)) {
            firstname = storeData.data.first_name;
        } else {
            firstname = "";
        }

        if(!Ext.isEmpty(storeData.data.last_name)) {
            lastname = storeData.data.last_name;
        } else {
            lastname = "";
        }

        var name = firstname+' '+lastname
        return name;
    }
}

function getBackgroundImage(number) {
    console.log(number);
    if(Ext.os.deviceType == 'Phone') {
        var options      = new ContactFindOptions();
        options.filter   = number;
        options.multiple = true;
        var fields       = [ "name", "photo", "phoneNumbers" ];

        navigator.contacts.find(fields, function(s){
            if(!Ext.isEmpty(s.photos)) {
                return s.photos[0].value;
            }
        },
        function(s){
            return;
        }, options);
    } else {
        return ttapp.util.Common.animationThumbnail();
    }
}

function testCircleCss(id, radius, width, percent) {
    function shuffle(o){ //v1.0
        for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
        return o;
    }

    var circles = [];
    var child = document.getElementById(id),
        percentage = parseFloat(percent);
    circles.push(Circles.create({
        id:         child.id,
        value:      percentage,
        radius:     radius,
        width:      width
    }));
}

function resizeHeight(){
    var bxWidth = $(".trinket-new-list .img-bg").width();
    $(".trinket-new-list .img-bg").css("height",bxWidth);
}

function resizeDiv(){
    resizeHeight();
    // setTimeout(resizeDiv, 20);
    Ext.create('Ext.util.DelayedTask', function () {
        resizeDiv();
    }).delay(20);
}

$(window).resize(function(){
    resizeHeight();
});


