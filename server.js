import express from 'express';

import { fileURLToPath } from 'url';
import { dirname, parse, sep } from 'path';

// configuration
const __dirname = dirname(fileURLToPath(import.meta.url)) + sep;
const cfg = {
  port: process.env.PORT || 3000,
  dir: {
    root: __dirname,
  }
};

// Express initiation
const app = express();

// use EJS templates
app.set('view engine', 'ejs');
app.set('views', 'views');

// serve static files
app.use(express.static(__dirname + '/public'));

// render main page
app.get('/', (req, res) => {
  res.render('main', {
    title: 'Daylogger',
    data: req.query,
  });
});

// render login page
app.get('/login', (req, res) => {
  res.render('login', {
    title: 'Login page',
    data: req.query,
  });
});

// render registration page
app.get('/register', (req, res) => {
  res.render('register', {
    title: 'Registration page',
    data: req.query,
  });
});

// render form page
app.get('/daily', (req, res) => {
  const name = req.query.fname;
  const currentTime = new Date();
  let timeOfDay;

  // Determine the time of day based on the current hour
  if (currentTime.getHours() < 12) {
    timeOfDay = 'Morning';
  } else if (currentTime.getHours() < 17) {
    timeOfDay = 'Afternoon';
  } else {
    timeOfDay = 'Evening';
  }
  res.render('daily', {
    title: 'Todays mood',
    data: { timeOfDay, name },
  });
});

// start server
app.listen(cfg.port, () => {
  console.log(`App listening at http://localhost:${cfg.port}`);
});
