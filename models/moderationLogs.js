MediaSourceHandle.export = (sequelize) => {
    const { DataTypes } = require('sequelize');

    const ModerationLog = sequelize.define('ModerationLog', {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        server_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'servers',
                key: 'id'
            }
        },
        target_global_user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'global_users',
                key: 'id'
            }
        },
        moderator_global_user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'global_users',
                key: 'id'
            }
        },
        action_type: {
            type: DataTypes.ENUM('warn', 'kick', 'ban', 'mute', 'unban', 'role_add', 'role_remove', 'nickname_change'),
            allowNull: false
        },
        reason: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        duration_minutes: {
            type: DataTypes.INTEGER,
            allowNull: true
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
        tableName: 'moderation_logs',
        timestamps: true,
        underscored: true
    });

    ModerationLog.associate = (models) => {
        ModerationLog.belongsTo(models.Server, {
            foreignKey: 'server_id',
            as: 'server'
        });

        ModerationLog.belongsTo(models.GlobalUser, {
            foreignKey: 'target_global_user_id',
            as: 'target'
        });

        ModerationLog.belongsTo(models.GlobalUser, {
            foreignKey: 'moderator_global_user_id',
            as: 'moderator',
            constraints: false
        });
    };

    return ModerationLog;
}