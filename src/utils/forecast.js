const request = require('request')

const forecast = (latitude, longitude, callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=edf1a9d428371a5d9fe5b9bbe663e2ba&query=' + latitude + ',' + longitude + '&units=f'
    request({url, json: true}, (error,{body})=>{
    if (error) {
        callback('Unable to connect weather service!', undefined)
    }else if(body.error){
        callback('Unable to find location', undefined)
    }else {
        callback(undefined, body.current.weather_descriptions[0]+ '. The current temp is '+ body.current.temperature + '. It feels like ' + body.current.feelslike)
    }
    })
}

module.exports = forecast