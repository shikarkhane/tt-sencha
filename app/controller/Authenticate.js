Ext.define('ttapp.controller.Authenticate', {
    extend: 'Ext.app.Controller',
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

        Ext.Ajax.request({
                            url: 'http://localhost:8888/sms-code/',
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
                            url: 'http://localhost:8888/verify-user/',
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json'},
                            disableCaching: false,
                            jsonData: {
                                "to_user": this.myPhoneNumber,
                                "code" : code
                            },

                            success: function(response) {
                                if ( JSON.parse(response.responseText)['status'] == true){
                                    Ext.Viewport.setActiveItem('tink');                             
                                }
                                else{
                                    console.log('Verification code doesnt match');
                                }
                            }
                        });
        
    }
});
