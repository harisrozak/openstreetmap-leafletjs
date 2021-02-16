/**
 * References:
 * https://leafletjs.com/
 * https://github.com/derickr/osm-tools/tree/master/leaflet-nominatim-example
 */

var map;
var marker;
var search_results;
var selected_location = [9.345007359408424, 77.47961053999771];
var centered_location = selected_location;
var zoom_level        = 3;

(function($) {
	function load_map() {
		map                = new L.Map('map-canvas', { zoomControl: true });
		var osmUrl         = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
		var osmAttribution = 'Map data &copy; 2012 <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
		var osm            = new L.TileLayer(osmUrl, { maxZoom: 18, attribution: osmAttribution });

		map.setView( selected_location, zoom_level ).addLayer( osm );

		// on click map
		map.on('click', function (e) {
			selected_location = [e.latlng.lat, e.latlng.lng];
			update_map_info();
			set_marker();
		});

		// on zoom map
		map.on('zoomend', function() {
			zoom_level = map.getZoom()
			update_map_info();
		});
		
		// on move/drag map
		map.on('dragend', function() {
			set_centered_location();			
			update_map_info();
		});
	}

	function choose_address_result(key) {
		var result        = search_results[key];
		selected_location = [result.lat, result.lon];
		zoom_level        = 10;

		// set marker
		set_marker();

		// set the view
		map.setView( selected_location, zoom_level );

		// set centered location
		set_centered_location();

		// dislpay selected location
		update_map_info();
	}

	function set_marker() {
		// clean existing marker
		if (marker) {
			map.removeLayer(marker);
		}

		// set marker		
		marker = L.marker(selected_location, { draggable: true }).addTo(map);

		// action after drag marker
		marker.on('dragend', marker_dragend);
	}

	function keywords_search() {
		var keywords = $("#map-search-keywords").val();

		set_loading();

		$.getJSON('http://nominatim.openstreetmap.org/search?format=json&limit=5&q=' + keywords, function (data) {
			var items = [];
			
			// save to search_results
			search_results = data;

			$.each(data, function (key, val) {
				items.push('<li><a href="javascript:;" key="' + key + '">' + val.display_name + '</a></li>');
			});

			$('#map-search-results').empty();

			if (items.length != 0) {
				$('<p>', { html: "Search results:" }).appendTo('#map-search-results');
				$('<ul/>', {
					'class': 'my-new-list',
					html: items.join('')
				}).appendTo('#map-search-results');
			} else {
				$('<p>', { html: "No results found" }).appendTo('#map-search-results');
			}

			unset_loading();
		});
	}

	function set_centered_location() {
		var centered      = map.getCenter();
		centered_location = [centered.lat, centered.lng];
	}

	function set_loading() {
		$('#map-search-keywords').attr('disabled', 'disabled');
		$('#map-search-button').attr('disabled', 'disabled');
		$('#map-search-results').empty();
		$('<p>', { html: "Loading.." }).appendTo('#map-search-results');
	}

	function unset_loading() {
		$('#map-search-keywords').removeAttr('disabled');
		$('#map-search-button').removeAttr('disabled');
	}
	
	// display selected location
	function update_map_info() {
		// update displayed info
		$('#selected_lat').val(selected_location[0]);
		$('#selected_lng').val(selected_location[1]);
		$('#centered_lat').val(centered_location[0]);
		$('#centered_lng').val(centered_location[1]);
		$('#zoom_level').val(zoom_level);
	}

	// on marker dragend
	function marker_dragend( e ) {
		var lat = e.target._latlng.lat;
		var lng = e.target._latlng.lng;

		selected_location = [lat, lng];
		update_map_info();
	}

	// on click search button
	$('#map-search-button').on('click', function() {
		keywords_search();
	});

	// on enter search input
	$('#map-search-keywords').keypress(function(e) {
		var key = e.which;
		if ( 13 === key ) {
			keywords_search();
			return false;
		}
	}); 

	// on click address selection
	$('#map-search-results').on('click', 'ul li a', function() {
		var key = $(this).attr('key');
		choose_address_result(key);
	});

	// display initial selected location
	update_map_info();

	// start the map
	window.onload = load_map;
})(jQuery)