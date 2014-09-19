$(document).ready(function() {
	
	/* TODO: DO I need to resize the map w/ JavaScript 
	setMapSize();

	$(window).resize(function(){
		setMapSize();
	});	
	*/
	
	Best = Backbone.Model.extend({
		initialize: function(){		

		},
	
		defaults: {
		    "address": "713 N. Hill St.",
		    "api_reserve_url": "https://api.parkwhiz.com/reserve/?id=159028&start=1411048800&end=1411059600",
		    "api_url": "https://api.parkwhiz.com/p/los-angeles-parking/713-n-hill-st/?start=1411048800&end=1411059600",
		    "attended": 1,
		    "available_spots": 5,
		    "city": "Los Angeles",
		    "distance": 823,
		    "eticket": 0,
		    "indoor": 0,
		    "lat": 34.061375276486,
		    "listing_id": 159028,
		    "lng": -118.24044021964,
		    "location_id": 4834,
		    "location_name": "Unified Parking Service, Inc.",
		    "parkwhiz_url": "https://www.parkwhiz.com/p/los-angeles-parking/713-n-hill-st/?start=1411048800&end=1411059600",
		    "price": 4,
		    "price_formatted": "$4",
		    "recommendations": 1,
		    "reservation": 1,
		    "restroom": 0,
		    "rv": 0,
		    "security": 0,
		    "shuttle": 0,
		    "state": "CA",
		    "tailgate": 0,
		    "valet": 0,
		    "www_reserve_url": "https://www.parkwhiz.com/reserve/?id=159028&start=1411048800&end=1411059600",
		    "zip": "90012"
		}
	
	});
	
	best = new Best();

	Park = Backbone.View.extend({

		el: '#car-park',

		initialize: function(){
			this.render();
		    best.bind('change', _.bind(this.render, this));
		},

		template: _.template($("#car-park-template").html()),

		render: function() {

			var item = best.toJSON();
			
			console.log("rendering parking info.")
			console.log("current park", item)

			this.$el.html(this.template({ item }));
	
		}
	});
	
	park = new Park();
	
	parks = ["W Cesar E Chavez Ave, Los Angeles"]
	
	getAvailablity(null, parks[0])
				
});

/* https://www.parkwhiz.com/developers/search/ */

function getAvailablity(location, destination) {

	var now = new Date().getTime();
	var now = Date.now();
	
	var url = "http://api.parkwhiz.com/search/";
	var key = "54f0ee4aeaa3da89a056fe6b36ee820b";

	var new_url = url + "?" + "key=" + key + "&sort=distance";

	console.log(location, destination)
	if (location !== null) {
		// user the lat and lng; 
	} else {
		new_url += "&destination=" + destination + "&callback=?"
		console.log(new_url)
	}
	
	$.getJSON(new_url, function(data) {

		console.log("response", data)

	});
	
}

function getAmenities(item) {
	var list = [];
	
	var amenities = ["reservation", "restroom", "rv", "security", "shuttle", "tailgate", "attended", "eticket", "valet"]
	
	console.log("item", item)
	for (var i = 0; i < amenities.length; i++) {
		if (item[amenities[i]] !== null && item[amenities[i]] > 0) {
			list.push(amenities[i])
		}
	}
	
	return list;
}
