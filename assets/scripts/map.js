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
	geocoder = L.mapbox.geocoder(mapMain);
	
	/* Bounds of the continetal US 
		TODO: Use maxBounds: [[77.54209596075547, -3.8671874999999996], [-3.162455530237848, -190.1953125]] ?
	*/
	map = L.mapbox.map('map', mapMain, {
		attributionControl: false,
		maxZoom: 18,
		minZoom: 6
	});
	
	map.fitBounds([[50.3454604086048, -64.072265625], [12.726084296948184, -142.734375]])

	var myStyle = {
	    "-moz-box-sizing" : "border-box",
	    "-webkit-box-sizing" : "border-box",
	    "box-sizing" : "border-box",
	    "color": "#EEEEEE",
	    "weight": 1.5,
	    "opacity": 0.65,
	};
	
	
	var latlng = L.latLng(34.056639, -118.237667);
	var coord = new google.maps.LatLng(latlng.lat, latlng.lng);
	
	var google_map = new google.maps.Map(document.getElementById('google_map'), { center: coord, zoom: 12 });
	
	/* Get Union Station */
	
	getPlace(latlng);
	
	
}

function setMapSize() {
	var height = $(window).height() - ($("#breadCrumbs").outerHeight() + $("header").outerHeight() + 8);
	
	/* FIXME: Fix small window condition properly */
	if (height > 600) {
		$("#map").height(height);
	}
}
