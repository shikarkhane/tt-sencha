/*
    This file is generated and updated by Sencha Cmd. You can edit this file as
    needed for your application, but these edits will have to be merged by
    Sencha Cmd when it performs code generation tasks such as generating new
    models, controllers or views and when running "sencha app upgrade".

    Ideally changes to this file would be limited and most work would be done
    in other places (such as Controllers). If Sencha Cmd cannot merge your
    changes and its generated code, it will produce a "merge conflict" that you
    will need to resolve manually.
*/

Ext.application({
    name: 'ttapp',

    requires: [
        'Ext.MessageBox', 'Ext.device.Contacts',
        'ttapp.overrides.SizeMonitor', 'ttapp.overrides.PaintMonitor',
        'ttapp.util.Analytics'
    ],
    controllers: ['Main', 'Tink', 'SendTo', 'Landing', 'Authenticate',
    'Trinket', 'ReplayTink', 'TinkChat', 'PhoneContact', 'TinkBox'],

    views: [
        'Landing', 'Tink', 'SendTo', 'Trinket',
        'Authenticate', 'ConfirmPhoneNumber',
        'PrivacyPolicy', 'PhoneContacts', 'TinkoMeter', 'TinkBox', 'TinkChat'
    ],

    stores: ['Trinkets', 'Contacts', 'Profile', 'IpInfo'],


    isIconPrecomposed: true,


    launch: function() {
        ttapp.util.Common.askEULAPermission();

        // get trinket content
        ttapp.util.TrinketProxy.process(true, function() {
            // check on server, if user is verified
            ttapp.util.Common.isUserVerifiedOnServer(function(success) {
                // Destroy the #appLoadingIndicator element
                Ext.fly('appLoadingIndicator').destroy();

                // Initialize the main view
                if (success) {
                    Ext.Viewport.add({
                        cls: 'bg-transparent'
                    });
                    ttapp.app.getController('Landing').onUserAction(true);
                }
                else {
                    Ext.Viewport.add(Ext.create('ttapp.view.Authenticate'));
                }
            });
        });

        Ext.getStore('profilestore').hasUserAllowedEULAContactsRead(function(success) {
            if(success){
                // get contacts from device
                ttapp.util.ContactsProxy.process(Ext.getStore('phonecontacts'));
            }
        });


        // set user's country dial code based on ip-address
        ttapp.util.Common.setDialCode();

        try {
            if (navigator.connection.type == Connection.NONE) {
                Ext.Msg.alert('No Internet Connection', null, Ext.emptyFn);
            }
        }
        catch(e) {
            console.log(e);
        }

        ttapp.util.Analytics.startTracker();

    },

    onUpdated: function() {
        Ext.Msg.confirm(
            "Application Update",
            "This application has just successfully been updated to the latest version. Reload now?",
            function(buttonId) {
                if (buttonId === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
});
