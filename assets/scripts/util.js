String.prototype.toTitleCase = function () {
	var string = "";
	var words = this.split(" ");
  	for(keyvar in words) {
 		string += ' ' + words[keyvar].substr(0,1).toUpperCase()
    	+ words[keyvar].substr(1,words[keyvar].length);
  	}
  	return string;
}


/* 0-180 Degree Radials to North, South, East, West */
if (typeof(Number.prototype.heading_to_direction) === "undefined") {
  Number.prototype.heading_to_direction = function() {

	var direction = "";
	
	if (this < 0 && this > -90) {
		direction = "north-west";
	}
	
	if (this <= 70 && this <= 110) {
		direction = "east"
	}
	 
	
	if (this > -180 && this <= -90) {
		direction = "south-west";
	}
	
	if (this > 0 && this <= 90) {
		direction = "north-east";
	}
	
	if (this > 90 && this <= 180) {
		direction = "north-east";
	}

	if (this <= 20 && this >= -20) {
		direction = "north"
	}
	
	if (this <= 160 && this <= -160) {
		direction = "south"
	}
	
	if (this <= -70 && this >= -110) {
		direction = "west"
	}

    return direction;
  }
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

// Take the following string
String.prototype.removeDuplicates = function() {
	var string = this;
	var arr = string.split(" ");
	var unique = [];

	$.each(arr, function (index,word) {
	    if ($.inArray(word, unique) === -1) 
	        unique.push(word);

	});
	
	return unique;
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
