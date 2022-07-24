const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode= require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//defining paths for express config
const pubpath= path.join(__dirname, '../public')
const viewsPath= path.join(__dirname, '../templates/views')
const partialsPath= path.join(__dirname, '../templates/partials')

//setup handlebars engine and view location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(pubpath))

 app.get('',(req, res)=>{
    res.render('index',{title:'weatherrr', name:'upen'})
})

app.get('/about',(req, res)=>{
    res.render('about',{title:'about me', name:'upen'})
})

app.get('/help',(req, res)=>{
    res.render('help',{title:'Want any help?', name:'upen'})
})

app.get('/weather',(req, res)=>{
    if(!req.query.address){
        return res.send({error: 'You must provide an address term'})
    }
    geocode(req.query.address,(error, {latitude, longitude, location}={})=>{
        if(error){
        return res.send({error})}
    
        forecast(latitude, longitude,(error, forecastdata) => {
          if(error){
            return res.send({error})
          }
          res.send({forecastdata, location, address: req.query.address})
        })
     })
    
})

app.get('/help/*',(req, res)=>{
    res.render('pagenf',{title:'404', name:'upen',errormess: 'help article not found'})
})

app.get('*',(req, res)=>{
    res.render('pagenf',{title:'404', name:'upen',errormess: 'page not found'})
})

app.listen(3000, ()=>{
    console.log('server is up')
})