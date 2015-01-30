var User = require('../../db/index');
var bodyParser = require('body-parser');
// var request = require('request');

// exports.signupUserForm = function(req, res) {
//   res.render('signup');
// };

// exports.loginUserForm = function(req, res) {
//   res.render('login');
// };

// exports.logoutUser = function(req, res) {
//   // req.session.destroy(function(){
//     res.redirect('/login');
//   // });
// };

// exports.login = function(req, res) {
//   var username = req.body.username;
//   var password = req.body.password;

//   User.findOne({ username:username })
//     .then(function(user){
//         bcrypt.compare(password, user.attributes.password, function(err, result) {
//           if (result) {
//             req.session.regenerate(function(){
//               req.session.user = username;
//               res.redirect('/');
//             });
//           } else {
//             console.log('wrooooong password or log in!');
//             res.render('login');
//           }
//         });
//       })
//     .catch(function() {
//       res.render('login');
//     });

//   // User.find({ username: username })
//   //   .then(function(user) {
//   //     if (!user) {
//   //       res.redirect('/login');
//   //     } else {
//   //       user.comparePassword(password, function(match) {
//   //         if (match) {
//   //           util.createSession(req, res, user);
//   //         } else {
//   //           res.redirect('/login');
//   //         }
//   //       });
//   //     }
//   // });
// };

exports.signupUser = function(req, res) {
  var username=req.body.username;
  var password=req.body.password;

  User.find({ username: username })
    .complete(function(err, user) {
      if (user) {
        // User.create()
        console.log("pick a new username");
      }
      if (err) {
        User
          .create({
            username: username,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            password: password,
            // desired: 'english'
          })
          .complete(function(err, user) {
            if (!!err) {
              console.log('An error occurred while creating the table: user.create', err);
            } else {
              console.log('User created: ', user);
              res.render('/index.html');
            }
          });
      }
    });
  };