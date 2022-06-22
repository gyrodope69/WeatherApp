const express  = require('express');
const bodyParser = require('body-parser');
const https = require('https');  // using https module to make a get request to https
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
    res.sendFile(__dirname+"/index.html");
});

app.post('/', function(req, res) {
  const query= req.body.CityInput;  
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid=b258acea33280afa7a332603154d7a86&units=metric";
    https.get(url,function(response){
        // this meathod to receive data from the API server
        response.on('data', function(data){
            // console.log(data);  // If we do this we will get the hexadecimal code 
            const weatherData = JSON.parse(data); // We parse this data in JSON format so that we it can be redalble
            console.log(weatherData);
            const temp = weatherData.main.temp;
            const clouds= weatherData.weather[0].main;
            const description = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const iconUrl = "http://openweathermap.org/img/wn/"+icon+"@2x.png"
            res.write("<p>The weather is " + description+"</p>");
            res.write("<h1>Today's temperature in "+query+" is " +temp+ " Celsius</h1>");
            res.write("<img src="+iconUrl+">");
            res.send();
        })
    })
});



   // const url = "https://api.openweathermap.org/data/2.5/weather?q=Gangtok&appid=b258acea33280afa7a332603154d7a86&units=metric";
    // https.get(url,function(response){
    //     console.log(response);  
    //     console.log(response.statusCode); // prints the https response code 

    //     // this meathod to receive data from the API server
    //     response.on('data', function(data){
    //         // console.log(data);  // If we do this we will get the hexadecimal code 
    //         const weatherData = JSON.parse(data); // We parse this data in JSON format so that we it can be redalble
    //         console.log(weatherData);
    //         const temp = weatherData.main.temp;
    //         const clouds= weatherData.weather[0].main;
    //         const description = weatherData.weather[0].description;
    //         const icon = weatherData.weather[0].icon;
    //         const iconUrl = "http://openweathermap.org/img/wn/"+icon+"@2x.png"
    //         console.log(temp);
    //         console.log(clouds);
    //         console.log(description);
    //         res.write("<p>The weather is " + description+"</p>");
    //         res.write("<h1>Today's temperature in Gangtok is " +temp+ " Celsius</h1>");
    //         res.write("<img src="+iconUrl+">");
    //         res.send();
    //     })
    // })

app.listen(3000, function(){
    console.log('listening on server 3000');
})