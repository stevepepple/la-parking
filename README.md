# Wayfinding Kiosk

This is one part of my idea for transforming parking lots into a place for wayfinding, city information, and access to public transportation. 

This project was created for Ford's Parking Lot 2.0 challenge. 


## Map

I created the visual style for this map using Mapbox and Mapbox Studio. 

 - The data for rail and bus maps is from [L.A. Metro Developer](http://developer.metro.net/introduction/gis-data/download-gis-data/)

## Parking

The parking page uses the ParkWhiz developer API to show the current availability of parking at the nearest location. 

The API has provides information about the amenties at the current lot. 


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
