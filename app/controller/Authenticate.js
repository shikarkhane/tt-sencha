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
        console.log('send confirmation code!');

        Ext.Ajax.request({
                            url: 'http://localhost:8888/sms-code/',
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json'},
                            disableCaching: false,
                            jsonData: {
                                "to_user": "nikhil"
                            },

                            success: function(response) {
                                console.log(response.responseText);
                            }
                        });
        Ext.Viewport.setActiveItem('confirmphonenumber');
    },
    confirmCode: function(){
        console.log('confirm code');
        Ext.Ajax.request({
                            url: 'http://localhost:8888/verify-user/',
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json'},
                            disableCaching: false,
                            jsonData: {
                                "to_user": "nikhil",
                                "code" : "1234"
                            },

                            success: function(response) {
                                //debugger;
                                console.log(response.responseText);
                                debugger;
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
