module.export = (sequelize) => {
    const { DataTypes } = require('sequelize');

    const GlobalUser = sequelize.define('GlobalUser', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        uuid: {
            type: DataTypes.CHAR(36),
            allowNull: false,
            unique: true
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: true,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        username: {
            type: DataTypes.STRING(32),
            allowNull: false,
            unique: true
        },
        discriminator: {
            type: DataTypes.STRING(4),
            allowNull: false,
            defaultValue: '0000'
        },
        password_hash: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        avatar_filename: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        banner_color: {
            type: DataTypes.STRING(7),
            defaultValue: '#5865F2'
        },
        bio: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        is_bot: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        is_system: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        global_status: {
            type: DataTypes.ENUM('online', 'idle', 'dnd', 'offline', 'invisible'),
            defaultValue: 'offline'
        },
        custom_status: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        last_ip_address: {
            type: DataTypes.STRING(45),
            allowNull: true
        }
    }, {
        tableName: 'global_users',
        timestamps: true,
        underscored: true
    });

    GlobalUser.associate = (models) => {
        GlobalUser.hasMany(models.Server, {
            foreignKey: 'owner_global_user_id',
            as: 'ownedServers'
        });

        GlobalUser.hasMany(models.ServerInvite, {
            foreignKey: 'created_by_global_user_id',
            as: 'createdInvites'
        });

        GlobalUser.hasMany(models.ModerationLog, {
            foreignKey: 'target_global_user_id',
            as: 'moderationLogsAsTarget'
        });

        GlobalUser.hasMany(models.ModerationLog, {
            foreignKey: 'moderator_global_user_id',
            as: 'moderationLogsAsModerator'
        });

        GlobalUser.hasMany(models.Message, {
            foreignKey: 'author_global_user_id',
            as: 'messages'
        });

        GlobalUser.belongsToMany(models.Server, {
            through: models.ServerMember,
            foreignKey: 'global_user_id',
            otherKey: 'server_id',
            as: 'servers'
        });
    };

    return GlobalUser;  
}