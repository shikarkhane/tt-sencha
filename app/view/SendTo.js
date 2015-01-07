Ext.define('ttapp.view.SendTo', {
    extend: 'Ext.Container',
    xtype: 'sendto',
    requires: ['ttapp.model.Contact','Ext.dataview.List','Ext.field.Search', 'Ext.Toolbar'],
    config: {
    	layout: 'fit',
    	items: [{
            xtype: 'list',
            ui: 'round',
            grouped: true,
            pinHeaders: false,
            scrollable: {
                direction: 'vertical'
            },
            itemTpl: '{first_name} {last_name}',
            store: 'Contacts',
	        items: [
	                {
	                    xtype: 'toolbar',
	                    docked: 'top',

	                    items: [
	                        { xtype: 'spacer' },
	                        {
	                            xtype: 'searchfield',
	                            id: 'searchContactsField',
	                            placeHolder: 'Search...'
	                        },
	                        { xtype: 'spacer' }
	                    ]
	                }
	                ]
	            }
        ]
    },
    getStore: function() {
        //check if a store has already been set
        if (!this.store) {
            //if not, create one
            this.store = Contacts;
        }

        //return the store instance
        return this.store;
    },
    onSearchKeyUp: function(field) {
    	debugger;
        //get the store and the value of the field
        var value = field.getValue(),
            store = this.getStore();

        //first clear any current filters on thes tore
        store.clearFilter();

        //check if a value is set first, as if it isnt we dont have to do anything
        if (value) {
            //the user could have entered spaces, so we must split them so we can loop through them all
            var searches = value.split(' '),
                regexps = [],
                i;

            //loop them all
            for (i = 0; i < searches.length; i++) {
                //if it is nothing, continue
                if (!searches[i]) continue;

                //if found, create a new regular expression which is case insenstive
                regexps.push(new RegExp(searches[i], 'i'));
            }

            //now filter the store by passing a method
            //the passed method will be called for each record in the store
            store.filter(function(record) {
                var matched = [];

                //loop through each of the regular expressions
                for (i = 0; i < regexps.length; i++) {
                    var search = regexps[i],
                        didMatch = record.get('firstName').match(search) || record.get('lastName').match(search);

                    //if it matched the first or last name, push it into the matches array
                    matched.push(didMatch);
                }

                //if nothing was found, return false (dont so in the store)
                if (regexps.length > 1 && matched.indexOf(false) != -1) {
                    return false;
                } else {
                    //else true true (show in the store)
                    return matched[0];
                }
            });
        }
    },

    /**
     * Called when the user taps on the clear icon in the search field.
     * It simply removes the filter form the store
     */
    onSearchClearIconTap: function() {
        //call the clearFilter method on the store instance
debugger;
        this.getStore().clearFilter();
    }
});