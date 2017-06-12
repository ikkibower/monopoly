'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    return queryInterface.createTable("propertie", {
        uuid: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV1,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING,
            notNull: true,
            allowNull: false
        },
        type: {
            type: Sequelize.STRING,
            notNull: true,
            allowNull: false
        },
        isOwned: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
            notNull: true,
            allowNull: false
        },
        owner: {
            type: Sequelize.STRING,
            notNull: true,
            allowNull: false
        },
        price: {
            type: Sequelize.INTEGER,
            notNull: true,
            allowNull: false
        },
        rent: {
            type: Sequelize.INTEGER,
            notNull: true,
            allowNull: false
        },
        rentOne: {
          type:Sequelize.INTEGER,
          notNull: true,
          allowNull: false
        },
        rentTwo: {
          type:Sequelize.INTEGER,
          notNull: true,
          allowNull: false
        },
        rentThree: {
          type:Sequelize.INTEGER,
          notNull: true,
          allowNull: false
        },
        rentFour: {
          type:Sequelize.INTEGER,
          notNull: true,
          allowNull: false
        },
        rentHotel: {
          type:Sequelize.INTEGER,
          notNull: true,
          allowNull: false
        },
        mortgage: {
            type: Sequelize.INTEGER,
            notNull: true,
            allowNull: false
        },
        isMotgaged: {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
            notNull: true,
            allowNull: false
        }
    });
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
