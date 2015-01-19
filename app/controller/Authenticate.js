Ext.define('ttapp.controller.Authenticate', {
    extend: 'Ext.app.Controller',
    requires: ['ttapp.config.Config'],
    config: {
        refs: {
        },
        control: {
            'authenticate button': {
                tap: 'sendConfirmationCode'
            },
            'confirmphonenumber button': {
                tap: 'confirmCode'
            }
        }
    },
    sendConfirmationCode: function(){
        var phoneNumber = Ext.getCmp('myPhoneNumber').getValue();
        this.myPhoneNumber = phoneNumber;
        
        // store user profile locally
        Ext.getStore('profilestore').addProfile(phoneNumber,false, "20140101",
            Ext.getStore('trinketstore').getDefaultTrinket());

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
        Ext.Viewport.setActiveItem('confirmphonenumber');
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
                                if ( JSON.parse(response.responseText)['status'] == true){
                                    Ext.getStore('profilestore').verified();

                                    ttapp.util.FeedProxy.process();
                                    Ext.Viewport.setActiveItem('options');                                
                                }
                                else{
                                    console.log('Verification code doesnt match');
                                }
                            }
                        });
        
    }
});
