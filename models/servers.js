module.exports = (sequelize) => {
  const { DataTypes } = require('sequelize');

  const Server = sequelize.define('Server', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    owner_global_user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'global_users',
        key: 'id'
      }
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    icon_filename: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    banner_filename: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    region: {
      type: DataTypes.STRING(50),
      defaultValue: 'russia'
    },
    max_members: {
      type: DataTypes.INTEGER,
      defaultValue: 100
    },
    verification_level: {
      type: DataTypes.ENUM('none', 'low', 'medium', 'high', 'highest'),
      defaultValue: 'none'
    },
    is_public: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    vanity_url: {
      type: DataTypes.STRING(32),
      allowNull: true,
      unique: true
    }
  }, {
    tableName: 'servers',
    timestamps: true,
    underscored: true
  });

  Server.associate = (models) => {
    Server.belongsTo(models.GlobalUser, {
      foreignKey: 'owner_global_user_id',
      as: 'owner'
    });

    Server.belongsToMany(models.GlobalUser, {
      through: models.ServerMember,
      foreignKey: 'server_id',
      otherKey: 'global_user_id',
      as: 'members'
    });

    Server.hasMany(models.ServerRole, {
      foreignKey: 'server_id',
      as: 'roles'
    });

    Server.hasMany(models.Channel, {
      foreignKey: 'server_id',
      as: 'channels'
    });

    Server.hasMany(models.ServerInvite, {
      foreignKey: 'server_id',
      as: 'invites'
    });

    Server.hasMany(models.ModerationLog, {
      foreignKey: 'server_id',
      as: 'moderationLogs'
    });
  };

  return Server;
};