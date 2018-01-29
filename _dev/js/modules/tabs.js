'use strict';

const $ = require('jquery');

class Tabs {

	constructor( options ) {

		//setup any defaults
		this.defaults = {};

		//merge options with defaults
		this.settings = $.extend( true, {}, this.defaults, options );

		if( $('.subnav').length ) {
			//this.setup();
			this.events();
        } else {
            return;
        }
	}

	setup() {
		//any general setup code (ex. getting window width) can go here.
		// console.log('Tabs intialized');
	}

	events() {


		var tab = $('.tabs__tab'),
			tabBody = $('.tabs__content');

		tab.click(function(e){
			e.preventDefault();
			var group = $(this).parents('.tabs'),
				tabs = group.find('.tabs__tab'),
				tabsBody = group.find('.tabs__content');

			tabs.removeClass('selected');
			tabsBody.hide();

			$(this).addClass('selected');

			var tabId = $(this).attr('href'),
				target = $(tabId),
				graphs = target.find('*[data-detect-viewport]');

			graphs.addClass('in-view');

			target.fadeIn(300);

		});

	}

}

module.exports = Tabs;
