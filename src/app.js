const path = require('path')

const forcast = require('../utils/forcast')
const geocode = require('../utils/geocode')

const express = require('express')
const hbs = require('hbs')

const port = process.env.PORT || 3000




const app = express()

// Path configuration
const serverDir = path.join(__dirname, '../public')
const templatePath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// hbs configuration
app.set('view engine', 'hbs')
app.set('views', templatePath)

hbs.registerPartials(partialsPath)


app.use(express.static(serverDir))


// Express routes
app.get('', (req, res) => {
    res.render('index', {
        name: 'Suiah brilla',
        title: 'Weather App'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        name: 'Suliah brilla',
        title: 'About Page'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Suliah brilla',
        message: 'This is a simple weather application. Key in your address and get weather data'
    })
})

app.get('/weather', (req, res) => {
    const address = req.query.search;
    if (!address) {
        return res.send({
            error: 'No address provided'
        })
    }

    geocode(address, (err, { latitude, longitude, location } = {}) => {

        if (err) {
            return res.send({
                error: err
            })
        }


        forcast(latitude, longitude, (err, data) => {
            if (err) {
                return res.send({
                    error: err
                })
            }

            res.send({
                forcast: data,
                location: location
            })

        })
    })

    // res.send({
    //     forcast: 'It is solowing',
    //     location: 'Navrongo, Upper East Region',
    //     address: address
    // })
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: 'Error',
        name: 'Suliah brilla',
        error: 'Help articles not found'
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        title: 'Error',
        name: 'Suliah brilla',
        error: 'Page Not Found'
    })
})

app.listen(port, () => {
    console.log('Server running on port ' + port)
})