module.exports = (sequelize) => {
    const { DataTypes } = require('sequelize');

    const ServerMember = sequelize.define('ServerMember', {
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
        global_user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'global_users',
                key: 'id'
            }
        },
        nickname: {
            type: DataTypes.STRING(32),
            allowNull: true
        },
        avatar_ocerride: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        bio_override: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        last_message_at: {
            type: DataTypes.DATE,
            allowNull: true
        },
        is_kicked: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        is_banned: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        ban_reason: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    }, {
        tableName: 'server_members',
        timestamps: true,
        underscored: true,
        indexes: [
            {
                unique: true,
                fields: ['server_id', 'global_user_id']
            }
        ]
    });

    ServerMember.associate = (models) => {
        ServerMember.belongsTo(models.Server, {
            foreignKey: 'server_id',
            as: 'server'
        });

        ServerMember.belongsTo(models.GlobalUser, {
            foreignKey: 'global_user_id',
            as: 'globalUser'
        });

        ServerMember.belongsToMany(models.ServerRole, {
            through: models.MemberRole,
            foreignKey: 'server_member_id',
            otherKey: 'role_id',
            as: 'role'
        });

        ServerMember.hasMany(models.VoiceSession, {
            foreignKey: 'server_member_id',
            as: 'voiceSessions'
        });

        ServerMember.hasMany(models.ModerationLog, {
            foreignKey: 'target_global_user_id',
            as: 'moderationLogs',
            sourceKey: 'global_user_id'
        });

        return ServerMember;
    }
}