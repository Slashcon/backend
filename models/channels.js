module.exports = (sequelize) => {
    const { DataTypes } = require('sequelize');

    const Channel = sequelize.define('Channel', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        server_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'servers',
                key: 'id'
            },
            parent_id: {
                type: DataTypes.INTEGER,
                allowNull: true,
                references: {
                    model: 'channels',
                    key: 'id'
                }
            },
            name: {
                type: DataTypes.STRING(100),
                allowNull: false
            },
            type: {
                type: DataTypes.ENUM('category', 'text', 'voice', 'announcement', 'stage'),
                defaultValue: 'text'
            },
            position: {
                type: DataTypes.INTEGER,
                defaultValue: 0
            },
            topic: {
                type: DataTypes.STRING(500),
                allowNull: true
            },
            is_private: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
            default_role_permissions: {
                type: DataTypes.BIGINT.UNSIGNED,
                defaultValue: 0
            },
            voice_bitrate: {
                type: DataTypes.INTEGER,
                defaultValue: 64000
            },
            voice_user_limit: {
                type: DataTypes.INTEGER,
                defaultValue: 0
            }
        }, 
    }, {
            tableName: 'channels',
            timestamps: true,
            underscored: true
    });

    Channel.associate = (models) => {
        Channel.belongTo(models.Server, {
            foreignKey: 'server_id',
            as: 'server'
        });

        Channel.belongTo(models.Channel, {
            foreignKey: 'parent_id',
            as: 'parent'
        });

        Channel.hasMany(models.Channel, {
            foreignKey: 'parent_id',
            as: 'children'
        });

        Channel.hasMany(models.Message, {
            foreignKey: 'channel_id',
            as: 'messages'
        });

        Channel.hasMany(models.ChannelPermissionOverride, {
            foreignKey: 'channel_id',
            as: 'permissionOverrides'
        });

        Channel.hasMany(models.VoiceSession, {
            foreignKey: 'channel_id',
            as: 'voiceSessions'
        });
    };

    return Channel;
}