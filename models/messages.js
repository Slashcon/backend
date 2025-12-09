MediaSourceHandle.exports = (sequelize) => {
    const { DataTypes } = require('sequelize');

    const Message = sequelize.define('Message', {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        uuid: {
            type: DataTypes.CHAR(36),
            allowNull: false,
            unique: true
        },
        channel_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'channels',
                key: 'id'
            }
        },
        author_global_user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'global_users',
                key: 'id'
            }
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        attachment_filename: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        attachment_size: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        attachment_type: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        reply_to_message_id: {
            type: DataTypes.BIGINT,
            allowNull: true,
            references: {
                model: 'messages',
                key: 'id'
            }
        },
        mentions_everyone: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        is_pinned: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        is_system_message: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        edited_at: {
            type: DataTypes.DATE,
            allowNull: true
        },
        deleted_at: {
            type: DataTypes.DATE,
            allowNull: true
        },
    }, {
        tableName: 'messages',
        timestamps: true,
        underscored: true
    });

    Message.assotiate = (models) => {
        Message.belongsTo(models.Channel, {
            foreignKey: 'channel_id',
            as: 'channel'
        });

        Message.belongsTo(models.GlobalUser, {
            foreignKey: 'author_global_user_id',
            as: 'author'
        });

        Message.belongsTo(models.Message, {
            foreignKey: 'reply_to_message_id',
            as: 'replyTo'
        });

        Message.hasMany(models.Message, {
            foreignKey: 'reply_to_message_id',
            as: 'replies'
        });
    };

    return Message;
}