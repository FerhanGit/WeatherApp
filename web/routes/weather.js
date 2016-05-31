var Arrow = require('arrow');
hbs = Arrow.Middleware.getRendererEngine('hbs');
hbs.registerHelper('getDate', function(dt) {
    var newDate = new Date(dt*1000);
    options = {
        year: 'numeric', month: 'numeric', day: 'numeric'
    };
    
    return newDate.toLocaleString('bg-BG', options);
});

hbs.registerHelper('getTime', function(dt) {
    var newDate = new Date(dt*1000);
    options = {
        hour: 'numeric', minute: 'numeric', second: 'numeric',
        hour12: false
    };
    
    return newDate.toLocaleString('bg-BG', options);
});
hbs.registerHelper('getDay', function(dt) {
    var newDate = new Date(dt*1000);
    
    var weekday = new Array(7);
    weekday[0]=  "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";

    return weekday[newDate.getDay()];
});

hbs.registerHelper('filterMaxTemp', function(results) {
    if (results === undefined) {
        return;
    }
    return Math.max.apply(Math,results.map(function(o){
       return o.main.temp_max;
    }));
});

hbs.registerHelper('filterMinTemp', function(results) {
    if (results === undefined) {
        return;
    }
    return Math.min.apply(Math,results.map(function(o){
       return o.main.temp_min;
    }));
});


var WeatherRoute = Arrow.Router.extend({
    name: 'weather',
    path: '/weather',
    method: 'GET',
    description: 'get some cars',
    action: function (req, res, next) {
        req.server.getAPI('/api/weather/:city', 'GET').execute({}, function(err, results) {
            if (err) {
                next(err);
            } else {
               // req.log.info('got weather ' + JSON.stringify(results));
                res.render('weather', JSON.parse(results.result));
            }
        });
    }
});
module.exports = WeatherRoute;