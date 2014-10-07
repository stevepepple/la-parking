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
		zoomControl: false,
		scrollWheelZoom: false
	});
	
	overview_Map = L.mapbox.map('overview_map', mapMain, {
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
			initParking();
		}
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
