'use strict';

const $ = require('jquery');

class App {

	constructor( options ) {

		//setup any defaults
		this.defaults = {};

		//merge options with defaults
		this.settings = $.extend( true, {}, this.defaults, options );

		App.Features = App.Features || {};
		this.userAgent = navigator.userAgent.toLowerCase();
        this.$html = $('html');
		this.setup();
		this.header();
		this.noTouch();
		this.isTouch();
		this.isNewIE();
        this.isIE();
	}

	setup() {

		$('html').removeClass('no-js');

		$(document).ready(function() {
			$('body').addClass('page-loaded');

			// Bg Image fallback
			if( $('.isIE .bg-image, .isEDGE .bg-image').length ){
				var img = $('.bg-image img');
				img.each(function(){
					var src = $(this).prop('src'),
						wrap = $(this).parents('.bg-image');
					wrap
                        .css('background', 'url(' + src + ') center / cover no-repeat')
                        .addClass('bg-image--fallback');
				});
			}
		});
	}

	noTouch() {
		if ( ! ('ontouchstart' in window) ) {
            App.Features.noTouch = false;
            this.$html.addClass('noTouch');
            return;
        }
        App.Features.noTouch = false;
	}

	isTouch() {
		if ( 'ontouchstart' in window ) {
            App.Features.isTouch = false;
            this.$html.addClass('isTouch');
            return;
        }
        App.Features.isTouch = false;
	}

	isNewIE() {
		if (document.documentMode || /Edge/.test(navigator.userAgent)) {
            if(navigator.appVersion.indexOf('Trident') === -1) {
                this.$html.addClass('isEDGE');
            } else {
                this.$html.addClass('isIE isIE11');
            }
            return;
        }
        App.Features.isNewIE = false;
	}

	isIE() {
        if( navigator.appVersion.indexOf('MSIE') !== -1 ) {
            this.$html.addClass('isIE');
            App.Features.isIE = true;
            return;
        }
        App.Features.isIE = false;
    }


	header() {
		var trigger = $('.burger'),
			bd = $('body');

		trigger.click(function(){
			if(bd.hasClass('menu-is-open')){
				bd.removeClass('menu-is-open');
			} else {
				bd.addClass('menu-is-open');
			}
		});


		var el = $('.site-header'),
			navPos = el.offset().top,
			w = $(window),
			d = $(document);

		d.scroll(function() {
			if (w.scrollTop() > 50) {
				if( !el.hasClass('is-sticky') ){
					el.addClass('is-sticky');
				}
			} else {
				if( el.hasClass('is-sticky') ){
					el.removeClass('is-sticky');
				}
			}

		});
	}

}

module.exports = App;
