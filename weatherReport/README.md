# jsYahooWeather
==============

use YQL to query weather by your device's location
(must allow browser to get location by HTML5 geolocation)

- written by pure javascript code

implement step:
- use geolocation(HTML5) method to get device's location
- build a YQL query with jsonp (using geo.placefinder table)
- next, use the result of placefinder to parse a "woeid" key, use it and query another YQL weather.forecast table
- now you can get next 5 day's weather at your area
