'use strict';

const $ = require('jquery');

class Viewport {

	constructor( options ) {

		//setup any defaults
		this.defaults = {};

		//merge options with defaults
		this.settings = $.extend( true, {}, this.defaults, options );

		this.events();
	}


	events() {
		//	https://jsfiddle.net/b1ayxuqm/


		$.fn.isOnScreen = function(){
			var elementTop = $(this).offset().top,
				elementBottom = elementTop + $(this).outerHeight(),
				viewportTop = $(window).scrollTop(),
				viewportBottom = viewportTop + $(window).height();
			return elementBottom > viewportTop && elementTop < viewportBottom;
		};

		var items = document.querySelectorAll('*[data-animate-in], *[data-detect-viewport]');

		function detection(el) {
			if( el.isOnScreen() ){
				if(!el.hasClass('in-view')){
					el.addClass('in-view');
				}
			} else {
				// if(el.hasClass('in-view')){
				// 	el.removeClass('in-view');
				// }
			}
		}

		$(window).on("resize scroll", function(){
			for(var i = 0; i < items.length; i++) {
				var el = $( items[i] );
				detection(el);
			}
		});

		$(document).ready(function(){
			for(var i = 0; i < items.length; i++) {
				var d = 0,
					el = $( items[i] );
				if( items[i].getAttribute('data-animate-in-delay') ) {
					d = items[i].getAttribute('data-animate-in-delay') / 1000 + 's';
				} else {
					d = 0;
				}
				el.css('transition-delay', d);

				 detection(el);
			}
		});


		// $(document).ready(function(){
		// 	detection();
		// });

			// var el = $(this),
			// 	par = el.parents('svg'),
			// 	active = false;

			// function checksvg() {
			// 	if(par.hasClass('in-view')){
			// 		if(active == false){
			// 			TweenLite.to(el, 2, {drawSVG:"100%"}).delay(1);
			// 			active = true;
			// 			console.log('show');
			// 		}
			// 	} else {
			// 		if(active == true){
			// 			TweenLite.to(el, 1, {drawSVG:"0%"});
			// 			active = false;
			// 			console.log('hide');
			// 		}
			// 	}
			// }



		//});
		/////////////////////
		// function detection() {
		// 	for(var i = 0; i < items.length; i++) {
		// 		///var active = false;
		// 		var el = $( items[i] );
		// 		if( el.isOnScreen() ){
		// 			if(active == false){
		// 				el.addClass('in-view');
		// 				console.log('show item');
		// 				active = true;
		// 			}
		//
		// 		} else {
		// 			if(active == true){
		// 				el.removeClass('in-view');
		// 				active = false;
		// 				console.log('hide item');
		// 			}
		// 		}
		// 	}
		// }
		//

		//
		// $(window).on("resize scroll", function(){
		// 	detection();
		// });
		//


	}

}

module.exports = Viewport;
