var App = {};
var currentFeatures = [];
var currentLabels = [];

$(function() {
	App.scope = "nation";
	App.places = {};
	App.colors = [];
	App.children = [];

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


function getPlace(location) {
	map.setView(location, 17);
	
	var icon = L.icon({
	    iconUrl: 'images/icons/you.png',
	    iconSize:     [80, 48], // size of the icon
	});
	
	L.marker([location.lat, location.lng], { icon: icon }).addTo(map);
	
	var key = "AIzaSyA-YiurRX6GixuExPSrQgbcOwcUWinAn54";
	
	
	var coord = new google.maps.LatLng(location.lat, location.lng);

	var request = {
	    location : coord,
	    radius: '402', // .25 miles
		type: ['bus_station', 'transit_station', 'parking']
	};
	
	service = new google.maps.places.PlacesService(google_map);
	
	/* TODO: Move callback to a fucntion */
	service.nearbySearch(request, function(results, status){
		
		for (var i = 0; i < results.length; i++) {
			var place = results[i];
			
			//console.log(place.name, place.types, place.place_id);
			console.log(place);

			for (var j = 0; j < place.types.length; j++) {
				var type = place.types[j];
				
				if (type == "train_station" || type == "airport" || type == "bus_station") {
				
					var request = {
					 	placeId: place.place_id
					};
					
					service.getDetails(request, showDetails)
				};
				
			};
			
			console.log(place.types[0]);
			
			if(place.types[0] == "airport" || place.types[0] == "train_station") {
				
				var lat = place.geometry.location.lat();
				var lng = place.geometry.location.lng();

				var icon = L.icon({
				    iconUrl: 'images/icons/' + place.types[0] + '.png',
				    iconSize:     [40, 40], // size of the icon
				});
			
				L.marker([lat, lng], { icon: icon }).addTo(map);
				
			}

			/*
			L.marker([lat, lng], {
			    
				icon: L.mapbox.marker.icon({
			        'marker-size': 'large',
			        'marker-symbol': place.types[0],
			        'marker-color': '#fa0'
				})
			}).addTo(map);
			*/
			
			
			//createMarker(results[i]);
		}
		
	});
	
	
	
	//https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=500&types=food&name=cruise&key=
}

function showDetails(place, status) {
	if (status == google.maps.places.PlacesServiceStatus.OK) {
		console.log(place)
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