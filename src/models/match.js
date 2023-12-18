'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Match extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	Match.init(
		{
			player1Id: {
				type: DataTypes.INTEGER,
				references: {
					model: sequelize.Player,
					key: 'id',
				},
			},
			player2Id: {
				type: DataTypes.INTEGER,
				references: {
					model: sequelize.Player,
					key: 'id',
				},
			},
			roomcode: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			duration: {
				type: DataTypes.INTEGER,
				allowNull: false,
				defaultValue: 60,
			},
			isSearching: {
				type: DataTypes.BOOLEAN,
				defaultValue: false,
			},
			isFinished: {
				type: DataTypes.BOOLEAN,
				defaultValue: false,
			},
		},
		{
			sequelize,
			modelName: 'Match',
		}
	);
	return Match;
};
