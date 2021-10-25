const axios = require('axios');


const forcast = (lat, lon, callback) => {
    axios.get('https://api.openweathermap.org/data/2.5/weather', {
        params: {
            lat,
            lon,
            appid: 'f717795e030319b782958d9e49844bd4',
            units: 'metric'
        }
    }
    ).then((response) => {

        if (response.data.features === 0) {
            callback('No Location found', undefined)
        } else {
            callback(undefined,
                'The weather description is: ' + response.data.weather[0].description + ' and the temperature is ' + response.data.main.temp + ' celcius'
            )
        }
    }).catch((err) => {
        callback(err.message, undefined);
    })
}

module.exports = forcast


