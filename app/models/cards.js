module.exports = function(sequelize, DataTypes) {
    var Card = sequelize.define("Card", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        text: {
            type: DataTypes.STRING,
            notNull: true,
            allowNull: false,
        }
    });
    return Card;
};
