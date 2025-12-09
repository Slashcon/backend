module.exports = (sequelize) => {
    const { DataTypes } = require('sequelize');

    const ChannelPermissionOverride = sequelize.define('ChannelPermissionOverride', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        channel_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'channels',
                key: 'id'
            }
        },
        target_type: {
            type: DataTypes.ENUM('role', 'member'),
            allowNull: false
        },
        target_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        allow_permissions: {
            type: DataTypes.BIGINT.UNSIGNED,
            defaultValue: 0
        },
        deny_permissions: {
            type: DataTypes.BIGINT.UNSIGNED,
            defaultValue: 0
        },
    }, {tableName: 'channel_permission_overrides',
        timestamps: false,
        underscored: true,
        indexes: [
            {
                unique: true,
                fields: ['channel_id', 'target_type', 'target_id']
            }
        ]
    });

    ChannelPermissionOverride.associate = (models) => {
        ChannelPermissionOverride.belongsTo(models.Channel, {
            foreignKey: 'channel_id',
            as: 'channel'
        });

        ChannelPermissionOverride.belongsTo(models.ServerRole, {
            foreignKey: 'target_id',
            constraints: false,
            as: 'role'
        });

        ChannelPermissionOverride.belongsTo(models.ServerMember, {
            foreignKey: 'target_id',
            constraints: false,
            as: 'member'
        });
    };

    return ChannelPermissionOverride;
}