var App = {};
var currentFeatures = [];
var currentLabels = [];

$(function() {
	App.current = "";
	App.places = {};
	App.colors = [];
	App.children = [];
	
	App.circle_options =  {
         color: '#FFB934',      // Stroke color
         opacity: 0.8,         // Stroke opacity
         weight: 2,         // Stroke weight
         fillColor: '#000',  // Fill color
         fillOpacity: 0.0    // Fill opacity
	};

	App.Parks = Backbone.Model.extend();
	
	App.ParksList = Backbone.Collection.extend({
	   model: App.Parks,
	   url: '/scripts/parks.json'
	});
	
	/* TODO: include override for select Park */
	App.ParksUI = Backbone.View.extend({
		
		el: '#parks-list',
	
		template: _.template($("#parks-list-template").html()),
	
		events: {
			'click .select_park': 'selectPark',
		},

		// It's the first function called when this view it's instantiated.
		initialize: function(options){
			this.render();
			this.model = parks_list;
		},
	
		change: function(event) {
			console.log("Parks fetched or updated?");
			this.render();
		},
	
		render: function(){
			 this.$el.html(this.template({ parks: parks_list.toJSON()}));
			 return this;
		},
		
		selectPark: function(e) {
			var list = $(".select_park_list");

	 		list.show();
	 		list.find("li").bind("click", function(e){
	 			var text = $(this).find("span").text();
				
	 			park = _.findWhere(parks_list.toJSON(), { 'name' : text.toString() });
	 			App.current = park;
				var lat = App.current.coordinates[0];
				var lng = App.current.coordinates[1];
	 			var lat_lng = L.latLng(lat, lng);
				
				var query = $.query.set("lat", lat).set("lng", lng);
				
				/* Update the URL and the Bar Codee */
				window.history.pushState('location', App.current.name, '/map'  + query);
				
	 			getPlace(lat_lng);
				
				App.qrcode.makeCode(window.location.href);
		

	 		});
		}
		
	});

	App.PrintedDirections = Backbone.Model.extend({
		defaults: { 
			north : [], 
			east :[], 
			south : [], 
			west : []
		}
	});
	
	printed_directions = new App.PrintedDirections();
	
	App.CurrentPlace = Backbone.Model.extend({
		initialize: function(){		

		},
    
		defaults: {
			name: 'United States',
			type: 'nation',
			items: [{
				id: "country.4150104525",
				name: 'United States',
				type: 'country'
			}]
		}
	});
	
	Result = Backbone.Model.extend({
		initialize: function(){
			// intialized
		}
	});

	ResultsCollection = Backbone.Collection.extend({
	   model: Result
	});

});

function initParking() {
		
	parks_ui = new App.ParksUI()
	
	var list = parks_list.toJSON();
	
	App.current = list[0];
	var lat_lng = L.latLng(App.current.coordinates[0], App.current.coordinates[1]);
	getPlace(lat_lng);	
	
	App.qrcode = new QRCode(document.getElementById("qr_code"), {
	    text: window.location.href,
	    width: 200,
	    height: 200,
	    colorDark : "#C1C2C2",
	    colorLight : "#535755"
	});

}

function getPlace(location) {
	map.setView(location, 16);
	
	var icon = L.icon({
	    iconUrl: 'images/icons/you.png',
	    iconSize:     [80, 48], // size of the icon
	});
	
	L.marker([location.lat, location.lng], { icon: icon, zIndexOffset: 250 }).addTo(map);
	
	var distance = 0.258; // miles
	distance = distance.toMeters();
	
    var walk_range = L.circle([location.lat, location.lng], distance, App.circle_options).addTo(map);
	
	var bounds = walk_range.getBounds()
	map.fitBounds(bounds)
	parks_ui.render();
	
	/* TODO: put 5 minute marker here; Use north and lat center position?  */
	console.log(bounds.getNorthWest())
	
	var key = "AIzaSyA-YiurRX6GixuExPSrQgbcOwcUWinAn54";
	
	var coord = new google.maps.LatLng(location.lat, location.lng);

	var request = {
	    location : coord,
	    radius: distance + 100, // .25 miles
		types: ['airport', 'bus_station', 'transit_station', 'atm', 'park', 'church', 'city_hall', 'courthouse']
	};
	
	service = new google.maps.places.PlacesService(google_map);
	
	/* TODO: Move callback to a fucntion */
	service.nearbySearch(request, function(results, status){
		
		var used_types = [];
		var printed_places = { north : [], east :[], south : [], west : []}
		
		for (var i = 0; i < results.length; i++) {
			var place = results[i];
			//console.log("google place", place)
			
			/* TODO: Get details for every place? */
			for (var j = 0; j < place.types.length; j++) {
				var type = place.types[j];
				
				if (type == "train_station" || type == "airport" || type == "bus_station") {
				
					var request = { placeId: place.place_id };
					
					service.getDetails(request, showDetails)
				};
				
			}; 
						
			var lat = place.geometry.location.lat();
			var lng = place.geometry.location.lng();
			
			var type = place.types[0];
			var path = [coord, place.geometry]
			
			var heading = google.maps.geometry.spherical.computeHeading(coord, place.geometry.location);
			var direction = heading.heading_to_direction();
			
			if (direction == "north" || direction == "east" || direction == "south" || direction == "west") {
				// TODO: Show one (at most two) things for each matching place. 
			}
			
			/* Show up to 2 places in each direction */
			if (direction == "north" || direction == "east" || direction == "south" || direction == "west") {
				if (printed_places[direction].length < 2 && place.name !== printed_places[direction][0]) {
					var name = place.name.removeDuplicates();
					printed_places[direction].push(place.name.removeDuplicates())
					
					console.log("simplified name ", name, printed_places)

				}
			}
			
			/* For now, only show one of each type */
			if (used_types.indexOf(type) == -1) {
				var icon = L.icon({
				    iconUrl: 'images/icons/' + place.types[0] + '.png',
				    iconSize:     [40, 40], // size of the icon
				});
		
				L.marker([lat, lng], { icon: icon }).addTo(map);
				
				used_types.push(type);
								
			}
		}
		
		printed_directions.set(printed_places);
		directions_ui = new App.DirectionsUI();
		
		
	});
	
	//https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=500&types=food&name=cruise&key=
}

function showDetails(place, status) {
	if (status == google.maps.places.PlacesServiceStatus.OK) {
		console.log("place details: ", place)
	}
}

function clearFeatures() {

	/* TODO: clear any tooltips */
	$("#tooltip").hide();
	
	for (var i = 0; i < currentFeatures.length; i++) {
		map.removeLayer(currentFeatures[i]); 
	}
	
	for (var i = 0; i < currentLabels.length; i++) {
		var label = currentLabels[i].close();
	}
	
}