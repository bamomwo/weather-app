const axios = require('axios');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYmFtb213byIsImEiOiJja3V6anI0ZGsyOGwyMm9vMG9xN3hmaWxoIn0.yAvl3UPwJuuP_K42MhKgAA'

    axios.get(url).then(({ data }) => {

        if (data.features === 0) {
            callback('Unable to find location', undefined);
        } else {

            console.log(data.features[0].center[0])
            console.log(data.features[0].center[1])
            callback(undefined, {
                latitude: data.features[0].center[0],
                longitude: data.features[0].center[1],
                location: data.features[0].place_name
            })
        }
    }).catch((err) => {
        callback('Unable to get weather data. Check your address or connection and try again')
        // console.log('Unable to connect Geocode');
    })
}





module.exports = geocode