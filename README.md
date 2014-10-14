# Wayfinding Kiosk

This is one part of my idea for transforming parking lots into a place for wayfinding, city information, and access to public transportation. 

This project was created for Ford's Parking Lot 2.0 challenge. 


## Map

###[Dynamic wayfinding map](http://la-parking.herokuapp.com/map) 

The wayfinding map displays the user current location in relation to the nearby surroundings. I created the visual design of the scalable map using Mapbox Studio. This map will actually work for any major city in the United States. I then added several transit layers using the L.A. county GIS data portal, the LA Metro developer portal, and https://data.lacity.org.

The software itself is a Node.js application that loads the scalable map and then fetches dynamic information for each location using the Google Places API. The idea being that popular places change frequently, so the map can be refreshed based upon Google categorization and ranking of places.

## Parking

###[Real-time parking availability and information](http://la-parking.herokuapp.com/parking)

The parking application uses the ParkWhiz developer API to show the current availability of parking at the current location, including the current price, number of available spaces, and a list of amenities, such as reserved parking, restrooms, and shuttle service. This application would integrate with an existing payment system and in some cases accept mobile payment. An electronic or printed receipt would include the location of the parking structure and a QR code link to the information map.

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
$ git clone git@github.com:heroku/node-js-getting-started.git # or clone your own fork
$ cd node-js-getting-started
$ npm install
$ npm start
```

Your app should now be running on [localhost:5000](http://localhost:5000/).

## Documentation

For more information about using Node.js on Heroku, see these Dev Center articles:

- [Getting Started with Node.js on Heroku](https://devcenter.heroku.com/articles/getting-started-with-nodejs)
- [Heroku Node.js Support](https://devcenter.heroku.com/articles/nodejs-support)
- [Node.js on Heroku](https://devcenter.heroku.com/categories/nodejs)
- [Best Practices for Node.js Development](https://devcenter.heroku.com/articles/node-best-practices)
- [Using WebSockets on Heroku with Node.js](https://devcenter.heroku.com/articles/node-websockets)
