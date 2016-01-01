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

    removeList: function(component) {
        if(!Ext.isEmpty(Ext.getCmp('contactsList'))) {
            Ext.getCmp('contactsList').destroy();
        }
        if(!Ext.isEmpty(Ext.getCmp('searchPhoneContact'))) {
            Ext.getCmp('searchPhoneContact').destroy();
        }
    },

	searchPhoneContact: function(textfield, e, eOpts) {
		if (textfield.id == 'searchPhoneContact') {
            var queryString = textfield.getValue(),
								list = Ext.getCmp('contactsList');

						if (queryString) {
							var thisRegEx = new RegExp(queryString, 'i');
							this._filteredContacts = this._contacts.filter(function(record) {
								var name = record.first_name + " " + record.last_name;
				        if (thisRegEx.test(name)) {
				            return true;
				        } else {
				            return false;
				        }
							});

							list.getStore().setData(this._filteredContacts);
						}
						else {
							this._filteredContacts = null;
							list.getStore().setData(this._contacts);
						}


            // var storelist = Ext.getStore("phonecontacts");
            // storelist.clearFilter();

            // if (queryString) {
            //     var thisRegEx = new RegExp(queryString, 'i');
            //     storelist.filterBy(function(record) {
						// 				var name = record.data.first_name + " " + record.data.last_name;
            //         if (thisRegEx.test(name)) {
            //             return true;
            //         } else {
            //             return false;
            //         }
            //     });
            // }



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
        // store = Ext.getStore('phonecontacts').getData().items;

				var store = this._filteredContacts || this._contacts;

        for(i=0; i<store.length; i++) {
            if(store[i].on_tinktime !== false) {
                if(!Ext.isEmpty(store[i].time_split)) {
                    total_time = store[i].time_split.time_in + store[i].time_split.time_out;
                    percent = (store[i].time_split.time_out/total_time)*100;
                    //console.log(Math.ceil(percent));
                    // (id, radius, border-width, percent)
                    //testCircleCss(element.dom.firstChild.firstChild.firstChild.id, 50, 10, Math.ceil(percent));
                    if(store[i].time_split.time_out == 0) {
                        testCircleCss(store[i].id, 20, 4, 100);
                    } else {
                        testCircleCss(store[i].id, 20, 4, Math.ceil(percent));
                    }
                }
            }
        }
    },

    addContactList: function(component) {
        //ttapp.util.Common.askEULAPermission();

        component.add(ttapp.util.Common.createMenuButton());
        var searchfield = Ext.create('Ext.field.Search', {
            id: 'searchPhoneContact',
            cls:'contact-search',
            clearIcon : false,
            placeHolder: 'Who are you thinking of?'
        });
        component.add(searchfield);

        this._contacts = [];

        Ext.getStore('phonecontacts').each(function(record) {
                this._contacts.push(record.data)
        }, this);

        this._filteredContacts = null;

        if ( this._contacts.length == 0){
            ttapp.util.Common.askEULAPermission();
            return 0;
        }

        var list = Ext.create('Ext.List', {
            cls:'phone-contact-list',
            id:'contactsList',
            emptyText: 'No contacts',
            height: '100%',
            itemHeight: 80,
            infinite: true,
            itemTpl: [
                '<tpl if="on_tinktime == false">',/*\'false\'*/
                    '<div class="inner-list">',
                        '<div class="img-name"><div class="contact-img" style="background:url(resources/images/user-icon.png)"></div> <span>{first_name} {last_name}</span></div> <div class="invite-btn-sec"><div class="invite-btn">Invite</div></div>',
                    '</div>',
                '<tpl else>',
                    '<tpl if="profile_url != null">',
                        '<div class="inner-list p-bar">',
                            '<div class="img-name"><div class="contact-img" style="background:url({profile_url})"></div> <span>{first_name} {last_name}</span></div> <div class="circle" id={id}></div>',
                        '</div>',
                    '<tpl else>',
                        '<div class="inner-list p-bar">',
                            '<div class="img-name"><div class="contact-img" style="background:url(resources/images/user-icon.png)"></div> <span>{first_name} {last_name}</span></div> <div class="circle" id={id}></div>',
                        '</div>',
                    '</tpl>',
                '</tpl>'
            ],
            // store: Ext.getStore('phonecontacts'),
						data: this._contacts,
            listeners: {
                painted: function(list, eOpts) {
                    var record_count = Ext.getStore('phonecontacts').getTotalCount;
                    if(record_count > 0) {
                        ttapp.app.getController('PhoneContact').showCircles();
                    }
                }
            }
        });
        component.add(list);
    },

    contactTap: function(list, idx, target, record, evt) {
        window.contactSelected = record;
        if(evt.target.className == "invite-btn") {
					ttapp.util.Analytics.trackEvent('Contacts', 'Sent invite');

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
                sms.send(sConf.number, sConf.message, {
									android: {
		                intent: 'INTENT'  // send SMS with the native android SMS messaging
		                //intent: '' // send SMS without open any other app
			            }
								}, sConf.success, sConf.error);
            } else {
                console.log('Not on mobile device.');
            }
        } else {
            Ext.Viewport.animateActiveItem('trinket', {type: 'fade', direction: 'up', easing: 'ease-out'});
            // Ext.getStore("phonecontacts").clearFilter();
            list.destroy();
            //Ext.getCmp('searchPhoneContact').destroy();

						ttapp.util.Analytics.trackView('Trinket');
        }
    }
});
