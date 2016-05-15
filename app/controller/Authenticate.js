Ext.define('ttapp.controller.Authenticate', {
    extend: 'Ext.app.Controller',
    requires: ['ttapp.config.Config'],
    config: {
        refs: {
            sendAgainButton: 'button[cls~=send-again-btn]',
            confirmCodeButton: 'button[cls~=cls-confirm-code-btn]'
        },
        control: {
            'authenticate': {
                show: 'setDialcode'
            },
            'confirmphonenumber': {
                show: 'showPhoneNumber'
            },
            sendAgainButton: {
                tap: 'sendCodeAgain'
            },
            'authenticate button': {
                tap: 'sendConfirmationCode'
            },
            confirmCodeButton: {
                tap: 'manualConfirmCode'
            },
            '#selectCountry': {
              change: 'selectCountryDidChange'
            }
        }
    },
    sendCodeAgain: function() {
        ttapp.util.Analytics.trackView('Send Code again');
        this.sendCode(window.myPhoneNumber);
    },
    showPhoneNumber: function() {
        console.log('show phone number');
        var pn = Ext.ComponentQuery.query('#entered_mobile_number')[0];
        pn.setHtml(window.myPhoneNumber);
    },
    setDialcode: function() {
        var m = Ext.ComponentQuery.query('#myDialCode')[0];

        Ext.getStore('ipinfostore').getDialCode(function(dc, cd) {
            Ext.getCmp('selectCountry').setValue(cd);
            m.setValue(dc);
        });
    },
    clearLocalStores: function() {
        var ps = Ext.getStore('profilestore');
        ps.getProxy().clear();
        ps.data.clear();
        ps.sync();

        this.setDialcode();
    },
    sendConfirmationCode: function() {
        var m = Ext.ComponentQuery.query('#myDialCode')[0];

        var number = Ext.ComponentQuery.query('#myPhoneNumber')[0].getValue(),
            dcode = m.getValue();
        if ( number.length > 0) {
            if (number) {
                number = number.replace(/\s/g, '');
            }
            if (number.charAt(0) == '0') {
                number = number.substring(1); //remove the leading zero
            }

            var phoneNumber = dcode + number;
            window.myPhoneNumber = phoneNumber;


            // store user profile locally
            Ext.getStore('trinketstore').getDefaultTrinket(function (trinketName) {
                if (Ext.getStore('profilestore').addProfile(window.myPhoneNumber, false, (new Date()).valueOf(), trinketName, 0, dcode)) {

                    ttapp.app.getController('Authenticate').sendCode(window.myPhoneNumber);

                    if (Ext.os.is.Android && SMS) {
                        Ext.Viewport.mask({
                            xtype: 'loadmask',
                            html: '<img src="resources/images/green-loader.png" alt="loader">'

                        });

                        Ext.create('Ext.util.DelayedTask', function () {
                            console.log('wait for sms received');
                            Ext.Viewport.unmask();

                            ttapp.util.Analytics.trackView('Manual Confirm');

                            Ext.Viewport.animateActiveItem('confirmphonenumber', {
                                type: 'slide'
                            });
                        }).delay(10000);

                        // set timeout for 15 seconds
                        /*me._androidTimeout = setTimeout(function() {
                         Ext.Viewport.unmask();

                         Ext.Viewport.animateActiveItem('confirmphonenumber', {
                         type: 'slide'
                         });
                         }, 15000);*/
                    }
                    else {
                        ttapp.util.Analytics.trackView('Manual Confirm');
                        Ext.Viewport.animateActiveItem('confirmphonenumber', {
                            type: 'slide'
                        });
                    }
                }
            });

            Ext.getStore('profilestore').setUserImage();
        }
        else{
            Ext.Msg.alert('Oops!', 'We couldnt capture your number.', Ext.emptyFn);
        }
    },
    sendCode: function(phoneNumber) {
        var me = this;
        Ext.Ajax.request({
            url: ttapp.config.Config.getBaseURL() + '/sms-code/',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            disableCaching: false,
            jsonData: {
                "to_user": phoneNumber
            },
            success: function(response) {
                console.log(response.responseText);

                ttapp.util.Analytics.trackView('Sent SMS');

                if (Ext.os.is.Android && SMS) {
                    SMS.enableIntercept(true, function() {
                    }, function() {
                        Ext.Viewport.animateActiveItem('confirmphonenumber', {
                            type: 'slide'
                        });
                    });

                    SMS.startWatch(function() {
                    }, function() {
                        Ext.Viewport.animateActiveItem('confirmphonenumber', {
                            type: 'slide'
                        });
                    });

                    document.addEventListener('onSMSArrive', function(e) {
                        clearTimeout(me._androidTimeout);
                        me._androidTimeout = null;

                        SMS.stopWatch(function() {
                            var sms = e.data;

                            if (sms && sms.body) {
                                var codeMatch = sms.body.match(/([0-9]+)/);
                                if (codeMatch && codeMatch[0]) {
                                    me.confirmCode(codeMatch[0]);

                                    ttapp.util.Analytics.trackEvent('SMS', 'Automatically confirmed code');
                                }
                            }
                            else {
                                Ext.Viewport.unmask();
                                Ext.Viewport.animateActiveItem('confirmphonenumber', {
                                    type: 'slide'
                                });
                            }
                        }, function() {
                            Ext.Viewport.unmask();
                            Ext.Viewport.animateActiveItem('confirmphonenumber', {
                                type: 'slide'
                            });
                        });
                    });
                }
            }
        });
    },
    selectCountryDidChange: function() {
      var countries = ttapp.util.Common.setDialCode('123');
      var code = Ext.getCmp('selectCountry').getValue();
      var value = null;

      for (var i = 0; i < countries.length; i++) {
        if (countries[i].code == code) {
          Ext.ComponentQuery.query('#myDialCode')[0].setValue(countries[i].dial_code);
            return 0; // optimize, why loop the rest if i found a match
        }
      }
    },
    manualConfirmCode: function(){
        ttapp.util.Analytics.trackEvent('SMS', 'Clicked manually confirm code');

        code = Ext.getCmp('myVerificationCode').getValue();
        this.confirmCode(code);
    },
    confirmCode: function(code) {
        ttapp.util.Analytics.trackEvent('SMS', 'Confirming code');

        Ext.Ajax.request({
            url: ttapp.config.Config.getBaseURL() + '/verify-user/',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            disableCaching: false,
            jsonData: {
                "to_user": window.myPhoneNumber,
                "code": code
            },
            success: function(response) {
                try {
                    Ext.Viewport.unmask();
                    var json = JSON.parse(response.responseText);
                    if (json && json.status === true) {
                        Ext.getStore('profilestore').verified();
                        Ext.Viewport.setActiveItem('tinkometer', 'slide');
                    } else {
                        Ext.Msg.alert('Problem', 'Verification code doesnt match', Ext.emptyFn);

                        ttapp.util.Analytics.trackEvent('SMS', 'confirm code doesnt match');
                    }
                } catch (e) {
                    Ext.Viewport.unmask();
                }
            }
        });
    }
});
