dotenv = require('dotenv').config();
const express = require('express');
var session = require('express-session');
const Handlebars = require('handlebars');
const exphbs = require('express-handlebars');
const {
  allowInsecurePrototypeAccess
} = require('@handlebars/allow-prototype-access');
const morgan = require('morgan');
// Requiring passport as we've configured it
var passport = require("./config/passport");
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 8080;
const db = require('./models');

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'));
app.use(morgan('dev'));
// Keeping track of user login status
app.use(
  session({ secret: 'keyboard cat', resave: true, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());

// Handlebars
app.engine(
  'handlebars',
  exphbs({
    defaultLayout: 'main',
    extname: '.handlebars',
    handlebars: allowInsecurePrototypeAccess(Handlebars)
  })
);
app.set('view engine', '.handlebars');
//added app.set -6/19/20
// app.set('port', process.env.PORT || 3000);

const syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === 'test') {
  syncOptions.force = true;
}
// Routes
app.use(routes);

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(() => {
  app.listen(PORT, () => {
    console.log(
      '==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.',
      PORT,
      PORT
    );
  });
});

module.exports = app;
