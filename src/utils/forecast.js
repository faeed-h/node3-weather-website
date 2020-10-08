const request = require("request");

// const forecast = (lat, longt, callback) => {
//   const url = 'http://api.weatherstack.com/current?access_key=ccd6afb12bb43e8f3b89a9893e11c165&query=' + lat + ',' + longt + '&units=f'
//   request({ url: url, json: true }, (error, response) => {
//     if (error) {
//       //console.log('Unable to connect to weather service!')
//       callback('Unable to connect to weather service!')
//     } else if (response.body.error) {
//       //console.log(response.body.error.info)
//       callback(response.body.error.info)
//     }
//     else {
//       //console.log(response.body.current.weather_descriptions[0] + '. It is currently ' + response.body.current.temperature + ' degree out. There is a ' + response.body.current.precip + ' % of rain')
//       const weatherForeCast = response.body.current.weather_descriptions[0] + '. It is currently ' + response.body.current.temperature + ' degree out. There is a ' + response.body.current.precip + ' % of rain'
//       callback(undefined, {
//         wForeCast: weatherForeCast
//       })
//     }
//   })
// }

//Destructuring
const forecast = (lat, longt, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=ccd6afb12bb43e8f3b89a9893e11c165&query=" +
    lat +
    "," +
    longt +
    "&units=f";
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      //console.log('Unable to connect to weather service!')
      callback("Unable to connect to weather service!");
    } else if (body.error) {
      //console.log(response.body.error.info)
      callback(body.error.info);
    } else {
      //console.log(response.body.current.weather_descriptions[0] + '. It is currently ' + response.body.current.temperature + ' degree out. There is a ' + response.body.current.precip + ' % of rain')
      //console.log(body);
      const weatherForeCast =
        body.current.weather_descriptions[0] +
        ". It is currently " +
        body.current.temperature +
        " degree out. Wind Speed " +
        body.current.wind_speed +
        " There is a " +
        body.current.precip +
        " % of rain";
      callback(undefined, {
        wForeCast: weatherForeCast,
      });
    }
  });
};
module.exports = forecast;
