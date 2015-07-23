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
                show: 'clearLocalStores'
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
                tap: 'confirmCode'
            }
        }
    },
    sendCodeAgain: function() {
        this.sendCode(this.myPhoneNumber);
    },
    showPhoneNumber: function() {
        console.log('show phone number');
        var pn = Ext.ComponentQuery.query('#entered_mobile_number')[0];
        pn.setHtml(this.myPhoneNumber);
    },
    setDialcode: function() {
        var m = Ext.ComponentQuery.query('#myDialCode')[0];

        Ext.getStore('ipinfostore').getDialCode(function(dc) {
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
        var me = this,
            m = Ext.ComponentQuery.query('#myDialCode')[0];

        var phoneNumber = m.getValue() + Ext.getCmp('myPhoneNumber').getValue();
        me.myPhoneNumber = phoneNumber;

        // store user profile locally
        Ext.getStore('trinketstore').getDefaultTrinket(function(trinketName) {
            if (Ext.getStore('profilestore').addProfile(phoneNumber, false, (new Date()).valueOf(), trinketName, 0)) {
                me.sendCode(phoneNumber);

                if (Ext.os.is.Android && SMS) {
                    Ext.Viewport.mask({
                        xtype: 'loadmask'
                    });
                }
                else {
                    Ext.Viewport.animateActiveItem('confirmphonenumber', {
                        type: 'slide'
                    });
                }
            }
        });
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
                        SMS.stopWatch(function() {
                            var sms = e.data;

                            if (sms && sms.body) {
                                var codeMatch = sms.body.match(/([0-9]+)/);
                                if (codeMatch && codeMatch[0]) {
                                    me.confirmCode(codeMatch[0]);
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
    confirmCode: function(code) {
        if (typeof code != "string") {
            code = Ext.getCmp('myVerificationCode').getValue();
        }

        Ext.Ajax.request({
            url: ttapp.config.Config.getBaseURL() + '/verify-user/',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            disableCaching: false,
            jsonData: {
                "to_user": this.myPhoneNumber,
                "code": code
            },

            success: function(response) {
                try {
                    Ext.Viewport.unmask();

                    var json = JSON.parse(response.responseText);
                    if (json && json.status === true) {
                        Ext.getStore('profilestore').verified();

                        ttapp.util.FeedProxy.process(true);
                        Ext.Viewport.setActiveItem('trinket', 'slide');
                    } else {
                        Ext.Msg.alert('Problem', 'Verification code doesnt match', Ext.emptyFn);
                    }
                } catch (e) {
                    Ext.Viewport.unmask();
                }
            }
        });

    }
});
