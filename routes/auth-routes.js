const router = require('express').Router();
const passport = require('passport');
const express = require('express');
const jwt = require("jsonwebtoken");
const Userm = require('../models/user-main');
const Assessmentm = require('../models/assessment');
//const Admin=require('../models/admin-main');
//const User=require('../models/user-model');

const conn = require('../models/user-direct');
const um = require('../config/passport-setup')(passport);
//const am=require('../config/passport-setup1')(passport);
//const functions=require('../config/function');
//const request=require('request');

//const config=require('../config/keys');
//var passportLinkedIn = require('../auth/linkedin');

//individual
router.post('/register', (req, res, next) => {
    let newUser = new Userm({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        role: req.body.role,
    });
    Userm.addUser(newUser, (err, userm) => {
        if (err) {
            res.json({
                success: false, msg: "failed"
            });
        }
        else {
            res.json({ success: true, msg: "done", userm });
        }

    });
});
router.post('/addassessments', (req, res, next) => {
    let newAssessment = new Assessmentm({

        title: req.body.title,
        score:req.body.score,
        domain:req.body.domain

    });
    newAssessment.save(function (err, assessment) {
        if (err) {
            console.log(error);
        }
        else {
            res.json(assessment)
        }
    });
    /*Assessmentm.addAssessment(newAssessment,(err,assessment)=>{
         if(err){
            console.log(err);
         }
         else{
             res.json({assessment});
         }
    
    });*/
});

router.get('/getassessment/:subject', function (req, res) {

    Assessmentm.findOne({ title: req.params.subject }, function (err, assessment) {
        if (err)
            console.log(err);
        else {
            console.log(assessment),
                res.json(assessment);
        }
    });
});

router.put('/updateassessment/:subject', function (req, res) {


    Assessmentm.findOneAndUpdate({
        title: req.params.subject,
    },
        {
            $set: {

                title: req.body.title
            }
        },
        { new: true },
        function (err, assessment) {
            if (err)
                res.send(err);
            else {
                console.log(assessment),
                    res.json(assessment);
            }


        });
});
router.put('/updateassessmentscore/:subject', function (req, res) {


    Assessmentm.findOneAndUpdate({
        title: req.params.subject,
    },
        {
            $set: {

                 score: req.body.score
            }
        },
        { new: true },
        function (err, assessment) {
            if (err)
                res.send(err);
            else {
                console.log(assessment),
                    res.json(assessment);
            }


        });
});




router.put('/addsubassessment/:subject', function (req, res) {
//  var query = { 
//         'title': req.params.subject,
//        // 'domain.title':req.params.sub
//      };
//     var doc = {
//         $set: {
//             'domain': req.body
//         }
//     };

     var query = { title: req.params.subject };
    var doc = {
       $push: {
        'domain': {
             title: req.body.name,
    description:req.body.description,
                dom_score:req.body.dom_score,
                sub_domain:req.body.sub_domain

           }
     }
     };
    var options = { upsert: true };
    Assessmentm.findOneAndUpdate(query, doc, options, function (err, assessment) {
        if (err)
            res.json(err);
        else
            res.json(assessment);
    });
})
router.put('/addsubsubassessment/:subject/:sub', function (req, res) {
    var query = { 
        'title': req.params.subject,
        'domain.title':req.params.sub
     };
    var doc = {
        $set: {
            'domain.$.sub_domain': req.body
        }
    };
    var options = { upsert: true };
    Assessmentm.findOneAndUpdate(query, doc, options, function (err, assessment) {
        if (err)
            res.json(err);
        else
            res.json(assessment);
    });
    // const assess = req.params.subject;
    // const domain = req.params.sub;
    // const subdomain = req.body.name;
    // const docs = any;
    // const dom = any;
    // Assessmentm.findOne(assess, (err, userm) => {
    //     if (err) {
    //         console.log("error");
    //     }
    //     if (userm) {
    //         this.docs = userm;
    //     }
    // });
    // this.dom = this.doc.domain;

    // var map = function () {
    //     for (var i = 0; i < this.dom.length; i++) {
    //         emit(
    //             {
    //                 "_id": this._id,
    //                 "index": i
    //             },
    //             {
    //                 "index": i,
    //                 "dom": this.dom[i],
    //                 "update": {
    //                     "title": "dom." + i.toString() + ".sub_domain.$.title",
    //                     // "description": "operations." + i.toString() + ".parameters.$.description",
    //                     // "type": "operations." + i.toString() + ".parameters.$.type"
    //                 }
    //             }
    //         );
    //     }
    // };

    // var reduce = function () { };

    // db.collection.mapReduce(
    //     map,
    //     reduce,
    //     {
    //         "out": {
    //             "replace": "operations"
    //         }
    //     }
    // );
    // //var oid = req.params.operations;
    // //var pid = req.params.parameters;
    // var cur = db.operations.find({ "_id._id": domain, "value.operations.sub_domain.title": subdomain });

    // // Iterate through results and update using the update query object set dynamically by using the array-index syntax.
    // while (cur.hasNext()) {
    //     var doc = cur.next();
    //     var update = { "$set": {} };
    //     // set the update query object
    //     update["$set"][doc.value.update.title] = subdomain;
    //     // update["$set"][doc.value.update.description] = req.body.description;
    //     // update["$set"][doc.value.update.type] = req.body.type;

    //     db.collection.update(
    //         {
    //             "_id": oid,
    //             "operations.sub_domain.title": subdomain
    //         },
    //         update
    //     );
    // };

})
router.put('/updatesubassessment/:subject/:domain', function (req, res) {


    // var query = { title: req.params.subject }
    // var querym=query.Assessmentm.where({'domain.title': req.params.domain})
    /*  var doc = {
          $update: {
              'domain': {
                  title: req.body.name
              }
          }
      };*/
    var options = { upsert: true };
    Assessmentm.findOneAndUpdate({ "domain.title": req.params.domain }, {
        "$set": {
            "domain.$.title": req.body.name
        }
    }, options, function (err, assessment) {
        if (err)
            res.json(err);
        else
            res.json(assessment);

    });
})
router.put('/updatesubassessmentscore/:subject/:domain', function (req, res) {


    // var query = { title: req.params.subject }
    // var querym=query.Assessmentm.where({'domain.title': req.params.domain})
    /*  var doc = {
          $update: {
              'domain': {
                  title: req.body.name
              }
          }
      };*/
    var options = { upsert: true };
    Assessmentm.findOneAndUpdate({ "domain.title": req.params.domain }, {
        "$set": {
            "domain.$.dom_score": req.body.dom_score
        }
    }, options, function (err, assessment) {
        if (err)
            res.json(err);
        else
            res.json(assessment);

    });
})
router.put('/updatesubsubassessment/:subject/:domain', function (req, res) {


    // var query = { title: req.params.subject }
    // var querym=query.Assessmentm.where({'domain.title': req.params.domain})
    /*  var doc = {
          $update: {
              'domain': {
                  title: req.body.name
              }
          }
      };*/
    var options = { upsert: true };
    Assessmentm.findOneAndUpdate({ "domain.title": req.params.domain }, {
        "$set": {
            "domain.$.title": req.body.name
        }
    }, options, function (err, assessment) {
        if (err)
            res.json(err);
        else
            res.json(assessment);

    });
})
router.put('/deletesubassessment/:domain', function (req, res) {


    // var query = { title: req.params.subject }
    // var querym=query.Assessmentm.where({'domain.title': req.params.domain})
    /*  var doc = {
          $update: {
              'domain': {
                  title: req.body.name
              }
          }
      };*/
    var options = { safe: true, multi: true };
    Assessmentm.findOneAndUpdate({ "domain.title": req.params.domain }, {
        "$pull":
        { "domain": { "title": req.params.domain } }
    }, options, function (err, assessment) {
        if (err)
            res.json(err);
        else
            console.log(assessment);
        res.json(assessment);

    });
})
router.put('/deletesubsubassessment/:subject/:domain/:subdomain', function (req, res) {


    // var query = { title: req.params.subject }
    // var querym=query.Assessmentm.where({'domain.title': req.params.domain})
    /*  var doc = {
          $update: {
              'domain': {
                  title: req.body.name
              }
          }
      };*/
  var query = { 
        'title': req.params.subject,
        'domain.title':req.params.domain,
        'sub_domain.$.title':req.params.subdomain
     };
    var doc = {
       $pull: {
            'sub_domain.$.title': req.params.subdomain
     }
    };
    var options = { upsert: true };
    Assessmentm.findOneAndUpdate(query, doc, options, function (err, assessment) {
        if (err)
            res.json(err);
        else
            res.json(assessment);
    });
    
})

/*router.post('/authorize', (req, res, next) => {//acccessing from client side for definite span thru token
  const username = req.body.username;
  const password = req.body.password;

    User.getUserByUsername(username, (err, user) => {
    if(err) {
      console.log("error");
    }
    if(!user){
      return res.json({success: false, msg: 'User not found'});
    }

    User.comparePassword(password, user.password, (err, isMatch) => {
      if(err) throw err;
      if(isMatch){
        const token = jwt.sign({data: user}, conn.secret, {
          expiresIn: 15// 1 week
        });

        res.json({
          success: true,
          token: 'JWT '+token,
          user: {
            id: user._id,
            name: user.name,
            username: user.username,
           // email: user.email
          }
        });
      } else {
        return res.json({success: false, msg: 'Wrong password'});
      }
    });
  });
  console.log(req.params.domain);
  console.log(req.params.subject);
    console.log(req.body.name);
});*/

router.delete('/deleteassessment/:subject', function (req, res) {
    Assessmentm.remove({
        title: req.params.subject
    }, function (err, assessment) {
        if (err)
            console.log(err);
        else {
            res.json(assessment);
        }
    });
});




router.post('/authenticate', (req, res, next) => {//acccessing from client side for definite span thru token
    const username = req.body.username;
    const password = req.body.password;

    Userm.getUserByUsername(username, (err, userm) => {
        if (err) {
            console.log("error");
        }
        if (!userm) {
            return res.json({ success: false, msg: 'User not found' });
        }

        Userm.comparePassword(password, userm.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
                const mytoken = jwt.sign({ data: userm }, conn.secret, {
                    expiresIn: 86400// 1 week
                });

                res.json({
                    success: true,
                    token: 'JWT ' + mytoken,
                    userm: {
                        id: userm._id,
                        name: userm.name,
                        username: userm.username,
                        email: userm.email,
                        role: userm.role
                    }
                });
            } else {
                return res.json({ success: false, msg: 'Wrong password' });
            }
        });
    });
});


router.get('/profilem', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    //console.log(req.user);
    res.json({ userm: req.user });
});
router.get('/questions', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    //console.log(req.user);
    res.json({ userm: req.user });
});
router.get('/getassessments', (req, res, next) => {
    //console.log(req.user);
    //res.json({assessments:req.user});//yet in doubt
    Assessmentm.find(function (err, assessments) {
        if (err) {
            console.log(err);
        }
        else {
            console.log(assessments);
            res.json(assessments);
        }
    });
});
//google+twitter+linkedin
// auth login
/*router.get('/login', (req, res) => {
    res.render('login', { user: req.username});
});

// auth logout
router.get('/logout', (req, res) => {
    // handle with passport
    req.logout();
    res.clearCookie("keys");
  //  request.session.destroy()
    res.redirect('/');
});
//only google
// auth with google+
router.get('/google', passport.authenticate('google', {
    // handle with passport
    scope:['profile']
}));

router.get('/google/redirect', passport.authenticate('google'),(req,res)=>{
     //res.send('logged in');
  // res.send(req.user);
   res.json(req.user);
});
//only twitter
// auth login

// auth logout


/*router.post('/authorize',function(req,res){
        var header=config.clientId+':'+config.clientSecret;
        var encheader=new Buffer(header).toString('base64');
        var finalheader='Basic'+encheader;
        request.post('https://api.twitter.com/oauth2/token',{form:{'grant_type':'client_credentials'},
        headers:{Authorization:finalheader}},function(error,response,body){
            if(error)
            console.log(error);
            else{
                config.bearertoken=JSON.parse(body).access_token;
                res.json({success:true,data:config.bearertoken});

                }
        })
        });
// auth with twitter
router.get('/twitter', passport.authenticate('twitter', {
    // handle with passport
    scope:['profile']
}));

router.get('/twitter/redirect', passport.authenticate('twitter'),
       function(req, res) {
    
    res.json(req.user);
  });


/*router.get('/auth/linkedin', passportLinkedIn.authenticate('linkedin'));

router.get('/auth/linkedin/callback',
  passportLinkedIn.authenticate('linkedin', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication
    res.json(req.user);
  });
//only linkedin
router.get('/linkedin/oauth/v2/authorization', passport.authenticate('linkedin', {
    // handle with passport
    scope:['r_emailaddress', 'r_basicprofile']
}));

router.get('/linkedin/redirect', passport.authenticate('linkedin',{  state: 'linkedinauth'   }),(req,res)=>{
    res.json(req.user);
});
/*router.get('/facebook/redirect', passport.authenticate('facebook',{failureRedirect:'/login'}),(req,res)=>{
     //res.send('logged in');
  // res.send(req.user);
    res.redirect('/profile/');
});

router.post('/callback', (req, res) => {
        console.log('Params: ' + JSON.stringify(req.body))
        var options = {
            url: 'https://www.linkedin.com/oauth/v2/accessToken?format=json',
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Accept-Charset': 'utf-8',
            },
            form: {
                'grant_type': 'authorization_code',
                'code': req.body.code,
                'redirect_uri': 'http://localhost:4200/demo',
                'client_id': '81tebblzhe3mqx',
                'client_secret': 'PJ6KsL7fzamqUo1S'
            },
            json: true
        }
        request(options, (err, response, body) => {
            console.log("Token Body: " + JSON.stringify(body));
            console.log();
            console.log("Token Response: " + JSON.stringify(response));
            console.log();


            if (body.error) {
                res.json({
                    success: false,
                    error: body.error,
                    error_description: response.body.access_token
                });
            } else {
                token = body.access_token;
                console.log("Access Token: " + token);
                console.log();
                //res.json({success:true,access_token:body.access_token});
                console.log('Getting user info...');
                console.log();

                var userOptions = {
                    url: 'https://api.linkedin.com/v1/people/~:(firstName,lastName,email-address)?format=json',
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Accept': 'application/json',
                        'Accept-Charset': 'utf-8',
                        'Authorization': 'Bearer ' + token
                    },
                    json: true
                }
                console.log(userOptions.headers);
                request(userOptions, (err, response, body) => {
                    console.log("User RESPONSE: " + JSON.stringify(response));
                    console.log();
                    console.log("User BODY: " + JSON.stringify(body));
                    console.log();
                    console.log(body);
                    const mytoken = jwt.sign({
                        emailAddress: body.emailAddress
                    }, conn.secret, {
                        expiresIn: '24h'
                    });

                    let user = new User({
                        email: body.emailAddress,
                        username: body.firstName + " " + body.lastName
                    });

                    user.save((err) => {
                        if (err) {
                            if (err.code === 11000) {
                                res.json({
                                    token: mytoken,
                                    message: 'Username or e-mail already exists',
                                    user: {
                                        email: body.emailAddress,
                                        username: body.firstName + " " + body.lastName
                                    }
                                });
                            }
                        } else {
                            res.json({
                                token: mytoken,
                                message: 'User Registered',
                                user: {
                                    email: body.emailAddress,
                                    username: body.firstName + " " + body.lastName
                                }
                            });
                        }
                    });

                });
            }
        });

    });*/
module.exports = router;
