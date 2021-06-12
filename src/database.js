const database = require('./config/db.js');
const Sequelize = require('sequelize');
const mysql = require('mysql2');

const { host, port, user, password, db } = database;

function initDb(){
	const connection = mysql.createConnection({ host,port,user,password });
	connection.query(`CREATE DATABASE IF NOT EXISTS \`${db}\`;`);
}

initDb();

const sequelize = new Sequelize(db,user,password, { 
	host: host, dialect: 'mysql', dialectOptions: {
	}});

module.exports = sequelize;
