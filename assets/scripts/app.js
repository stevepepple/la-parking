var App = {};

$(function() {
	App.current = "";
	App.places = {};
	App.colors = [];
	App.children = [];
	App.features = [];
	
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
			this.options = options;
			this.model = parks_list;
			
			console.log("UI contrustor: ", this.options)
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
			
			var callback = this.options.callback;
			
			var list = $(".select_park_list");

	 		list.show();
			
			$("body").mouseup(function(){ 
				if (!list.is(e.target) && list.has(e.target).length === 0) {
					list.hide();
				}
			});
			
	 		list.find("li").bind("click", function(e){
	 			var text = $(this).find("span").text();
				
	 			park = _.findWhere(parks_list.toJSON(), { 'name' : text.toString() });
	 			App.current = park;
				var lat = App.current.coordinates[0];
				var lng = App.current.coordinates[1];
	 			var lat_lng = L.latLng(lat, lng);
				
				var query = $.query.set("lat", lat).set("lng", lng);
				var url =  window.location.pathname + query;
				
				/* Update the URL and the Bar Codee */
				window.history.pushState('location', App.current.name, url);
				
	 			callback(lat_lng);
				
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

function initParking(callback) {
		
	parks_ui = new App.ParksUI({ callback : callback })
	
	var list = parks_list.toJSON();
	
	App.current = list[0];
	var lat_lng = L.latLng(App.current.coordinates[0], App.current.coordinates[1]);
	
	callback(lat_lng);
	
	App.qrcode = new QRCode(document.getElementById("qr_code"), {
	    text: window.location.href,
	    width: 200,
	    height: 200,
	    colorDark : "#C1C2C2",
	    colorLight : "#535755",
		correctLevel : QRCode.CorrectLevel.M
	});
}

function showDetails(place, status) {
	if (status == google.maps.places.PlacesServiceStatus.OK) {
		//console.log("place details: ", place)
	}
}

function clearFeatures() {

	for (var i = 0; i < App.features.length; i++) {
		map.removeLayer(App.features[i]); 
	}
		
}