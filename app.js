// Initialize express
const express = require('express');
const methodOverride = require('method-override')
const app = express();
app.use(methodOverride('_method'))

// require handlebars
const { engine } = require('express-handlebars');
const Handlebars = require('handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');

const models = require('./db/models');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// Use "main" as our default layout
app.engine('handlebars', engine({ defaultLayout: 'main', handlebars: allowInsecurePrototypeAccess(Handlebars) }));
// Use handlebars to render
app.set('view engine', 'handlebars');

// INDEX
app.get('/', (req, res) => {
  models.Event.findAll().then(events => {
    res.render('events-index', { events: events });
  })
})

require('./controllers/events')(app, models);
require('./controllers/rsvps')(app, models);

// Choose a port to listen on
const port = process.env.PORT || 3000;

// Tell the app what port to listen on
app.listen(port, () => {
  console.log('App listening on port 3000!')
})