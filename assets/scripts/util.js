String.prototype.toTitleCase = function () {
	var string = "";
	var words = this.split(" ");
  	for(keyvar in words) {
 		string += ' ' + words[keyvar].substr(0,1).toUpperCase()
    	+ words[keyvar].substr(1,words[keyvar].length);
  	}
  	return string;
}

/* Meters to Miles */
if (typeof(Number.prototype.toMiles) === "undefined") {
  Number.prototype.toMiles = function() {
    return this * 0.00062137;
  }
}

/* Miles to Meters */
if (typeof(Number.prototype.toMeters) === "undefined") {
  Number.prototype.toMeters = function() {
    return this * 1609.34;
  }
}


function codeAddress(address) {
	console.log("code this: ", address)
	geocoder.geocode( { 'address': address}, function(results, status) {
    	console.log(results, status)
		
    	if (status == google.maps.GeocoderStatus.OK) {

			
			var lat = results[0].geometry.location.lat();
			var lng = results[0].geometry.location.lng();
			console.log(results[0].formatted_address, lat, lng)
			
			var featureLayer = L.mapbox.featureLayer().addTo(map);

			L.marker([lat, lng]).addTo(featureLayer);
			
			map.fitBounds(featureLayer.getBounds());
			/*
          	var marker = new google.maps.Marker({
            	map: parkingMap,
            	position: results[0].geometry.location
          	});
			
        	parkingMap.setCenter(results[0].geometry.location);
			*/
			
        } else {
          console.log("Geocode was not successful for the following reason: " + status);
        }
    });
}
