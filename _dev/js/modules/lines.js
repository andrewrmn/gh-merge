'use strict';

const $ = require('jquery');

class Lines {

	constructor( options ) {

		//setup any defaults
		this.defaults = {};

		//merge options with defaults
		this.settings = $.extend( true, {}, this.defaults, options );

		if( $('.line').length ) {
			this.lines();
        } else {
            return;
        }
	}

	lines() {

		var line = $('.line');

		TweenLite.to(line, 0, {drawSVG:"0%"});

		line.each(function(){
			var el = $(this),
				par = el.parents('svg'),
				active = false;

			function checksvg() {
				if(par.hasClass('in-view')){
					if(active == false){
						TweenLite.to(el, 2, {drawSVG:"100%"}).delay(1);
						active = true;
					}
				} else {
					if(active == true){
						TweenLite.to(el, 1, {drawSVG:"0%"});
						active = false;
					}
				}
			}

			$(window).on("resize scroll", function(){
				checksvg();
			});
			$(document).ready(function(){
				checksvg();
			});

		});
	}

}

module.exports = Lines;
