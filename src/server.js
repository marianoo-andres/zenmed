
var express = require('express'),
  app = express(),
  port = 3000,
  mongoose = require('mongoose'),

  //add models 
  Task = require('./server/models/user'),
  Task = require('./server/models/doctor'),
  Task = require('./server/models/patient'),
  Task = require('./server/models/specialities'),
  Task = require('./server/models/date'),
  Task = require('./server/models/availableDate'),

  cors = require('cors'),
  bodyParser = require('body-parser');
  
// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/zenmed', { useNewUrlParser: true }); 

var corsOptions = {
  origin: ['http://localhost:8099'],
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./server/routes/routes'); //importing route
routes(app); //register the route

app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});

app.listen(port);


console.log('API server started on: ' + port);
