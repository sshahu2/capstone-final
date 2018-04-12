const passport = require('passport');
//const GoogleStrategy = require('passport-google-oauth20');
const JwtStrategy=require('passport-jwt').Strategy;
const ExtractJwt=require('passport-jwt').ExtractJwt;
const Userm=require('../models/user-main');
//const Admin=require('../models/admin-main');
const conn=require('../models/user-direct');
//const TwitterStrategy=require('passport-twitter').Strategy;
//const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
//const LinkedInStrategy = require('passport-linkedin').Strategy;
//const FacebookStrategy = require('passport-facebook').Strategy;
//const keys=require('./keys');
//const User=require('../models/user-model');
//var init = require('./init');

//google
/*
passport.serializeUser((userm,done)=>{
    done(null,userm.id);
});
passport.deserializeUser((id,done)=>{
    Userm.findById(id).then((m)=>{
        console.log("user"+userm);
        done(null,userm);
});
},


 /*   
passport.use(
    new GoogleStrategy({
        // options for google strategy
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret,
        callbackURL: '/auth/google/redirect'
    }, (accessToken, refreshToken, profile, done) => {
        // check if user already exists in our own db
       // console.log(profile);
        User.findOne({googleId: profile.id}).then((currentUser) => {
            if(currentUser){
                // already have this user
                console.log('user is: ', currentUser);
                done(null,currentUser);
                // do something
            } else {
                // if not, create user in our db
                new User({
                    googleId: profile.id,
                    username: profile.displayName,
                  //  thumbnail:profile._json.image.url
                }).save().then((newUser) => {
                    console.log('created new user: ', newUser);
                    done(null,newUser);
                    // do something
                });
            }
        });
    })

);
//twitter

passport.use(new TwitterStrategy({
    consumerKey: keys.twitter.clientID,
    consumerSecret: keys.twitter.clientSecret,
    callbackURL: '/auth/twitter/redirect'
  },
  (token, tokenSecret, profile, done)=> {
        // check if user already exists in our own db
       // console.log(profile);
        //console.log(token);
        User.findOne({twitterId: profile.id}).then((currentUser) => {
            if(currentUser){
                // already have this user
                console.log('user is: ', currentUser);
              //  return done(null, currentUser);
                done(null,currentUser);
                // do something
            } else {
                // if not, create user in our db
                new User({
                    twitterId: profile.id,
                    username: profile.displayName,
                    //thumbnail:profile._json.image.url
                }).save().then((newUser) => {
                    console.log('created new user: ', newUser);
                    //return done(null, newUser);
                    done(null,newUser);
                    // do something
                });
            }
        });
    }
));
/*
passport.use(new LinkedInStrategy({
    consumerKey: config.linkedin.clientID,
    consumerSecret: config.linkedin.clientSecret,
    callbackURL: config.linkedin.callbackURL
  },
  // linkedin sends back the tokens and progile info
  function(token, tokenSecret, profile, done) {

    var searchQuery = {
      name: profile.displayName
    };

    var updates = {
      name: profile.displayName,
      someID: profile.id
    };

    var options = {
      upsert: true
    };

    // update the user if s/he exists or add a new user
    User.findOneAndUpdate(searchQuery, updates, options, function(err, user) {
      if(err) {
        return done(err);
      } else {
        return done(null, user);
      }
    });
  }

));

// serialize user into the session
init();


//linkedin
passport.use(new LinkedInStrategy({
    clientID: keys.linkedin.clientID, 
   clientSecret:  keys.linkedin.clientSecret,
    callbackURL: "/auth/linkedin/redirect"
//scope: ['r_emailaddress', 'r_basicprofile']
  },
  (accessToken, refreshToken,  profile, done)=> {
        // check if user already exists in our own db
        console.log(profile);
        User.findOne({linkedinId: profile.id}).then((currentUser) => {
            if(currentUser){
                // already have this user
                console.log('user is: ', currentUser);
                done(null,currentUser);
                // do something
            } else {
                // if not, create user in our db
                new User({
                    linkedinId: profile.id,
                    username: profile.displayName,
                    //thumbnail:profile._json.image.url
                }).save().then((newUser) => {
                    console.log('created new user: ', newUser);
                    done(null,newUser);
                    // do something
                });
            }
        });
    }
));
//facebook
/*passport.use(new FacebookStrategy({
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: "http://www.example.com/auth/facebook/callback",
      profileFields: ['id', 'displayName', 'photos', 'email']
  },
  function(accessToken, refreshToken, profile, done) {
      console.log(profile._json.email);
    User.findOne({email:profile._json.emai}).select('username password email').exec( function(err, user) {
      if (err) {  done(err); }
      if(user && user!=null){
      done(null, user);}
      else{
          done(err);
      }
    });
    done(null,profile);
  }
));*/
//individual
module.exports=function(passport){
var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
opts.secretOrKey = conn.secret;
 
passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    console.log(jwt_payload);
    Userm.getUserById(jwt_payload.data._id, function(err, userm) {
        if (err) {
            return done(err, false);//if any error
        }

        if (userm) {
           // console.log(userm);
            return done(null, userm);//if user found
        } else {
            return done(null, false);//if user not found
            // or you could create a new account
        }
    });
}));
}