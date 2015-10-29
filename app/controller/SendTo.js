Ext.define('ttapp.controller.SendTo', {
    extend: 'Ext.app.Controller',
    requires: ['ttapp.config.Config'],
    config: {
        refs: {
            searchContactsField: 'searchfield[cls~=search-contacts-field]',
            btnSendTink: 'button[cls~=clsSendTink]',
            textMsg: 'textareafield[cls~=text-msg-preview]',
            setUserName: 'label[cls~=user-name]'
        },
        control: {
            setUserName: {
                show: 'renderUserName'
            },
            'searchContactsField': {
                keyup: 'onSearchKeyUp',
                clearicontap: 'onSearchClearIconTap'
            },
            'btnSendTink': {
                tap: 'composeTink'
            },
            'sendto list': {
                itemtap: 'saveTappedContact'
            },
            'sendto list toolbar button': {
                tap: 'returnToTink'
            },
            'sendto': {
                show: 'onShowSendTo'
            },
            textMsg: {
                blur: 'hideKeyboard'
            }
        }
    },
    renderUserName: function() {
        this.setHtml(window.contactSelected.data.first_name+' '+window.contactSelected.data.last_name);
    },
    hideKeyboard: function(callback, scope) {
        var activeElement = document.activeElement;
        activeElement.setAttribute('readonly', 'readonly'); // Force keyboard to hide on input field.
        activeElement.setAttribute('disabled', 'true'); // Force keyboard to hide on textarea field.
        Ext.defer(function() {
            activeElement.blur();
            // Remove readonly attribute after keyboard is hidden.
            activeElement.removeAttribute('readonly');
            activeElement.removeAttribute('disabled');
        }, 100);
    },
    onShowSendTo: function(component) {
        console.log(this);
        this.phoneNumber = window.contactSelected.data.phone_number;
        this.setPreviewItems();
        component.add(ttapp.util.Common.createMenuButton());
        Ext.getCmp('sendToImage').setSrc(ttapp.config.Config.getBaseURL()+'/static/img/user_profile/'+window.contactSelected.data.phone_number+'.jpeg');
        Ext.select('.user-name').setHtml(window.contactSelected.data.first_name+' '+window.contactSelected.data.last_name);
    },
    setPreviewItems: function() {
        var prevTrinket = Ext.ComponentQuery.query('#previewTrinket')[0],
            secSent = Ext.ComponentQuery.query('#previewSeconds')[0];

        if (this.seconds_sent == null) {
            secSent.setHtml('--');
        } else {
            secSent.setHtml(this.seconds_sent);
            /*old code*/
            //secSent.setHtml(this.seconds_sent + "s");
        }

        Ext.getStore('trinketstore').getThumbnailPath(this.trinket_name, function(activeTrinketThumbnailPath) {
            prevTrinket.setSrc(activeTrinketThumbnailPath);
        });
    },
    saveTappedContact: function(list, idx, target, record, evt) {
        console.log(this);
        this.fullName = record.data.first_name + ' ' + record.data.last_name;
        this.phoneNumber = record.data.phone_number;
        this.getSearchContactsField().setValue(this.fullName);
        console.log(this);

        setTimeout(function() {
            Ext.getStore('phonecontacts').clearFilter();
            Ext.getCmp('contactsListToChoose').setHeight('0px');
            Ext.getCmp('contactsListToChoose').removeCls('show-list');
        }, 5);
    },
    clearAll: function() {
        var sf = Ext.ComponentQuery.query('searchfield[cls~=search-contacts-field]')[0];
        sf.reset();
        this.onSearchClearIconTap();
    },
    onSearchClearIconTap: function() {
        //call the clearFilter method on the store instance
        Ext.getStore('phonecontacts').clearFilter();
        Ext.getCmp('contactsListToChoose').setHeight('0px');
        Ext.getCmp('contactsListToChoose').removeCls('show-list');
    },
    returnToTink: function() {
        this.showTink();
        this.closeMe();
        Ext.ComponentQuery.query('#previewTextMsg')[0].setValue('');
    },
    onSearchKeyUp: function(field) {
        //debugger;
        var value = field.getValue(),
            store = Ext.getStore('phonecontacts');

        //first clear any current filters on thes tore
        store.clearFilter();

        //check if a value is set first, as if it isnt we dont have to do anything
        if (value) {
            var thisRegEx = new RegExp(value, "i");
            store.filterBy(function(record) {
                if (thisRegEx.test(record.get('first_name')) ||
                    thisRegEx.test(record.get('last_name')) ||
                    thisRegEx.test(record.get('phone_number'))) {
                    return true;
                }
                return false;
            });
        }

        if (field.getValue() === '') {
            Ext.getCmp('contactsListToChoose').setHeight('0px');
            Ext.getCmp('contactsListToChoose').removeCls('show-list');
        } else {
            Ext.getCmp('contactsListToChoose').setStore('phonecontacts');
            Ext.getCmp('contactsListToChoose').setHeight('100%');
            Ext.getCmp('contactsListToChoose').addCls('show-list');
        }
    },
    closeMe: function() {
        var cs = Ext.ComponentQuery.query('#choose-recepients')[0];
        setTimeout(function() {
            cs.destroy();
            console.log("destroy");
        }, 300);

    },
    inviteViaSms: function() {
        //console.log(this.phoneNumber);
        if (Ext.os.deviceType == 'Phone') {
            var sConf = {
                number: this.phoneNumber,
                message: "Join me on tinktime. Download app at http://tinktime.com/",
                intent: "INTENT",
                success: function() {
                    Ext.Viewport.setActiveItem('tink', 'slide');
                },
                error: function() {
                    Ext.Msg.alert('Cancelled', 'Sms not sent!', Ext.emptyFn);
                }
            };
            sms.send(sConf.number, sConf.message, sConf.intent, sConf.success, sConf.error);            
        }
    },
    composeTink: function(list, idx, target, record, evt) {
        var me = this;
        Ext.getStore('profilestore').getPhoneNumber(function(from_user) {
            var prevTextMsg = Ext.ComponentQuery.query('#previewTextMsg')[0];
            if (me.phoneNumber) {
                //is receipient on tinktime
                if (Ext.getStore('phonecontacts').isOnTinkTime(me.phoneNumber)) {
                    me.sendTink(from_user, me.phoneNumber, (new Date()).valueOf(), me.trinket_name, prevTextMsg.getValue(), me.seconds_sent);

                    //reset before leaving
                    //me.clearAll();
                    //me.closeMe();
                    Ext.ComponentQuery.query('#previewTextMsg')[0].setValue('');
                    me.showSplit();
                } else {
                    //ask for user confirmation to send sms
                    Ext.Msg.confirm(
                        "Invite?",
                        "Your friend is not using tinktime. Invite your friend to view me tink!",
                        function(buttonId) {
                            if (buttonId === 'yes') {
                                me.inviteViaSms();
                            }
                        }, me);
                }
                //me.clearAll();   
            } else {
                Ext.Msg.alert('Receiver?', 'Please choose a recipient.', Ext.emptyFn);
            }
        });

    },
    sendTink: function(from_user, to_user, send_timestamp, trinket_name, text, seconds_sent) {
        seconds_sent = seconds_sent.split(":");
        total_seconds = (parseInt(seconds_sent[0])*3600) + (parseInt(seconds_sent[1])*60) + (parseInt(seconds_sent[2]));
        total_seconds = total_seconds < 1? 1 : total_seconds;

        Ext.Ajax.request({
            url: ttapp.config.Config.getBaseURL() + '/message-queue/',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            disableCaching: false,
            jsonData: {
                "from_user": from_user,
                "to_user": to_user,
                "send_timestamp": send_timestamp,
                "trinket_name": trinket_name,
                "text": text,
                "seconds_sent": total_seconds,
                "unread": true
            },
            success: function(response) {
                console.log(response.responseText);
            }
        });
    },
    showSplit: function() {
        /*old code*/
        /*Ext.Viewport.setActiveItem('split', 'slide');*/

        Ext.Viewport.setActiveItem('tinkbox', 'slide');
        //Ext.ComponentQuery.query('#options')[0].setActiveItem(2, 'slide');
    },
    showTink: function() {
        Ext.Viewport.animateActiveItem('tink', {
            type: 'fade'
        });
        //Ext.ComponentQuery.query('#options')[0].setActiveItem(1, 'slide');
    },
    showSendTo: function(tinkView, seconds_sent, trinket_name) {
        this.seconds_sent = seconds_sent;
        this.trinket_name = trinket_name;

        Ext.Viewport.setActiveItem('sendto', 'slide');
    }
});
