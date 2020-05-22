const request = require("postman-request")
const forecast = (latitude,lontitude,callback)=>{
        const url = "http://api.weatherstack.com/current?access_key=622c427ab91ff1c9385c46f4f6d84b73&query="+latitude+","+lontitude+"&units=m"
    request({url:url,json:true},(error,response,body)=>{
        if(error){
        callback("Unable to connect the server",undefined)
        }else if(response.body.error){
             callback("Unable to find the location",undefined) 
        }else{
            const data = response.body
            const msg = "its currently "+ data.current.temperature+" degress and it feel like "+data.current.feelslike+" degress out"
            callback(undefined,msg)
            
        }
    })


}

module.exports = forecast