'use strict';
const { Model } = require('sequelize');
const jwt = require('jsonwebtoken');
const { AvailableSocialLogins, UserLoginType } = require('../constant');
const {
	ACCESS_TOKEN_SECRET,
	ACCESS_TOKEN_EXPIRY,
	REFRESH_TOKEN_SECRET,
	REFRESH_TOKEN_EXPIRY,
} = require('../config/serverConfig');
module.exports = (sequelize, DataTypes) => {
	class Player extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		async generateAccessToken() {
			return new Promise((resolve, reject) => {
				jwt.sign(
					{
						id: this.id,
						email: this.email,
					},
					ACCESS_TOKEN_SECRET,
					{ expiresIn: ACCESS_TOKEN_EXPIRY },
					(err, token) => {
						if (!err) {
							return resolve(token);
						}
						reject(err);
					}
				);
			});
		}
		async generateRefreshToken() {
			return new Promise((resolve, reject) => {
				jwt.sign(
					{
						id: this.id,
						email: this.email,
					},
					REFRESH_TOKEN_SECRET,
					{ expiresIn: REFRESH_TOKEN_EXPIRY },
					(err, token) => {
						if (!err) {
							return resolve(token);
						}
						reject(err);
					}
				);
			});
		}
		static associate(models) {
			// define association here
		}
	}
	Player.init(
		{
			avatar: {
				type: DataTypes.STRING,
				validate: {
					isUrl: true,
				},
				defaultValue: 'https://dummyimage.com/200x200/807d80/fff.png',
			},
			name: {
				type: DataTypes.STRING,
				unique: true,
				allowNull: false,
			},
			email: {
				type: DataTypes.STRING,
				unique: true,
				allowNull: false,
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					min: 4,
				},
			},
			loginType: {
				type: DataTypes.ENUM,
				values: AvailableSocialLogins,
				allowNull: false,
				defaultValue: UserLoginType.EMAIL_PASSWORD,
			},
			isEmailVerified: {
				type: DataTypes.BOOLEAN,
				defaultValue: false,
			},
			emailVerificationToken: {
				type: DataTypes.STRING,
			},
			emailVerificationExpiry: {
				type: DataTypes.DATE,
			},
			refreshToken: {
				type: DataTypes.STRING,
			},
			forgotPasswordToken: {
				type: DataTypes.STRING,
			},
			forgotPasswordExpiry: {
				type: DataTypes.DATE,
			},
		},
		{
			sequelize,
			modelName: 'Player',
		}
	);
	return Player;
};
