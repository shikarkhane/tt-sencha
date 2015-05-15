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
    sendCodeAgain: function(){
        this.sendCode(this.myPhoneNumber);
    },
    showPhoneNumber: function(){
        console.log('show phone number');
        var pn = Ext.ComponentQuery.query('#entered_mobile_number')[0];
        var dc = Ext.getStore('ipinfostore').getDialCode();
        pn.setHtml(this.myPhoneNumber);
    },
    setDialcode: function(){
        var m = Ext.ComponentQuery.query('#myDialCode')[0];
        m.setValue(Ext.getStore('ipinfostore').getDialCode());
    },
    clearLocalStores: function(){
        var ps = Ext.getStore('profilestore');
        ps.getProxy().clear();
        ps.data.clear();
        ps.sync();

        this.setDialcode();
    },
    sendConfirmationCode: function(){
        var phoneNumber = Ext.getStore('ipinfostore').getDialCode() + Ext.getCmp('myPhoneNumber').getValue();
        this.myPhoneNumber = phoneNumber;
        
        // store user profile locally
        if (Ext.getStore('profilestore').addProfile(phoneNumber,false, (new Date()).valueOf(),
            Ext.getStore('trinketstore').getDefaultTrinket())){

            this.sendCode(phoneNumber);

            Ext.Viewport.animateActiveItem('confirmphonenumber',{type:'slide'}); 
        }
    },
    sendCode: function(phoneNumber){
            Ext.Ajax.request({
                url: ttapp.config.Config.getBaseURL() + '/sms-code/',
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                disableCaching: false,
                jsonData: {
                    "to_user": phoneNumber
                },

                success: function(response) {
                    console.log(response.responseText);
                }
            });

    },
    confirmCode: function(){
        var code = Ext.getCmp('myVerificationCode').getValue();

        Ext.Ajax.request({
                            url: ttapp.config.Config.getBaseURL() + '/verify-user/',
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json'},
                            disableCaching: false,
                            jsonData: {
                                "to_user": this.myPhoneNumber,
                                "code" : code
                            },

                            success: function(response) {
                                //if ( JSON.parse(response.responseText)['status'] == true){
                                    Ext.getStore('profilestore').verified();

                                    ttapp.util.FeedProxy.process(true);
                                    Ext.Viewport.setActiveItem('trinket','slide');                                
                               // }
                               // else{
                                    //console.log('Verification code doesnt match');
                               // }
                            }
                        });
        
    }
});
