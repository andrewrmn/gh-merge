// ---------------------------------------------------------------------
// Global JavaScript
// Authors: Andrew Ross & a little help from my friends
// ---------------------------------------------------------------------

var andrewrossco = andrewrossco || {};

(function($, APP) {

    $(function() {
        APP.App.init();
		APP.Header.init();
        //APP.ClickFunciton.init();
        //APP.ClickGroup.init();
        //APP.Tabs.init();
        APP.ScrollTo.init();

        APP.Viewport.init();
        APP.Sections.init();

        APP.Lines.init();
    });

// ---------------------------------------------------------------------
// Browser and Feature Detection
// ---------------------------------------------------------------------

APP.App = {
    userAgent: undefined,
    $html: undefined,

    init: function() {
        APP.Features = APP.Features || {};
        this.userAgent = navigator.userAgent.toLowerCase();
        this.$html = $('html');
        this.noTouch();
        this.isTouch();
        this.isNewIE();
        this.isIE();

		$(document).ready(function() {
            $('body').addClass('page-loaded');
        });
    },

    noTouch: function() {
        if ( ! ('ontouchstart' in window) ) {
            APP.Features.noTouch = false;
            this.$html.addClass('noTouch');
            return;
        }
        APP.Features.noTouch = false;
    },

    isTouch: function() {
        if ( 'ontouchstart' in window ) {
            APP.Features.isTouch = false;
            this.$html.addClass('isTouch');
            return;
        }
        APP.Features.isTouch = false;
    },

    isNewIE: function() {
		if (document.documentMode || /Edge/.test(navigator.userAgent)) {
            if(navigator.appVersion.indexOf('Trident') === -1) {
                this.$html.addClass('isEDGE');
            } else {
                this.$html.addClass('isIE isIE11');
            }
            return;
        }
        APP.Features.isNewIE = false;
    },

    isIE: function() {
        if( navigator.appVersion.indexOf("MSIE") !== -1 ) {
            this.$html.addClass('isIE');
            APP.Features.isIE = true;
            return;
        }
        APP.Features.isIE = false;
    }

};


// ---------------------------------------------------------------------
// Header
// ---------------------------------------------------------------------

APP.Header = {

    init: function() {
		var trigger = $('.burger'),
			bd = $('body');

		trigger.click(function(){
			if(bd.hasClass('menu-is-open')){
				bd.removeClass('menu-is-open');
			} else {
				bd.addClass('menu-is-open');
			}
		});

		function animateLogo() {
			TweenLite.to('#git', 0.6, { height:"20px", autoRound: false });
			TweenLite.to('#merge', 0.6, { height:"20px", y: 0, x: 62, autoRound: false });
			TweenLite.to('#year', 0.6, { height:"20px", y: 0, x: 185, autoRound: false });
		}

		function animateLogoBack() {
			TweenLite.to('#git', 0.6, { height:"25px", autoRound: false });
			TweenLite.to('#merge', 0.6, { height:"25px", x: 0, y: 35,  autoRound: false });
			TweenLite.to('#year', 0.6, { height:"25px", x: 28, y: 71,  autoRound: false });
		}

		animateLogoBack();

		var el = $('.site-header'),
			navPos = el.offset().top,
			w = $(window),
			d = $(document);

		d.scroll(function() {
			if (w.scrollTop() > 10) {
				if( !el.hasClass('is-sticky') ){
					el.addClass('is-sticky');

					animateLogo();
				}
			} else {
				if( el.hasClass('is-sticky') ){
					el.removeClass('is-sticky');
					animateLogoBack();
				}
			}

		});
    }
};


// ---------------------------------------------------------------------
// Button BG
// ---------------------------------------------------------------------

APP.Sections = {

    init: function() {

        var section = $('.js-page-section'),
            w = $(window);

        section.each(function(){

            var el = $(this),
				topPos = el.offset().top - 54,
                bottomPos = el.offset().top + el.innerHeight(),
                elId = '#' + el.attr('ID'),
                navLinks = $('.main-nav a');

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
};



// ---------------------------------------------------------------------
// Detect when an element is in the viewport
// ---------------------------------------------------------------------

APP.Viewport = {

    init: function() {
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
				if(el.hasClass('in-view')){
					el.removeClass('in-view');
				}
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
    }
};



// ---------------------------------------------------------------------
// Line Animation
// ---------------------------------------------------------------------

APP.Lines = {

    init: function() {

        var line = $('line, path, circle, polyline, polygon, rect, ellipse');

		TweenLite.to(line, 0, {drawSVG:"0%"});

		line.each(function(){
			var el = $(this),
				par = el.parents('.shape-grid'),
				active = false,
                element = el.prop('tagName'),
                delay = 1;

            if( !el[0].hasAttribute('stroke-width') ) {
                TweenLite.to(el, 0, {alpha:0});
            }


			function checksvg() {
				if(par.hasClass('in-view')){
					if(active == false){
                        if(element == 'circle'){
                            delay = 2;
                        }
                        TweenLite.to(el, 1.6, {drawSVG:"100%", alpha:1}).delay(delay);
						active = true;
					}
				} else {
					if(active == true){
						TweenLite.to(el, 1, {drawSVG:"0%"});
						active = false;

                        if( !el[0].hasAttribute('stroke-width') ) {
                            TweenLite.to(el, 0, {alpha:0});
                        }
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
};




// ---------------------------------------------------------------------
// Scroll to
// Used for smooth scrolling to elements
// ---------------------------------------------------------------------

APP.ScrollTo = {

    init: function() {
        if( $('*[data-scroll-to]').length ) {
            this.bind();
        } else {
            return;
        }
    },

    bind: function() {

        $('*[data-scroll-to]').on('click touchstart:not(touchmove)', function() {

            var trigger = $(this).attr('data-scroll-to'),
                target = $("#" + trigger),
                ss = 1000, //scroll speed
                o = 0; // offset

            if( $(this).attr('data-scroll-speed') ) {
                ss = $(this).attr('data-scroll-speed');
            }

            if( $(this).attr('data-scroll-offset') ) {
                o = $(this).attr('data-scroll-offset');
            }

            $('html, body').animate({
                scrollTop: target.offset().top - o
            }, ss);
        });


    }
};



}(jQuery, andrewrossco));
