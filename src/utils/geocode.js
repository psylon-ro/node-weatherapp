const request = require('request')


const geocode=(location,callback)=>{
    const placetocoordurl= `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=3eb08187809c947e6a3e19de396f9bb6`;

    request({url:placetocoordurl, json: true}, (error, {body})=>{
        if(error){
            callback('Unable to connect to weather services', undefined)
        }
        else if(body.cod==='400' || body.length===0){
            callback('unable to find location',undefined)
        }else{
        const data= body;   
        callback(undefined,{
        latitude:data[0].lat,
        longitude:data[0].lon,
        location: `${data[0].name}, ${data[0].state}, ${data[0].country}`
        }
        )
        }
     })

 }

 module.exports = geocode