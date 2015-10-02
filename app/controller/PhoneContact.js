Ext.define('ttapp.controller.PhoneContact', {
	extend: 'Ext.app.Controller',
	config: {
		control: {
			'phoneContacts': {
                show: 'addContactList'
            },
            'phoneContacts searchfield': {
                keyup: 'searchPhoneContact',
                clearicontap: 'clear'
            },
            'phoneContacts dataview': {
                itemtap: 'contactTap'
            }
		}
	},
	searchPhoneContact: function(textfield, e, eOpts) {
		if (textfield.id == 'searchPhoneContact') {
            var queryString = textfield.getValue();
            var storelist = Ext.getStore("phonecontacts");
            storelist.clearFilter();
            if (queryString) {
                var thisRegEx = new RegExp(queryString, 'i');
                storelist.filterBy(function(record) {
                    if (thisRegEx.test(record.get('first_name'))) {
                        return true;
                    } 
                    return false;
                });
            }
        }
	},

	clear: function(textfield, e, eOpts) {
        if (textfield.id == 'searchPhoneContact') {
            var store = Ext.getStore("phonecontacts");
            store.clearFilter();
        }
    },

    addContactList: function(component) {

        var searchfield = Ext.create('Ext.field.Search', {
            id: 'searchPhoneContact',
            cls:'contact-search',
            clearIcon : false,
            placeHolder: 'Who are you thinking of?'
        });
        component.add(searchfield);

        var list = Ext.create('Ext.List', {
            cls:'phone-contact-list',
            emptyText: 'No contacts',
            height: '100%',
            itemTpl: [
                '<tpl>',
                    '<div class="inner-list">',
                        '<div class="img-name"><img src="resources/images/user-icon.png"> <span>{first_name} {last_name}</span></div> <div class="invite-btn-sec"><div class="invite-btn">Invite</div></div>',
                    '</div>',                    
                '</tpl>'
                // '<tpl if="status == 0">',
                //     '<div class="inner-list">',
                //         '<div class="img-name"><img src={avatar}> <span>{name}</span></div> <div class="invite-btn-sec"><div class="invite-btn">Invite</div></div>',
                //     '</div>',
                // '<tpl else>',
                //     '<div class="inner-list p-bar">',
                //         '<div class="img-name"><img src={avatar}> <span>{name}</span></div> <div class="circle" id={id}></div>',
                //     '</div>',
                    /* old */
                    /*'<div class="inner-list p-bar">',
                        '<div class="img-name"><img src={avatar}> <span>{name}</span></div> <div class="progress-pie-chart" id="progress-pie-chart-{id}" data-percent={percent}><div class="ppc-progress" id="ppc-progress-{id}"><div class="ppc-progress-fill" id="ppc-progress-fill-{id}"></div></div><div class="ppc-percents" id="ppc-percents-{id}"><div class="pcc-percents-wrapper"><span>%</span></div></div></div></div>',
                    '</div>',*/
                //'</tpl>'
            ],
            store: Ext.getStore('phonecontacts'),
            /*store: {
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
            },*/
            listeners: {
                'painted': {
                    fn: function(element) {
                        // store = Ext.getStore('contactsStore').getData().all;
                        // for(i=0; i<store.length; i++) {
                        //     if(store[i].data.status != 0) {
                        //         // (id, radius, border-width, percent)
                        //         //console.log(store[i].data.id);
                        //         testCircleCss(store[i].data.id, 20, 4, store[i].data.percent);
                        //         /*changeCircle(store[i].data.id);*/
                        //     }
                        // }
                    }
                }
            }
        });
        component.add(list);
        
        component.add(ttapp.util.Common.createMenuButton());
    },

    contactTap: function(list, idx, target, record, evt) {
        window.contactSelected = record;
        Ext.Viewport.animateActiveItem('trinket', {type: 'fade', direction: 'up', duration: 500, easing: 'ease-out'});
        Ext.getStore("phonecontacts").clearFilter();
        list.destroy();
        Ext.getCmp('searchPhoneContact').destroy();
    }
});