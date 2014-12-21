var stage;

(function() {
   // your page initialization code here
   // the DOM will be available here
	console.log('iframe - document ready');
	stage = new swiffy.Stage(document.getElementById('swiffycontainer'),
          swiffyobject, {  });

})();

function tt_start_animation(){
	console.log('start animation');
    stage.start();
};
function tt_stop_animation(){
	console.log('start animation');
	stage.destroy();
};
