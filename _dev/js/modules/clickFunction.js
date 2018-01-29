'use strict';

const $ = require('jquery');
//const Q = require('q');

class ClickFunctions {

	constructor( options ) {

		//setup any defaults
		this.defaults = {};

		//merge options with defaults
		this.settings = $.extend( true, {}, this.defaults, options );

		if( $('*[data-click-target], *[data-click-group]').length ) {
			this.setup();
			this.events();
        } else {
            return;
        }
	}

	setup() {
		//any general setup code (ex. getting window width) can go here.
		//console.log('Click functions intialized');
	}

	events() {

		$('*[data-click-target]').on('click touchstart:not(touchmove)', function() {

            var trigger = $(this).attr('data-click-target'),
                bc = $(this).attr('data-click-bodyClass'),
                oc = $(this).attr('data-click-class'),
                target = $("#" + trigger);

            // Check for custom class
            if( $(this).attr('data-click-class') ) {
                if( target.hasClass(oc) ) {
                    target.removeClass(oc);
                } else {
                   target.addClass(oc);
                }
            } else {
                if( target.hasClass('is-active') ) {
                    target.removeClass('is-active');
                } else {
                   target.addClass('is-active');
                }
            }

            // Check for additional body class
            if( $(this).attr('data-click-bodyClass') ) {
                if( $('body').hasClass(bc) ) {
                    $('body').removeClass(bc);
                } else {
                   $('body').addClass(bc);
                }
            }
        });


		$('*[data-click-group]').click(function(){

            var group = $(this).attr('data-click-group');

            $('*[data-click-group=' + group + ']').each(function() {
                $(this).removeClass('selected');
            });

            $(this).addClass('selected');

        });


		var section = $('.js-page-section'),
            w = $(window);

        section.each(function(){

            var el = $(this),
				topPos = el.offset().top - 54,
                bottomPos = el.offset().top + el.innerHeight(),
                elId = '#' + el.attr('ID'),
                navLinks = $('.UnderlineNav-body a'),
                nav = $('.UnderlineNav-body a');

			w.resize(function() {
				topPos = el.offset().top - 54,
                bottomPos = el.offset().top + el.innerHeight();
			});

            function checkSection() {
                if ( w.scrollTop() >= topPos && w.scrollTop() < (bottomPos - 54) ){
                    if( !el.hasClass('active-section') ){
                        el.addClass('active-section');
                        navLinks.each(function(){
                            if( $(this).attr('href') == elId ) {
                                nav.removeClass('selected');
                                $(this).addClass('selected');
                            }
                        });

                    }
                } else {
                    if( el.hasClass('active-section') ){
                        el.removeClass('active-section');
                    }
                }
            }

            w.scroll(function() {
                checkSection();
            });

			w.resize(function() {
                checkSection();
            });

            $(document).ready(function() {
                checkSection();
            });

        });


		if( $('.side-nav').length ){

			$('.opportunities').slideUp();

			$('.show-details-toggle').click(function(){
				var el = $(this),
					details = el.parents('.level').find('.opportunities');

				if( el.hasClass('is-active')) {
					el.removeClass('is-active');
					details.slideUp();

					$('html, body').animate({
						scrollTop: details.offset().top - 86
					}, 400);

				} else {
					el.addClass('is-active');
					details.slideDown();
					$('html, body').animate({
						scrollTop: details.offset().top - 66
					}, 400);
				}

				$(window).trigger('resize');
			});

			var section = $('.js-interior-section'),
	            w = $(window);

	        section.each(function(){

	            var el = $(this),
					topPos = el.offset().top - 68,
	                bottomPos = el.offset().top + el.outerHeight(),
	                elId = '#' + el.attr('ID'),
	                navLinks = $('.side-nav a');

				w.resize(function() {
					setTimeout(function(){
						topPos = el.offset().top - 68,
						bottomPos = el.offset().top + el.outerHeight();
					}, 500);
				});

	            function checkSection() {
	                if ( w.scrollTop() >= topPos && w.scrollTop() < (bottomPos - 68) ){
	                    if( !el.hasClass('active-section') ){
	                        el.addClass('active-section');
	                        navLinks.each(function(){
	                            if( $(this).attr('href') == elId ) {
	                                navLinks.removeClass('selected');
	                                $(this).addClass('selected');
	                            }
	                        });

	                    }
	                } else {
	                    if( el.hasClass('active-section') ){
	                        el.removeClass('active-section');
	                    }
	                }
	            }

	            w.scroll(function() {
	                checkSection();
	            });

				w.resize(function() {
	                checkSection();
	            });

	            $(document).ready(function() {
	                checkSection();
	            });
	        });

		}

	}




}

module.exports = ClickFunctions;
