var Sequelize = require('sequelize');

var sequelize = new Sequelize('languageapp', 'root', '', {
  dialect: 'mysql',
});

//maybe don't need?
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
  // firstname: Sequelize.STRING,
  // lastname: Sequelize.STRING,
  password: Sequelize.STRING,
  // desired: Sequelize.STRING,
  // native: Sequelize.STRING
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

//make example user
// User
//   .create({
//     username: 'roberto',
//     firstname: 'robert',
//     lastname: 'ing',
//     password: 'password',
//     desired: 'english'
//   })
//   .complete(function(err, user) {
//     if (!!err) {
//       console.log('An error occurred while creating the table: user.create', err);
//     } else {
//       console.log('User created: ', user);
//     }
//   });

module.exports = User;