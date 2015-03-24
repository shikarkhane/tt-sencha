Ext.define('ttapp.controller.DogEar', {
    extend: 'Ext.app.Controller',
    config: {
        refs: {
            btnToTink: 'button[iconCls~=speedometer]',
            btnToFeed: 'button[iconCls~=mail]'
        },
        control: {
            'btnToTink': {
                tap: 'goToTink'
            },
            'btnToFeed': {
                tap: 'goToFeed'
            }
        }
    },
    goToTink: function() {
        Ext.Viewport.setActiveItem('tink', 'slide');
    },
    goToFeed: function() {
        Ext.Viewport.setActiveItem('feed', 'slide');
    }
});