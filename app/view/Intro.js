Ext.define('ttapp.view.Intro', {
    extend: 'Ext.Container',
    xtype: 'intro',
    config: {
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
                cls: 'top-btn btn-delete',
                docked: 'right'
            }]
        }, {
            xtype: 'panel',
            id: "swiffydiv",
            html: '<iframe class="tinkanimation" src="http://tinktime.com/static/common/introduction.html" ></iframe>'
        }]
    }
});
