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
        Ext.Viewport.setActiveItem('confirmphonenumber');
    },
    confirmCode: function(){
        console.log('confirm code');
        Ext.Viewport.setActiveItem('tink');
    }
});
