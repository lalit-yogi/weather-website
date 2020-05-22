const request = require('postman-request')
const geocode = (address,callback)=>{
    const geoCodeUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(address)+".json?access_token=pk.eyJ1IjoibGFsaXQyNTUwIiwiYSI6ImNrYWRzc3g0bzFwZXQydnM5M2s0anJjZG4ifQ.8I30dlitFT-cerwiklPbpw"
    request({url:geoCodeUrl,json:true},(error,response)=>{
        if(error){
           callback('unable to connect to server',undefined) 
        }else if(response.body.features.length===0){
            callback('unable to find the location',undefined) 
        }else{
            const data = {
                latitude:response.body.features[0].center[1],
                longtitude:response.body.features[0].center[0],
                location:response.body.features[0].place_name
            }
            callback(undefined,data)
        }
    })
}
module.exports = geocode