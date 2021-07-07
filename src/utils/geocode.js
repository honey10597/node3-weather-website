const request = require("request")

const geocode = (address, callback) => {
    const geocodeURL = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoiaG9uZXlrdW1hcjEyMyIsImEiOiJja3E5YTVnc2owMGtjMnBtb3E4NmJ6bXF5In0.QECYauFYTpz7KDL1zJFuxQ&limit=1"

    request({ url: geocodeURL, json: true }, (error, response) => {
        if (error) {
            callback("Unable to find location", undefined)
        } else if (response.body.features.length === 0) {
            callback("unable to find location, try another search", undefined)
        } else {
            callback(undefined, {
                latitude: response.body.features[0].center[0],
                longitude: response.body.features[0].center[1],
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode