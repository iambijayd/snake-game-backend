'use strict';

const { AvailableSocialLogins, UserLoginType } = require('../constant');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('Players', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			avatar: {
				type: Sequelize.STRING,
				validate: {
					isUrl: true,
				},
				defaultValue: 'https://dummyimage.com/200x200/807d80/fff.png',
			},
			name: {
				type: Sequelize.STRING,
				allowNull: false,
				unique: true,
			},
			email: {
				type: Sequelize.STRING,
				allowNull: false,
				unique: true,
				validate: {
					isEmail: true,
				},
			},
			password: {
				type: Sequelize.STRING,
				validate: {
					min: 4,
				},
			},
			loginType: {
				type: Sequelize.ENUM,
				allowNull: false,
				values: AvailableSocialLogins,
				defaultValue: UserLoginType.EMAIL_PASSWORD,
			},
			isEmailVerified: {
				type: Sequelize.BOOLEAN,
				defaultValue: false,
			},
			emailVerificationToken: {
				type: Sequelize.STRING,
			},
			emailVerificationExpiry: {
				type: Sequelize.DATE,
			},
			refreshToken: {
				type: Sequelize.STRING,
			},
			forgotPasswordToken: {
				type: Sequelize.STRING,
			},
			forgotPasswordExpiry: {
				type: Sequelize.DATE,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('Players');
	},
};
