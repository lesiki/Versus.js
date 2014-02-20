var versus;
$(function() {
	versus = new Versus();
});
Versus = function() {
	var
	resultLimit = 5,
	lastResult,
	resultTemplate = Handlebars.compile($('#resultTemplate').html()),
	getSuggestions = function(text) {
		$('div.input').addClass('loading');
		lastResult = [];
		$.ajax({
			url: 'http://clients1.google.com/complete/search',
			dataType: 'jsonp',
			data: {
				q: text + ' vs ',
				nolabels: 't',
				client: 'psy',
				ds: ''
			},
			success: googleResponseHandler
		});
	},
	googleResponseHandler = function(data) {
		var i,
		currentResult;
		for(i = 0; i < Math.min(data.length, resultLimit); i++) {
			currentResult = {
				title: $(''+ data[1][i][0]).text()
			};
			lastResult.push(currentResult);
		}
		getLinks();
	},
	getLinks = function() {
		// TODO search for links of interest for the result. Returning google search link
		var i, currentResult;
		for(i = 0; i < lastResult.length; i++ ) {
			lastResult[i].linkUrl = 'google.com/search?q=' + lastResult[i].title;
			lastResult[i].linkTitle = 'Search for ' + lastResult[i].title + ' on google';
		}
		renderResults();
	},
	renderResults = function() {
		$('#resultHolder').html('');
		$('div.input').removeClass('loading');
		var i, currentResult;
		for(i = 0; i < lastResult.length; i++ ) {
			$('#resultHolder').append(resultTemplate(lastResult[i]));	
		}
	},
	registerHandlers = function() {
		$('#submitSearch').click(submitSearchHandler);
		$('input[name=searchField]').keypress(function(e) {
			if(e.which == 13) {
				submitSearchHandler();
			}
		});
	},
	submitSearchHandler = function() {
		var term = $('input[name=searchField]').val();
		if(term !== '') {
			getSuggestions(term);
		}
	};

	// expose public methods
	this.getSuggestions = getSuggestions;

	// init
	registerHandlers();
}
