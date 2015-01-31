var User = require('../../db/index');
// var bodyParser = require('body-parser');

exports.signUpUserForm = function(req, res) {
  res.redirect('../../client/signup.html');
};

exports.signInUserForm = function(req, res) {
  res.redirect('../../client/signin.html');
};

// exports.logoutUser = function(req, res) {
//   // req.session.destroy(function(){
//     res.redirect('/login');
//   // });
// };

exports.signInUser = function(req, res) {
  var username = req.body.username;
  var password = req.body.password;

  User
    .findOne({ where: 
      { username: username }
    })
    .then(function(user){
      // console.log(user.username);
        if (user.password === password) {
          res.redirect('../../index.html');
        } else {
          res.redirect('../../client/signin.html');
        }
      })
    .catch(function() { 
      res.redirect('../../client/signin.html');
    });
};
        // bcrypt.compare(password, user.attributes.password, function(err, result) {
          // if (result) {
            // req.session.regenerate(function(){
              // req.session.user = username;
              // res.redirect('/');
            // });
          // } else {
            // console.log('wrooooong password or log in!');
            // res.render('login');
          // }
        // });
      // })
    // .catch(function() {
      // res.render('login');


  // User.find({ username: username })
  //   .then(function(user) {
  //     if (!user) {
  //       res.redirect('/login');
  //     } else {
  //       user.comparePassword(password, function(match) {
  //         if (match) {
  //           util.createSession(req, res, user);
  //         } else {
  //           res.redirect('/login');
  //         }
  //       });
  //     }
  // });


//TO DO: salt and hash passwords
exports.signUpUser = function(req, res) {
  var username=req.body.username;
  var password=req.body.password;

  User.findOne({ where : { 
    username: username }
  })
  .complete(function(err, user) {
    if (user) {
      console.log("pick a new username");
    }
    if (!user) {
      User
        .create({
          username: username,
          password: password, //salt and hash password
          // firstname: req.body.firstname, //add later?
          // lastname: req.body.lastname, //add later?
          // native: req.body.native, //add later?
          // desired: req.body.desired //add later?
        })
        .complete(function(err, user) {
          if (!!err) {
            console.log('An error occurred while creating the table: user.create', err);
          } else {
            console.log('User created: ', user.username);
            res.redirect('./index.html');
          }
        });
    }
  });
};