$(document).ready(function() {
	
	/* TODO: DO I need to resize the map w/ JavaScript 
	setMapSize();

	$(window).resize(function(){
		setMapSize();
	});	
	*/
		
	init();	
				
});

var mapMain = 'osaez.jhec8j0m';

function init() {
	
	App.DirectionsUI = Backbone.View.extend({
		
		el: '#directions',
	
		template: _.template($("#directions-template").html()),
	
		// It's the first function called when this view it's instantiated.
		initialize: function(options){
			this.render();
			this.model = printed_directions;
		},
	
		change: function(event) {
			console.log("Parks fetched or updated?");
			this.render();
		},
	
		render: function(){

			 this.$el.html(this.template({ directions : printed_directions.toJSON()} ));
			 return this;
		}
	});
	
	/* Have to add a Google Maps instance for the geocoder to work */
    var latlng = new google.maps.LatLng(34.05009932467703, -118.24962615966797);
	google_map = new google.maps.Map(document.getElementById("map-canvas"), { zoom: 8, center: latlng });
	
	geocoder = new google.maps.Geocoder();
	
	var myStyle = {
	    "-moz-box-sizing" : "border-box",
	    "-webkit-box-sizing" : "border-box",
	    "box-sizing" : "border-box",
	    "color": "#EEEEEE",
	    "weight": 1.5,
	    "opacity": 0.0,
	};
	
	var latlng = L.latLng(34.056639, -118.237667);
	var coord = new google.maps.LatLng(latlng.lat, latlng.lng);
	
	/* Get Union Station */
	
	map = L.mapbox.map('map', mapMain, {
		attributionControl: false,
		maxZoom: 18,
		minZoom: 6,
		zoomControl: false
	});
	
	overview_map = L.mapbox.map('overview_map', mapMain, {
		attributionControl: false,
		maxZoom: 18,
		minZoom: 6,
		zoomControl: false,
		scrollWheelZoom: false
	});
	

	map.fitBounds([[38.013476231041935, -91.5380859375], [28.806173508854776, -115.24658203125]]);
	
	parks_list = new App.ParksList();
	
	parks_list.fetch({
        success: function () {
			/* TODO: Make the list */
			initParking(getPlace);
		}
	});	
	
	scrollMap();
}

function getPlace(location) {
	
	clearFeatures();
	var featureLayer = L.mapbox.featureLayer();
	var overview_layer = L.mapbox.featureLayer();
	
	setTimeout(function(){
		
		if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
		 // some code..
			map.setView(location, 17);
			overview_map.setView(location, 10);

		} else {
			map.setView(location, 17);
			overview_map.setView(location, 13);
		}
		
	}, 200);
	
 	var icon = L.icon({
 	    iconUrl: 'images/icons/you.png',
 	    iconSize: [80, 48], // size of the icon
 	});
	
	var overview_icon = L.icon({ iconUrl: 'images/icons/you.png', iconSize: [60, 36], });	

	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {

	 	var icon = L.icon({
	 	    iconUrl: 'images/icons/you.png',
	 	    iconSize: [60, 36], // size of the icon
	 	});

	 	var parking = L.icon({
	 	    iconUrl: 'images/icons/parking.png',
			iconAnchor:   [42, 42],
	 	    iconSize: [28, 28], // size of the icon
	 	});
		
		L.marker([location.lat, location.lng], { icon: parking, zIndexOffset: 250 }).addTo(featureLayer);
	}
	
	L.marker([location.lat, location.lng], { icon: icon, zIndexOffset: 250 }).addTo(featureLayer);
	
	L.marker([location.lat, location.lng], { icon: overview_icon, zIndexOffset: 250 }).addTo(overview_map);
	
	var distance = 0.25; // miles
	distance = distance.toMeters();
	
	var overview = 1.0;
	overview_distance = overview.toMeters();
	
    var walk_range = L.circle([location.lat, location.lng], distance, App.circle_options);
	var overview_range = L.circle([location.lat, location.lng], overview_distance, App.circle_options);
	
	walk_range.addTo(featureLayer);
	overview_range.addTo(overview_layer);
	
	var bounds = walk_range.getBounds();
	var overview_bounds = overview_range.getBounds();

	parks_ui.render();
	
	/* TODO: put 5 minute marker here; Use north and lat center position?  */
	var icon = L.icon({
	    iconUrl: 'images/icons/5-min.png',
	    iconSize:  [160, 36]
	});
	
	var overview_icon = L.icon({
	    iconUrl: 'images/icons/15-min.png',
	    iconSize:  [136, 31]
	});
	
	L.marker([bounds.getNorth() - .001, bounds.getWest() + 0.0015], { icon: icon, zIndexOffset: 250 }).addTo(featureLayer);
	L.marker([overview_bounds.getNorth() - .004, overview_bounds.getWest() + 0.006], { icon: overview_icon, zIndexOffset: 250 }).addTo(overview_layer);
	
	var key = "AIzaSyA-YiurRX6GixuExPSrQgbcOwcUWinAn54";
	
	var coord = new google.maps.LatLng(location.lat, location.lng);

	service = new google.maps.places.PlacesService(google_map);
	
	/* Get Bus Info */
	var request = { location : coord, radius: distance + 10, types: ['bus_station'] };
	
	service.nearbySearch(request, showBuses);
	
	/* TODO: Move callback to a fucntion */
	var types = ['airport', 'atm', 'park', 'cafe', 'cemetery', 'church', 'city_hall', 'courthouse', 'department_store', 'hospital', 'museum', 'police', 'restaurant', 'school', 'stadium', 'university'];
	var request = {
	    location : coord,
	    radius: distance + 40, // .25 miles
		types: types
	};

	service.nearbySearch(request, showPlaces);
	
	featureLayer.addTo(map);
	overview_layer.addTo(overview_map);
	
	map.fitBounds(featureLayer.getBounds());
	App.features.push(featureLayer);
	App.features.push(overview_layer);
	
	function showPlaces(results, status) {
		used_types = [];
		var all_types = [];
		var printed_places = App.current.printed_places;
		var important = ['train_station', 'airport', 'bus_station', 'park', 'cemetery', 'church', 'city_hall', 'courthouse', 'department_store']
	
		for (var i = 0; i < results.length; i++) {
			var place = results[i];
		
			/* TODO: Get details for every place? */
			for (var j = 0; j < place.types.length; j++) {
				var type = place.types[j];
			
				if (type == "train_station" || type == "airport" || type == "bus_station") {
			
					var request = { placeId: place.place_id };
				
					service.getDetails(request, showDetails)
				};
			
			}; 
								
			var type = place.types[0];
			var path = [coord, place.geometry]
		
			var heading = google.maps.geometry.spherical.computeHeading(coord, place.geometry.location);
			var direction = heading.heading_to_direction();
								
			/* Show up to 2 places in each direction */
			if (direction == "north" || direction == "east" || direction == "south" || direction == "west") {
				if (printed_places[direction].length < 2 && place.name !== printed_places[direction][0] ) {
					
					if (used_types.indexOf(type) == -1 && important.indexOf(type) !== -1) {
						show_icon(place);
						printed_places[direction].push(place.name)
						
					}
				}
			}
		
			/* For now, only show one of each type */
			if (used_types.indexOf(type) == -1 || important.indexOf(type) !== -1) {
				if (types.indexOf(type) !== -1) {
					show_icon(place);
					
					/* Only show one of each type */
					used_types.push(type);
				}
			}
		
		}
		
		printed_directions.set(printed_places);
		directions_ui = new App.DirectionsUI();
	
		function show_icon(place) {
			var lat = place.geometry.location.lat();
			var lng = place.geometry.location.lng();
	
			var icon = L.icon({
			    iconUrl: 'images/icons/' + place.types[0] + '.png',
			    iconSize:     ['36', '36'], // size of the icon
			});
			
			if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {

				var icon = L.icon({
				    iconUrl: 'images/icons/' + place.types[0] + '.png',
				    iconSize:     ['29', '28'], // size of the icon
				});
		
			}
			

			var marker = L.marker([lat, lng], { icon: icon });
			//marker.feature.properties.title = 'Capital Pride Parade'
			marker.bindPopup(place.name);
			marker.addTo(featureLayer)
		}
	}
	
	function showBuses(results, status) {
		for (var i = 0; i < 4; i++) {
			var place = results[i];
		
			/* Get details for every place? */
			for (var j = 0; j < place.types.length; j++) {
				var type = place.types[j];
			
				if (type == "train_station" || type == "airport" || type == "bus_station") {
			
					var request = { placeId: place.place_id };
					service.getDetails(request, showBus)
				};
			}; 
		}
		
		function showBus(place, status) {
			if (status == google.maps.places.PlacesServiceStatus.OK) {
				
				var lat = place.geometry.location.lat();
				var lng = place.geometry.location.lng();
	
				var icon = L.icon({
				    iconUrl: 'images/icons/' + place.types[0] + '.png',
				    iconSize:     [28, 28], // size of the icon
				});

				L.marker([lat, lng], { icon: icon }).addTo(featureLayer);
				
			}
		}
		
	}
		
	//https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=500&types=food&name=cruise&key=
}

function showParking() {
	var parks = parks_list.toJSON();
	var featureLayer = L.mapbox.featureLayer()
	
	_.each(parks, function(park, index) {
		clearFeatures();
		
		console.log(park);
		
		var icon = L.icon({
		    iconUrl: 'images/icons/parking.png',
		    iconSize: [40, 40], // size of the icon
		});
		
		L.marker([park.coordinates[0], park.coordinates[1]], { icon: icon, zIndexOffset: 250 }).addTo(featureLayer);
	
	});
	
	featureLayer.addTo(map);
	map.fitBounds(featureLayer.getBounds());
	
}

function scrollMap() {
    var timeout;

    window.addEventListener('scroll', function(ev) {

        if (timeout) {
            clearTimeout(timeout);
        }

        timeout = setTimeout(function() {

            if (window.scrollY > 0) {
                var cover = document.querySelector('div.cover');
                cover.style.display = 'none';
            }

        }, 200);

    });
}

function setMapSize() {
	/*
	var height = $(window).height() - ($("#breadCrumbs").outerHeight() + $("header").outerHeight() + 8);
	
	// FIXME: Fix small window condition properly 
	if (height > 600) {
		$("#map").height(height);
	}
	*/
}
