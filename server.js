import express from 'express';
import session from 'express-session'
import flash from 'express-flash';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import passport from 'passport';
import cookieParser from 'cookie-parser';

import { router } from "./routes/routes.js";
import { loginCheck } from "./auth/passport.js";

import { fileURLToPath } from 'url';
import { dirname, parse, sep } from 'path';

loginCheck(passport);
dotenv.config();

// configuration
const __dirname = dirname(fileURLToPath(import.meta.url)) + sep;
const cfg = {
  port: process.env.PORT || 3000,
  dir: {
    root: __dirname,
  },
  database: process.env.MONGOLAB_URI
};

// Express initiation
const app = express();

mongoose.connect(cfg.database)
.then(() => console.log('Connected to DB'))
.catch(err => console.log(err));

// use EJS templates
app.set('view engine', 'ejs');
app.set('views', 'views');

// serve static files
app.use(express.static(__dirname + '/public'));

app.use(express.urlencoded({extended: false}));

app.use(cookieParser());
app.use(session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    resave: true,
    cookie: { maxAge: 900000  } // 15 minutes
}));

app.use(flash());

// use passport
app.use(passport.initialize());
app.use(passport.session());

// use router
app.use('/', router);

// start server
app.listen(cfg.port, console.log(`Server running on http://localhost:${cfg.port}`));
