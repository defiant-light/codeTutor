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


var Ratings = sequelize.define('Ratings', {
  id: Sequelize.INTEGER,
  rater: Sequelize.STRING,
  rated: Sequelize.STRING,
  rating: Sequelize.STRING,
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


module.exports = Ratings;