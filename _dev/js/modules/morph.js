'use strict';

const $ = require('jquery');

class Morph {

	constructor( options ) {

		//setup any defaults
		this.defaults = {};

		//merge options with defaults
		this.settings = $.extend( true, {}, this.defaults, options );
		var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);

		if( $('.morph').length && isChrome) {
			this.events();
			console.log(isChrome);
        } else {
			$('.svg-bg-2, .svg-1, .master-blob .bg-image').remove();
		    $('.master-blob').append('<img id="blob-fallback" src="/assets/images/marketing/home/Octoshop-fallback.png" alt="GitHub Universe Octoshop" />');
            return;
        }
	}

	events() {

		var blob = $('.morph'),
			d = $(document),
			w = $(window),
			mb = $('.master-blob'),
			blobIsHidden = false;

		if ( w.width() < 1012 ) {
		   mb.remove();
		   blobIsHidden = true;
		}

		w.resize(function(){
			if (w.width() < 1012) {
				if( blobIsHidden == false ) {
					mb.remove();
					blobIsHidden = true;
				}
			}
			else {
				if( blobIsHidden == true ){
					$('.blob-section').append(mb);
					blobIsHidden = false;
				}
			}
		});

		blob.each(function(){
			var el= $(this),
				start = el.find('.morph-start'),
				end = el.find('.morph-end');

			TweenMax.to(start, 8, {morphSVG: end, ease:Linear.easeNone, repeat:-1, yoyo: true});
		});


	}

}

module.exports = Morph;
