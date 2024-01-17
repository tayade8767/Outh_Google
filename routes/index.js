var express = require('express');
var router = express.Router();
var passport = require('passport');
var GoogleStrategy = require('passport-google-oidc');
require('dotenv').config();
var User = require('./users.js')

// Start of GoogleStrategy Code

passport.use(new GoogleStrategy({
  clientID: process.env['GOOGLE_CLIENT_ID'],
  clientSecret: process.env['GOOGLE_CLIENT_SECRET'],
  callbackURL: 'https://akash-outh.onrender.com',
  scope: [ 'email','profile' ]
},
async function verify(issuer, profile, cb) {
  // delete the Sql code
  console.log(profile)
  try{
      existinguser = await User.findOne({email:profile.emails[0].value});
    if(existinguser){
      return cb(null,existinguser);
    } else {
      let newUser = await User.create({name:profile.displayName,email:profile.emails[0].value});
      return cb(null,newUser);
    }
  } catch(err) {
    // console.log(err);
    return err;
  }
}));

// End of GoogleStrategybCode

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.user){
    res.render('index', { title: 'Express' });
  } else {
    res.redirect('/login');
  }
});

router.get('/login', function(req, res, next) {
  // console.log(process.env["topsecrate2"]);
  res.render('login');
  // if(!req.user){
  // } else {
  //   res.redirect('/');
  // }
});

router.get('/login/federated/google', passport.authenticate('google'));

router.get('/oauth2/redirect/google', passport.authenticate('google', {
  successRedirect: '/',
  failureRedirect: '/login'
}));

module.exports = router;
