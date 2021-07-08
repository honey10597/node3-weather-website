const request = require("request")

const forecast = (latitude, longitude, callback) => {
    const url = "https://api.darksky.net/forecast/e6af5b5feb891b272e18f5e2fc0370a6/" + latitude + "," + longitude
    request({
        url: url,
        json: true
    }, (error, response) => {
        if (error) {
            callback("unable to connect to weather service:", undefined)
        } else if (response.body.error) {
            callback("unable to find location : ", undefined)
        } else {
            callback(undefined, `It is currently ${response.body.currently.temperature} degrees out. This high today is ${response.body.daily.data[0].temperatureHigh} with a low of ${response.body.daily.data[0].temperatureLow} There is ${response.body.currently.precipProbability}% chnace of rain`)
        }
    })
}

module.exports = forecast