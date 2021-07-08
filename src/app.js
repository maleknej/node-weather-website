const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')
const app = express()

const port = process.env.PORT || 3000

//Define paths for express config
const publicDirectorypath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

// Setup handlebatrs
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

//Setup static directory to serve
app.use(express.static(publicDirectorypath))

app.get('', (req, res)=>{
    res.render('index', {
        title: 'Weather',
        name: 'HoC'
    })
})

app.get('/about', (req, res)=>{
    res.render('about',{
        title:'About Me',
        name: 'HoC'
    })
})

app.get('/help', (req, res)=>{
    res.render('help',{
        helpText: 'This is a help text',
        title: 'Help',
        name: 'HoC'
    })
})

app.get('/weather', (req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'There is no address'
        })
    }
    geocode(req.query.address,(error, { latitude, longitude, location}={})=>{
        if (error) {
            return res.send({error })
        }
        forecast(latitude, longitude,(error, forecastData) => {
            if(error){
                return res.send({error})
            }
            res.send({
                address: req.query.address,
                forecast: forecastData,
                location: location
            })
        })
        
    })
    
})



app.get('/products', (req, res)=>{
    if(!req.query.search){
        return res.send({
            error:'You must provide search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})




app.get('/help/*',(req,res)=>{
    res.render('404', {
        errorMessage : 'Help article not found.',
        title: ' 404!',
        name: 'HoC'
    })
})

app.get('*', (req, res)=>{
    res.render('404', {
        errorMessage : 'Page not found.',
        title: ' 404!',
        name: 'HoC'
    })
})

app.listen(port, ()=>{
    console.log('Server is up on port ' + port)
})