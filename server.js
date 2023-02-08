// const path = require('path');
// require express for running as the service
const express = require('express');
const session = require('express-session');
// offload the routes to controllers directory reference
const routes = require('./controllers');
// include handlebars for templating here
const exphbs = require('express-handlebars');
// include handlebars for templating and here
const helpers = require('./utils/handlebarshelpers');

//here is the db section for the orm.
const sequelize = require('./config/connection');
//init session state here
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const path = require("path");

const app = express();
// setting up the port for local site or heroku.
const PORT = process.env.PORT || 3001;

// Set up Handlebars.js engine with custom helpers
// const hbs = exphbs.create({ helpers });
// below is the session object
const sess = {
  secret: 'Super-secret-secret',
  cookie: { maxAge: 1000000},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

// lead express to the session object
app.use(session(sess));

// Inform Express.js on which template engine to use
const hbs = exphbs.create({ helpers });
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// enabling the POST to handle in express.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);
// syncing the orm to the database
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
