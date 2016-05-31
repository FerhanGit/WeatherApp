var Arrow = require('arrow');
var request = require('request');

var cityFindOne = Arrow.API.extend({
    group: 'weatherAPIs',
    path: '/api/weather/:city',
    method: 'GET',
    description: 'This API finds one city weather record',
    after: 'postRequest',
    parameters: {
        city: {description: 'the city Name'}
    },
    action: function (req, resp, next) {
        request({
            url: 'http://api.openweathermap.org/data/2.5/forecast',
            //qs: {q: req.params.city, units: 'metric', appid: '4200d6a1c0f90c78133ee07313e86519'},
            qs: {id: 727011, units: 'metric', appid: '4200d6a1c0f90c78133ee07313e86519'},
            method: 'GET', 
        }, function(error, response, body){
            if(error) {
                console.log(error);
            } else {
                //console.log(response.statusCode, body);
                next(null, body);
            } 
        });
    }
});
module.exports = cityFindOne;
