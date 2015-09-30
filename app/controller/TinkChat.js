Ext.define('ttapp.controller.TinkChat', {
	extend: 'Ext.app.Controller',
	config: {
		control: {
			'tinkchat dataview': {
				itemtap: 'onChatSelect'
			},
			'tinkchat button': {
				tap: 'backToTinkBox'
			}
		}
	},

	onChatSelect: function(target, index, e, record, eOpts) {
		if(eOpts.target.nodeName == 'IMG') {
			Ext.Viewport.animateActiveItem
		}
	},
	backToTinkBox: function() {
		Ext.Viewport.animateActiveItem('tinkbox', {type: 'slide', direction: 'right'});
	}
});