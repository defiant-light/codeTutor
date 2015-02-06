// Use sequelize as our ORM. Currently just a user table is needed

var Sequelize = require('sequelize');

var host = 'localhost';
var port = 3306;


//dev vs prod credentials
if (process.env.languageappdb) {
  var sequelize = new Sequelize('codeTutor', 'aberrantmarble', 'hr23greenfield', {
    host: process.env.languageappdb,
    port: process.env.languageappdbport,
    dialect: 'mysql',
  });  

} else { var sequelize = new Sequelize('codeTutor', 'root', 'flyhigh21', {
  dialect: 'mysql',
});
}

sequelize
  .authenticate()
  .complete(function(err) {
    if (!!err) {
      console.log('Unable to connect to the database:', err);
    } else {
      console.log('Connection has been established successfully');
    }
  });

var User = sequelize.define('User', {
  username: Sequelize.STRING,
  facebookId: Sequelize.STRING,   // string bc facebookIds are larger than largest integer value allowed (2147483647 will be used for all FB ids otherwise)
  firstname: Sequelize.STRING,
  lastname: Sequelize.STRING,
  password: Sequelize.STRING,
  salt: Sequelize.STRING,
  desired: Sequelize.STRING,
  native: Sequelize.STRING
});

User
  .sync()
  .complete(function(err) {
    if (!!err) {
      console.log('An error occurred while creating the table: user.sync', err);
    } else {
      console.log('Table created!');
      }
    });

var Ratings = sequelize.define('Ratings', {
  id: Sequelize.INTEGER,
  rater: Sequelize.STRING,
  rated: Sequelize.STRING,
  ratingtype: Sequelize.STRING,
  type: Sequelize.STRING
});

Ratings
  .sync()
  .complete(function(err) {
    if (!!err) {
      console.log('An error occurred while creating the table: user.sync', err);
    } else {
      console.log('Table created!');
      }
    });

// User
//   .create({
//     username: 'aberrantmarble',
//     firstname: 'aberrant',
//     lastname: 'marble',
//     password: 'password',
//     desired: 'english',
//     native: 'english'
//   })
//   .complete(function(err, user) {
//     if (!!err) {
//       console.log('An error occurred while creating the table: user.create', err);
//     } else {
//       console.log('User created: ', user);
//     }
//   });

module.exports = User;