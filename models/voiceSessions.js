module.exports = (sequelize) => {
  const { DataTypes } = require('sequelize');

  const VoiceSession = sequelize.define('VoiceSession', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    server_member_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'server_members',
        key: 'id'
      }
    },
    channel_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'channels',
        key: 'id'
      }
    },
    peer_id: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    client_version: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    is_muted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    is_deafened: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    is_streaming: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    is_video_on: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    left_at: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'voice_sessions',
    timestamps: true,
    underscored: true
  });

  VoiceSession.associate = (models) => {
    VoiceSession.belongsTo(models.ServerMember, {
      foreignKey: 'server_member_id',
      as: 'serverMember'
    });

    VoiceSession.belongsTo(models.Channel, {
      foreignKey: 'channel_id',
      as: 'channel'
    });
  };

  return VoiceSession;
};