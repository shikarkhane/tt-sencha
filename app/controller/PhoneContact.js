Ext.define('ttapp.controller.PhoneContact', {
	extend: 'Ext.app.Controller',
	config: {
		control: {
			'phoneContacts': {
                show: 'addContactList',
                hide: 'removeList'
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

    removeList: function(list, eOpts) {
        if(!Ext.isEmpty(Ext.getCmp('contactsList'))) {
            Ext.getCmp('contactsList').destroy();
        }
        if(!Ext.isEmpty(Ext.getCmp('searchPhoneContact'))) {
            Ext.getCmp('searchPhoneContact').destroy();
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
                    } else {
                        return false;
                    }
                });
            }
            ttapp.app.getController('PhoneContact').showCircles();
        }
	},

	// clear: function(textfield, e, eOpts) {
 //        console.log('clear');
 //        if (textfield.id == 'searchPhoneContact') {
 //            var store = Ext.getStore("phonecontacts");
 //            store.clearFilter();
 //        }
 //    },

    showCircles: function() {
        store = Ext.getStore('phonecontacts').getData().items;
        for(i=0; i<store.length; i++) {
            if(store[i].data.on_tinktime !== false) {
                if(!Ext.isEmpty(store[i].data.time_split)) {
                    total_time = store[i].data.time_split.time_in + store[i].data.time_split.time_out;
                    percent = (store[i].data.time_split.time_out/total_time)*100;
                    //console.log(Math.ceil(percent));
                    // (id, radius, border-width, percent)
                    //testCircleCss(element.dom.firstChild.firstChild.firstChild.id, 50, 10, Math.ceil(percent));
                    if(store[i].data.time_split.time_out == 0) {
                        testCircleCss(store[i].data.id, 20, 4, 100);
                    } else {
                        testCircleCss(store[i].data.id, 20, 4, percent);
                    }
                }
            }
        }
    },

    addContactList: function(component) {
        component.add(ttapp.util.Common.createMenuButton());

        var searchfield = Ext.create('Ext.field.Search', {
            id: 'searchPhoneContact',
            cls:'contact-search',
            clearIcon : false,
            placeHolder: 'Who are you thinking of?'
        });
        component.add(searchfield);

        var list = Ext.create('Ext.List', {
            cls:'phone-contact-list',
            id:'contactsList',
            emptyText: 'No contacts',
            height: '100%',
            itemTpl: [
                /*'<tpl>',
                    '<div class="inner-list">',
                        '<div class="img-name"><img src="resources/images/user-icon.png"> <span>{first_name} {last_name}</span></div> <div class="invite-btn-sec"><div class="invite-btn">Invite</div></div>',
                    '</div>',                    
                '</tpl>'*/

                '<tpl if="on_tinktime == false">',/*\'false\'*/
                    '<div class="inner-list">',
                        '<div class="img-name"><img src="resources/images/user-icon.png"> <span>{first_name} {last_name}</span></div> <div class="invite-btn-sec"><div class="invite-btn">Invite</div></div>',
                    '</div>',
                '<tpl else>',
                    '<div class="inner-list p-bar">',
                        '<div class="img-name"><img src="resources/images/user-icon.png"> <span>{first_name} {last_name}</span></div> <div class="circle" id={id}></div>',
                    '</div>',
                '</tpl>'
                /*'<tpl if="status == 0">',
                    '<div class="inner-list">',
                        '<div class="img-name"><img src={avatar}> <span>{name}</span></div> <div class="invite-btn-sec"><div class="invite-btn">Invite</div></div>',
                    '</div>',
                '<tpl else>',
                    '<div class="inner-list p-bar">',
                        '<div class="img-name"><img src={avatar}> <span>{name}</span></div> <div class="circle" id={id}></div>',
                    '</div>',*/
                    /* old */
                    /*'<div class="inner-list p-bar">',
                        '<div class="img-name"><img src={avatar}> <span>{name}</span></div> <div class="progress-pie-chart" id="progress-pie-chart-{id}" data-percent={percent}><div class="ppc-progress" id="ppc-progress-{id}"><div class="ppc-progress-fill" id="ppc-progress-fill-{id}"></div></div><div class="ppc-percents" id="ppc-percents-{id}"><div class="pcc-percents-wrapper"><span>%</span></div></div></div></div>',
                    '</div>',*/
                //'</tpl>'
            ],
            store: Ext.getStore('phonecontacts')
        });
        component.add(list);
        ttapp.app.getController('PhoneContact').showCircles();
    },

    contactTap: function(list, idx, target, record, evt) {
        window.contactSelected = record;
        if(evt.target.className == "invite-btn") {
            if (Ext.os.deviceType == 'Phone') {
                var sConf = {
                    number: record.data.phone_number,
                    message: "Join me on tinktime. Download app at http://tinktime.com/",
                    intent: "INTENT",
                    success: function() {
                        Ext.Viewport.setActiveItem('phoneContacts', 'slide');
                    },
                    error: function() {
                        Ext.Msg.alert('Cancelled', 'Sms not sent!', Ext.emptyFn);
                    }
                };
                sms.send(sConf.number, sConf.message, sConf.intent, sConf.success, sConf.error);            
            } else {
                console.log('Not on mobile device.');
            }
        } else {
            Ext.Viewport.animateActiveItem('trinket', {type: 'fade', direction: 'up', duration: 500, easing: 'ease-out'});
            Ext.getStore("phonecontacts").clearFilter();
            list.destroy();
            Ext.getCmp('searchPhoneContact').destroy();
        }
    }
});