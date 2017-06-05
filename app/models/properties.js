module.exports = function(sequelize, DataTypes) {
    var Property = sequelize.define("property", {
        uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            notNull: true,
            allowNull: false
        },
        type: {
            type: DataTypes.STRING,
            notNull: true,
            allowNull: false
        },
        owned: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            notNull: true,
            allowNull: false
        },
        saleValue: {
            type: DataTypes.INTEGER,
            notNull: true,
            allowNull: false
        },
        rent: {
            type: DataTypes.INTEGER,
            notNull: true,
            allowNull: false
        },
        mortgage: {
            type: DataTypes.INTEGER,
            notNull: true,
            allowNull: false
        },
    });
    return Property;
};
