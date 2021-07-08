const path = require("path")
const express = require("express")
const hbs = require("hbs")
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// console.log(__dirname);
// console.log(path.join(__dirname, '../public'));

const app = express()
const port = process.env.PORT || 3000

//Define path for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: "Use this site to get your weather!",
        name: "Honey",
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About this app",
        name: "Honey"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help",
        message: "This is message",
        name: "Honey"
    })
})

// app.get("", (req, res) => {
//     res.send({
//         name: "hOney", age: 24
//     })
// })

// app.get("/help", (req, res) => {
//     res.send([
//         { anme: "honey" }, { age: 27 }
//     ])
// })

// app.get("/about", (req, res) => {
//     res.send("About page")
// })

app.get("/weather", (req, res) => {
    if (!req.query.address) {
        return res.send({ error: "you must provide a address" })
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})



app.get("/products", (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "you must provide a search term"
        })
    }
    res.send({
        products: []
    })
})

// app.get('/help/*', (req, res) => {
//     res.send("help cart not found")
// })

// app.get('*', (req, res) => {
//     res.send("My 404 page")
// })

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: "Honey",
        errorMessage: "Help article not found"
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: "Honey",
        errorMessage: "Page not found"
    })
})

app.listen(port, () => {
    console.log("Server is up on part 3000",port);
})