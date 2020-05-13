const request = require('postman-request')

 const forecast = (longitude ,latitude , callback ) => {
    const url = 'https://api.darksky.net/forecast/5605cb08ca466fb32093fa1ebc3f420a/' + encodeURIComponent(longitude) + ',' + encodeURIComponent(longitude) +'?units=ca'
    request({url,json:true}, (error, {body}) => {
        if(error){
        callback('unable to connect to weather service!', undefined)    
        }else if(body.error){
        callback('unable to find location!', undefined)
        }else{
    const currently = body.currently
    const daily = body.daily.data[0].summary
    console.log(body.daily.data[0])
    callback(undefined , body.daily.data[0].summary +' It is currently ' + currently.temperature + ' degrees out. This high today is ' +  body.daily.data[0].temperatureHigh + ' with a low of ' +  body.daily.data[0].temperatureLow+'. There is a ' + currently.precipProbability + '% chance of rain.')
     }
    })
    
    }
    

    module.exports = forecast