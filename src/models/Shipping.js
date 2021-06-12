const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database.js');

const Shipping = sequelize.define('Shipping', {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true
	},
	customer: {
		type: DataTypes.STRING(100),
		allowNull: false
	},
	descrip: {
		type: DataTypes.TEXT,
		allowNull: false
	},
	status: {
		type: DataTypes.STRING(10),
		allowNull: false
	},
	origin_lat: {
		type: DataTypes.DECIMAL(11,8),
		allowNull: false
	},
	origin_long: {
		type: DataTypes.DECIMAL(11,8),
		allowNull: false
	},
	current_lat: {
		type: DataTypes.DECIMAL(11,8),
		allowNull: false
	},
	current_long: {
		type: DataTypes.DECIMAL(11,8),
		allowNull: false
	},
	end_lat: {
		type: DataTypes.DECIMAL(11,8),
		allowNull: false
	},
	end_long: {
		type: DataTypes.DECIMAL(11,8),
		allowNull: false
	},
	aprox_distance: {
		type: DataTypes.FLOAT,
		allowNull: false
	},
	finish_at: {
		type: DataTypes.DATE,
		allowNull: true
	}
});

module.exports = Shipping;
