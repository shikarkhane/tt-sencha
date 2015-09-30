Ext.define('ttapp.view.PhoneContacts', {
	extend: 'Ext.Container',
	xtype: 'phoneContacts',
    requires: [
        'ttapp.util.Common'
    ],
	config: {
        cls: 'bg-white-color',
		items: [
			{
                xtype: 'panel',
                docked: 'top',
                cls: 'new-header',
                items: [
                    {
                        xtype: 'panel',
                        cls: 'tinktime-logo',
                        docked: 'top'
                    }, {
                        xtype: 'searchfield',
                        cls:'contact-search',
                        clearIcon : false,
                        placeHolder: 'Who are you thinking of?'
                    }
                ]
            }
		]
	},
    initialize: function() {
        var list = Ext.create('Ext.List', {
            cls:'phone-contact-list',
            emptyText: 'No contacts',
            height: '100%',
            itemTpl: [
                '<tpl if="status == 0">',
                    '<div class="inner-list">',
                        '<div class="img-name"><img src={avatar}> <span>{name}</span></div> <div class="invite-btn-sec"><div class="invite-btn">Invite</div></div>',
                    '</div>',
                '<tpl else>',
                    '<div class="inner-list p-bar">',
                        '<div class="img-name"><img src={avatar}> <span>{name}</span></div> <div class="circle" id={id}></div>',
                    '</div>',
                    /* old */
                    /*'<div class="inner-list p-bar">',
                        '<div class="img-name"><img src={avatar}> <span>{name}</span></div> <div class="progress-pie-chart" id="progress-pie-chart-{id}" data-percent={percent}><div class="ppc-progress" id="ppc-progress-{id}"><div class="ppc-progress-fill" id="ppc-progress-fill-{id}"></div></div><div class="ppc-percents" id="ppc-percents-{id}"><div class="pcc-percents-wrapper"><span>%</span></div></div></div></div>',
                    '</div>',*/
                '</tpl>'
            ],
            store: {
                id: 'contactsStore',
                fields: [ 'percent', 'avatar', 'name', 'status', 'id'],
                data: [
                    {
                        avatar: 'resources/images/user-icon.png',
                        name: 'John Doe',
                        status: 0,
                        id: 10,
                        percent: ''
                    }, {
                        avatar: 'resources/images/user-icon.png',
                        name: 'John Doe',
                        status: 0,
                        id: 11,
                        percent: ''
                    }, {
                        avatar: 'resources/images/user-icon.png',
                        name: 'John Doe',
                        status: 1,
                        id: 12,
                        percent: 40
                    }, {
                        avatar: 'resources/images/user-icon.png',
                        name: 'John Doe',
                        status: 1,
                        id: 13,
                        percent: 63
                    }, {
                        avatar: 'resources/images/user-icon.png',
                        name: 'John Doe',
                        status: 1,
                        id: 14,
                        percent: 75
                    }, {
                        avatar: 'resources/images/user-icon.png',
                        name: 'John Doe',
                        status: 1,
                        id: 15,
                        percent: 100
                    }
                ]
            },
            listeners: {
                'painted': {
                    fn: function(element) {
                        store = Ext.getStore('contactsStore').getData().all;
                        for(i=0; i<store.length; i++) {
                            if(store[i].data.status != 0) {
                                // (id, radius, border-width, percent)
                                //console.log(store[i].data.id);
                                testCircleCss(store[i].data.id, 20, 4, store[i].data.percent);
                                /*changeCircle(store[i].data.id);*/
                            }
                        }
                    }
                }
            }
        });

        this.add(list);
        this.add(ttapp.util.Common.createMenuButton());
    }
});

