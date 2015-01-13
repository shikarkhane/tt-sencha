Ext.define('ttapp.controller.DogEar', {
    extend: 'Ext.app.Controller',
    config: {
        refs: {
            btnToTink: 'button[iconCls~=action]',
            btnToFeed: 'button[iconCls~=add]'
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
    goToTink: function(){
        Ext.Viewport.setActiveItem('tink');
    },
    goToFeed: function(){
        Ext.Viewport.setActiveItem('feed');
    }
});
