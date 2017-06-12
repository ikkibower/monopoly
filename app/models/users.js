module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("user", {
        uuid: {
            type: DataTypes.INTEGER,
            // defaultValue: DataTypes.UUIDV1,
            autoIncrement: true,
            primaryKey: true
        },
        username: {
            type: DataTypes.STRING,
            notNull: true,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            notNull: true,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            notNull: true,
            allowNull: false
        },
        status: {type: DataTypes.ENUM('active','inactive'),defaultValue:'active' }
    });
    return User;
};
