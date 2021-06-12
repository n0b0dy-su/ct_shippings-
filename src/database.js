const database = require('./config/db.js');
const Sequelize = require('sequelize');

const { host, port, user, password, db } = database;

// DELETE THIS
//console.log(database);

/*const connection = mysql.createConnection({
	host,
	port,
	user,
	password
});
*/

//connection.query(`CREATE DATABASE IF NOT EXISTS \`${db}\`;`);

const sequelize = new Sequelize(db,user,password, { 
	host: host, dialect: 'mysql'});

//Test connection
/*try {
  sequelize.authenticate();
  console.log('[DB CONNECTED]');
} catch (error) {
  console.error('DB CONNECTION ERROR', error);
}
*/

module.exports = sequelize;
