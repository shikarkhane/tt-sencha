Ext.define('ttapp.view.Landing', {
	extend: 'Ext.Container',
	xtype: 'landing',
	requires: ['Ext.Label'],
	config:{
		fullscreen: true,		
		layout: 'vbox',
		cls: 'bg-transparent',
		items: 
		  [{
		  	xtype:'panel',
		  	cls:'landing-page',
		  	items:[{
			  	xtype:'panel',
			  	cls:'logo'
			  },{
				xtype: 'button',
				text: "begin",
				cls: "clsBegin"
			}]
		  }]

	}
 });