const express = require('express')
const request = require('request')
const app = express()
const port = process.env.PORT || 5000
const path = require('path');
const bodyParser = require('body-parser'); 
app.use(bodyParser.json());
const axios = require("axios");
const index = require("./index");



app.use(express.static(path.join(__dirname, '/client/build')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/src/index.js'));
});

app.post('/weather', (req, res) => {
    var lat = req.body.lat;
    var lon = req.body.lon;
    var exclude = 'current,minutely,hourly,alerts';
    var apiKey = '816ce5666250bd9f9cb974bfb0f3cdae';
    var cnt = 3;
    var units = 'imperial';

    var url = 'https://api.openweathermap.org/data/2.5/onecall?lat='+lat+'&lon='+lon+'&exclude='+exclude+'&units='+units+'&appid='+ apiKey;

    axios.get(url).then(response =>{
      var temps = [];
      for (var x = 0; x < cnt; x++)
      {
        temps.push(response.data.daily[x].temp.day);
        temps.push(response.data.daily[x].temp.min);
        temps.push(response.data.daily[x].temp.max);
        temps.push(response.data.daily[x].temp.night);
        temps.push(response.data.daily[x].temp.eve);
        temps.push(response.data.daily[x].temp.morn);
      }
      var length = temps.length;
      var mean = index.Mean(temps, length);
      var mode = index.Mode(temps);
      temps.sort();
      var median = index.Median(temps, length);
      const weather = {
            mean: mean.toFixed(2),
            median: median.toFixed(2),
            mode: mode
        };
      res.send(JSON.stringify(weather));
    });
    
});



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});

