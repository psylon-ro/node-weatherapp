const request = require('request')

const forecast=(lat, lon, callback)=>{
    const url= `http://api.weatherstack.com/current?access_key=878392f319bfe8c866887e33c0483264&query=${lat},${lon}&units=f`;
    
    request({url, json: true}, (error, {body})=>{
        if(error){
            callback('Unable to connect to weather services', undefined)
        }
        else if(body.error){
            callback('unable to find location', undefined)
        }
        else{
       const data= body.current;   
       callback(undefined,`${data.weather_descriptions[0]}, It is currently ${data.temperature} degrees out but it feels like ${data.feelslike} degrees out. There is ${data.precip} percent chance of rain`)
        }
    }) 
    }

    module.exports=forecast