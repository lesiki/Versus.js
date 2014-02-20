var versus;
$(function() {
	versus = new Versus();
});
Versus = function() {
	var
	resultLimit = 5,
	resultTemplate = Handlebars.compile($('#resultTemplate').html()),
	getSuggestions = function(text) {
		$.ajax({
			url: 'http://clients1.google.com/complete/search',
			dataType: 'jsonp',
			data: {
				q: text + ' vs ',
				nolabels: 't',
				client: 'psy',
				ds: ''
			},
			success: function(data) {
				console.log(JSON.stringify(data));
					 /*
				response($.map(data[1], function(item){
					return { value: $("<span>").html(item[0]).text() };
				}));
				*/
			}
		});
	},
	googleResponseHandler = function(data) {
		var i,
		currentResult;
		for(i = 0; i < Math.min(data.length, resultLimit); i++) {
			currentResult = {
				title: $(''+ data[1][i][0]).text()
			};
			$('#resultHolder').append(resultTemplate(currentResult));
		}
	},
	registerHandlers = function() {
		console.log('registered handlers');
		$('#submitSearch').click(function() {
			console.log('yep');
			var term = $('input[name=searchField]').val();
			if(term !== '') {
				getSuggestions(term));
			}
		});
	};

	// expose public methods
	this.getSuggestions = getSuggestions;

	// init
	console.log('init');
	registerHandlers();
}
