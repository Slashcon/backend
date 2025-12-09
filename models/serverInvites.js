module.exports = (sequelize) => {
    const { DataTypes } = require('sequelize');

    const ServerInvite = sequelize.define('ServerInvite', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        code: {
            type: DataTypes.STRING(24),
            allowNull: false,
            unique: true
        },
        server_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'servers',
                key: 'id'
            }
        },
        created_by_global_user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'global_users',
                key: 'id'
            }
        },
        max_uses: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        uses_count: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        expires_at: {
            type: DataTypes.DATE,
            allowNull: true
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    }, {
        tableName: 'server_invites',
        timestamps: true,
        underscored: true
    });

    ServerInvite.associate = (models) => {
        ServerInvite.belongsTo(models.Server, {
            foreignKey: 'server_id',
            as: 'server'
        });

        ServerInvite.belongsTo(models.GlobalUser, {
            foreignKey: 'created_by_global_user_id',
            as: 'creator'
        });
    };

    return ServerInvite;
}