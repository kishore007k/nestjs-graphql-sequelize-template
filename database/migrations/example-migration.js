"use strict";

// To create a migration the Model must be present or created first.

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn(
          "Users",
          "alias",
          {
            type: Sequelize.DataTypes.STRING,
          },
          { transaction: t },
        ),
      ]);
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn("Users", "alias", { transaction: t }),
      ]);
    });
  },
};
