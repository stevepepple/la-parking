# Wayfinding Kiosk

This is one part of my idea for transforming parking lots into a place for wayfinding, city information, and access to public transportation. 

This project was created for Ford's Parking Lot 2.0 challenge. 


## Map

I created the visual style for this map using Mapbox and Mapbox Studio. 

 - The data for rail and bus maps is from [L.A. Metro Developer](http://developer.metro.net/introduction/gis-data/download-gis-data/)

## Parking

The parking page uses the ParkWhiz developer API to show the current availability of parking at the nearest location. 

The API has provides information about the amenties at the current lot. 

attended, valet - Has on-site parking attendant
bus - There is nearby bus service (added by me, as I've only selected parking lots near public transit)
eticket - Accepts mobile payment
handicap - Includes handicap accessible spaces
indoor - Indoor or covered parking
shuttle - Has a shuttle service
reservation - Accpets reservations
restroom - Has restrooms
reentry_allowed - Allows re-entry
security - Has on-site security

---- 

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
