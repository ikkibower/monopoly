module.exports = function(sequelize, DataTypes) {

    var Player = sequelize.define("Player", {
        uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            primaryKey: true
        },
        player_name: {
            type: DataTypes.STRING,
            notNull: true,
            allowNull: false,
            validate: {
                len: [1],
                notEmpty: true
            }
        },
        piece: {
            type: DataTypes.STRING,
            notNull: true,
            allowNull: false
        },
        date: DataTypes.DATE
    }, {
        timestamps: true
    });
    return Player;
};
