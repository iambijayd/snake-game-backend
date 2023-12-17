'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('Matches', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			player1Id: {
				type: Sequelize.INTEGER,
				references: {
					model: 'players',
					key: 'id',
				},
			},
			player2Id: {
				type: Sequelize.INTEGER,
				references: {
					model: 'players',
					key: 'id',
				},
			},
			roomcode: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			isSearching: {
				type: Sequelize.BOOLEAN,
				defaultValue: false,
			},
			isFinished: {
				type: Sequelize.BOOLEAN,
				defaultValue: false,
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
		await queryInterface.dropTable('Matches');
	},
};
