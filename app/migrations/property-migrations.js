'use strict';
module.exports = {
    up: function(queryInterface, Sequelize) {
        return [
            queryInterface.bulkInsert('propertie', [{
                id: 0,
                name: "go",
                type: "go",
                createdAt: Date.now(),
                updatedAt: Date.now()
            }])

        ];
    },
    down: function(queryInterface, Sequelize) {
        return queryInterface.dropTable('propertie');
    }
};
