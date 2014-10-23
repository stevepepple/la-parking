# Wayfinding Map for Info Kiosk

This is one part of my idea for transforming parking lots into a place for wayfinding, city information, and access to public transportation. As part of this project I wanted to create a beautiful looking map that was also dynamically generated using web technologies.

This project was created for Ford's Parking Lot 2.0 challenge. [Vote for the project](http://parking.challengepost.com/submissions/28099-parking-kiosks-for-urban-wayfinding-park-here-l-a)

[Read a full description of the project here](https://medium.com/urban-design-and-planning/payment-kiosks-for-urban-wayfinding-park-here-l-a-172720c4cba6)


<img src="https://d262ilb51hltx0.cloudfront.net/max/1000/1*NumPBa7C8RBJO2iFfEsgvw.jpeg"/>

## Map

This project uses a Node.js application that loads the scalable map and then fetches dynamic information for each location using the Google Places API. The idea being that popular places change frequently, so the map can be refreshed based upon Google categorization and ranking of places.

I used Backbone.js for the MV* framework.

###[Dynamic wayfinding map](http://la-parking.herokuapp.com/map) 

The wayfinding map displays the user current location in relation to the nearby surroundings. I created the visual design of the scalable map using [Mapbox Studio](https://www.mapbox.com/mapbox-studio/#darwin). This map will actually work for any major city in the United States. I then added several transit layers using the [L.A. county GIS data portal](http://egis3.lacounty.gov/dataportal/), the [LA Metro developer portal](http://developer.metro.net/introduction/gis-data/download-gis-data/), and https://data.lacity.org.

Mapbox studio is a great tool that allows you to style maps with CSS. Here's a basic example from my project:

```
@land: #88888A;
@water: #8B9FAC;
@motorway:          #424645;
@main:              #424645;
@street:            #424645;
@street_limited:    #424645;
  
Map {
  [zoom>=17] {
    background-color: @land; 
  }
  buffer-size: 256;
}

@land: #88888A;
@water: #8B9FAC;
  
#building [zoom<=14]{
  // At zoom level 13, only large buildings are included in the
  // vector tiles. At zoom level 14+, all buildings are included.
  polygon-fill: darken(@land, 20%);
  opacity: 0.0;
}

#place_label[zoom>=8][localrank<=3] {
  text-name: @name;
  text-face-name: @sans;
  text-wrap-width: 120;
  text-wrap-before: true;
  text-fill: #FFF;
}
```

[Here is a link to the styled tiles](https://api.tiles.mapbox.com/v4/osaez.0u8ilik9/page.html?access_token=pk.eyJ1Ijoib3NhZXoiLCJhIjoiOExKN0RWQSJ9.Hgewe_0r7gXoLCJHuupRfg#19/34.04900/-118.23970), which are hosted with Mapbox. 

The map generates a QR code for the current location. This was super easy to implement using the [QRCode.js library](https://github.com/davidshimjs/qrcodejs).

## Parking

###[Real-time parking availability and information](http://la-parking.herokuapp.com/parking)

The parking application uses the [ParkWhiz developer API](http://www.parkwhiz.com/developers/) to show the current availability of parking at the current location, including the current price, number of available spaces, and a list of amenities, such as reserved parking, restrooms, and shuttle service. This application would integrate with an existing payment system and in some cases accept mobile payment. An electronic or printed receipt would include the location of the parking structure and a QR code link to the information map.

The ParkWhiz API works well. (However, in many responses the number of available spaces seems to frequently return 10 spaces.) 

<table>
	<thead>
	<tr>
		<th>Icon</th>
		<th>Description</th>
	</tr>
	</thead>
	<tbody>
	<tr>
		<td><img src="https://raw.githubusercontent.com/stevepepple/la-parking/master/assets/images/icons/attended.png" width="40px"/></td>
		<td>Has on-site parking attendant or valet</td>
	</tr>
	<tr>
		<td><img src="https://raw.githubusercontent.com/stevepepple/la-parking/master/assets/images/icons/bus_station.png" width="40px"/></td>
		<td>There is nearby bus service (added by me, as I've only selected parking lots near public transit)</td>
	</tr>
	<tr>
		<td><img src="https://raw.githubusercontent.com/stevepepple/la-parking/master/assets/images/icons/charging_station.png" width="40px"/></td>
		<td>Has a charging station for electric vehicles</td>
	</tr>
	
	<tr>
		<td><img src="https://raw.githubusercontent.com/stevepepple/la-parking/master/assets/images/icons/eticket.png" width="40px"/></td>
		<td>Accepts mobile payment</td>
	</tr>
	<tr>
		<td><img src="https://raw.githubusercontent.com/stevepepple/la-parking/master/assets/images/icons/handicap.png" width="40px"/></td>
		<td>Includes handicap accessible spaces</td>
	</tr>
	<tr>
		<td><img src="https://raw.githubusercontent.com/stevepepple/la-parking/master/assets/images/icons/indoor.png" width="40px"/></td>
		<td>Indoor or covered parking</td>
	</tr>
	<tr>
		<td><img src="https://raw.githubusercontent.com/stevepepple/la-parking/master/assets/images/icons/reentry_allowed.png" width="40px"/></td>
		<td>Allows re-entry to the parking structure</td>
	</tr>
	<tr>
		<td><img src="https://raw.githubusercontent.com/stevepepple/la-parking/master/assets/images/icons/reserved.png" width="40px"/></td>
		<td>Allows re-entry to the parking structure</td>
	</tr>
	<tr>
		<td><img src="https://raw.githubusercontent.com/stevepepple/la-parking/master/assets/images/icons/restroom.png" width="40px"/></td>
		<td>Has restrooms</td>
	</tr>
	<tr>
		<td><img src="https://raw.githubusercontent.com/stevepepple/la-parking/master/assets/images/icons/security.png" width="40px"/></td>
		<td>Has on-site security</td>
	</tr>
	<tr>
		<td><img src="https://raw.githubusercontent.com/stevepepple/la-parking/master/assets/images/icons/shuttle.png" width="40px"/></td>
		<td>Has a shuttle service</td>
	</tr>
	</tbody>
</table>

## Running Locally

Make sure you have [Node.js](http://nodejs.org/) and the [Heroku Toolbelt](https://toolbelt.heroku.com/) installed.

```sh
$ git clone https://github.com/stevepepple/la-parking.git # or clone your own fork
$ cd node-js-getting-started
$ npm install
$ bower install
$ npm start
```

The app will run on [localhost:5000](http://localhost:5000/map).
