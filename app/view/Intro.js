Ext.define('ttapp.view.Intro', {
    extend: 'Ext.Container',
    xtype: 'intro',
    config: {
        itemId: 'introPage',
        layout: {
            type: 'vbox',
            align: 'middle'
        },
        items: [{
            xtype: 'toolbar',
            docked: 'top',
            cls: 'top-bar',
            items: [{
                xtype: 'button',
                cls: 'top-btn btn-delete close-intro-goto-auth',
                docked: 'right'
            }]
        }, {
            xtype: 'panel',
            html: '<iframe class="tinkanimation" src="http://tinktime.com/static/common/introduction.html" ></iframe>'
        }]
    }
});
