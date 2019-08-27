const express = require('express');
const http = require('http');
const path = require('path');
const logger = require('morgan');
const PORT = process.env.PORT || 5000;
const app = express();


app.use(logger('dev'));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

// set the public path to "models"
// this will serve everying at http://localhost:<PORT>/<modelname>
const publicPath = path.resolve(__dirname, 'models');
app.use(express.static(publicPath));

// TODO: add an index page for all the models to display
// What is available
app.get('/', (req, res) => {
    res.send('ml5 data and model server says hello!')
})


// the end of the line - send a 404
app.use((req, res) => {
    res.statusCode = 404
    res.end(`404! page not found!`);
})


http.createServer(app).listen(PORT, () => {
    console.log(`See the magic at: http://localhost:${PORT}/`);
    console.log(`e.g.: http://localhost:${PORT}/sketchrnn/bicycle.gen.json`);
})

