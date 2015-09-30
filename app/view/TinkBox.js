Ext.define('ttapp.view.TinkBox', {
	extend: 'Ext.Container',
	xtype: 'tinkbox',
	config: {
        cls:'bg-white-color tinkometer-section',
		items: [
			{
                xtype: 'panel',
                docked: 'top',
                cls: 'new-header',
                items: [
                    {
                        xtype: 'panel',
                        cls: 'tinkbox-logo',
                        docked: 'top'
                    }
                ]
            }
		]
	},

	initialize: function() {
        var list = Ext.create('Ext.List', {
            height: '100%',
            cls: 'tinkbox-section',
            itemTpl: [
                '<tpl if="status == 0">',
                    '<div class="list-box" style="background:{background} no-repeat 50% 50%">',
                        '<div class="over-lay"></div>',
                        '<span class="inner-detail"><span class="user-name">{name}</span><span class="info"><span class="circle"><img src={img1} ></span><span class="time">16m 18s</span><span class="tinkinout">Tink in</span></span><span class="info right"><span class="circle"><img src={img2} ></span><span class="time">20m 18s</span><span class="tinkinout">Tink out</span></span><span class="arrow"></span></span>',
                    '</div>',
                '<tpl else>',
                    '<div class="list-box" style="background:{background} no-repeat 50% 50%">',
                        '<div class="over-lay"></div>',
                        '<span class="inner-detail"><span class="user-name">{name}</span><span class="info"><span class="circle active"><span class="notification-icon"></span><img src={img1} ></span><span class="time">16m 18s</span><span class="tinkinout">Tink in</span></span><span class="info right"><span class="circle"><img src={img2} ></span><span class="time">20m 18s</span><span class="tinkinout">Tink out</span></span><span class="arrow"></span></span>',
                    '</div>',
                '</tpl>',
            ],
            store: {
                id: 'testList',
                fields: ['name', 'status', 'img1', 'img2', 'background'],
                data: [
                    {
                        name: 'Bhagwan S k',
                        status    : 0,
                        background: 'url(resources/images/img1.jpg)',
                        img1      : 'resources/images/old-lady-dancing.png',
                        img2      : 'resources/images/old-lady-dancing.png',
                    }, {
                        name: 'Bhagwan S k',
                        status    : 0,
                        background: 'url(resources/images/img2.jpg)',
                        img1      : 'resources/images/lucky-cats-waving-hands.png',
                        img2      : 'resources/images/lucky-cats-waving-hands.png',
                    }, {
                        name: 'Bhagwan S k',
                        status    : 1,
                        background: 'url(resources/images/img1.jpg)',
                        img1      : 'resources/images/old-lady-dancing.png',
                        img2      : 'resources/images/old-lady-dancing.png',
                    }, {
                        name: 'Bhagwan S k',
                        status    : 0,
                        background: 'url(resources/images/img2.jpg)',
                        img1      : 'resources/images/lucky-cats-waving-hands.png',
                        img2      : 'resources/images/lucky-cats-waving-hands.png',
                    }, {
                        name: 'Bhagwan S k',
                        status    : 0,
                        background: 'url(resources/images/img1.jpg)',
                        img1      : 'resources/images/old-lady-dancing.png',
                        img2      : 'resources/images/old-lady-dancing.png',
                    }, {
                        name: 'Bhagwan S k',
                        status    : 0,
                        background: 'url(resources/images/img2.jpg)',
                        img1      : 'resources/images/lucky-cats-waving-hands.png',
                        img2      : 'resources/images/lucky-cats-waving-hands.png',
                    },
                ]
            },
            listeners: {
                itemtap: function() {
                    Ext.Viewport.animateActiveItem('tinkchat', {type: 'slide', direction: 'left'});
                }
            }
        });

        this.add(list);
		this.add(ttapp.util.Common.createMenuButton());
	}
});