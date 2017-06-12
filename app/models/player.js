module.exports = function(sequelize, DataTypes) {

    var Player = sequelize.define("Player", {
        id: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
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
        money: {
            type: DataTypes.INTEGER,
            notNull: true,
            allowNull: false
        },
        current_space: {
            type: DataTypes.INTEGER,
            notNull: true,
            allowNull: false
        },
        properties: {
            type: DataTypes.STRING,
        },
        active_turn: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            notNull: true,
            allowNull: false
        },
        jail: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            notNull: true,
            allowNull: false
        },

    }, {
        timestamps: false
    });
    return Player;
};
