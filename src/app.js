const express = require('express')
const path = require('path')
const app = express()
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
//define path for express config
const publicDirectory = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')
//Setup handlebars view engine and views location
app.set('views',viewsPath)
app.set('view engine','hbs')
hbs.registerPartials(partialsPath)
//Setup static directory to server
app.use(express.static(publicDirectory))
app.get('',(req,res)=>{
   res.render('index',{
       title:'Weather app',
       name:'Lalit yogi'
   })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'about',
        name:'Anil'
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'you must provide an address'
            
        })
    }
    geocode(req.query.address,(error,{latitude,logtitude,location}={})=>{
        if(error){
            return res.send({error})
        }
    
        forecast(latitude,logtitude,(error,forecastData)=>{
           if(error){
            return res.send({error})
           }
           return res.send({
               location:location,
               forecast:forecastData
           })
          })
    })
    
})
app.get('/about/*',(req,res)=>{
    res.render('page404',{
        title:'about page 404',
        name:'Lalit',
        errorMessage:'About page does not have sub pages'
    })
})
app.get('*',(req,res)=>{
    res.render('page404',{
        title:'page not found 404',
        name:'Lalit',
        errorMessage:'page not found'
    })
})

app.listen(3000,()=>{
  console.log("Server is up on port 3000")  
})