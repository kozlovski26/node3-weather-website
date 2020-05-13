const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const cocktails = require('./utils/cocktail')

const app = express()

// Define path for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
// Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

// Setup static directory and serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
  res.render('index',{
    title: 'Weather',
    name: 'Bar Kozlovski'
  })  

})

app.get('/about', (req,res) => {
  res.render('about',{
    title: 'About',
    name: 'Bar Kozlovski'
  })
})

app.get('/help', (req,res) => {
  res.render('help',{
    title: 'Help',
    name: 'Bar Kozlovski',
    helpText: 'This is the help page!'
})

})

app.get('/Weather' , (req, res) => {
  // No addresss provide
  if(!req.query.address){
    return res.send({
      error: 'You must provide an address'
    })
  }
// Get location and latitude and longitude
  geocode(req.query.address , (error , { latitude , longitude , location } = {} ) => {
    if (error) {
      console.log(error)
      return res.send({error})
    }
    //Send to get forcast.
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

app.get('/products' , (req, res) => {
if(!req.query.search){
  return res.send({
    error: 'You must provide a search'
  })
}
console.log(req.query.search)
res.send({
  products:[]
})
})

app.get('/help/*',(req,res) => {
  res.render('404',{
    title: '404',
    name: 'Bar Kozlovski',
    errorMessage: 'Help article not found.'
})
})

app.get('*', (req, res) => {
  res.render('404',{
    title: '404',
    name: 'Bar Kozlovski',
    errorMessage: 'page not found'
})
})

app.listen(3000 , () => {
console.log('Server is up on port 3000')
})