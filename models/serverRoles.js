module.exports = (sequelize) => {
  const { DataTypes } = require('sequelize');

  const ServerRole = sequelize.define('ServerRole', {
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
      }
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    color: {
      type: DataTypes.STRING(7),
      defaultValue: '#99AAB5'
    },
    permissions: {
      type: DataTypes.BIGINT.UNSIGNED,
      defaultValue: 0
    },
    position: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    is_hoist: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    is_mentionable: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    tableName: 'server_roles',
    timestamps: true,
    underscored: true,
    indexes: [
      {
        unique: true,
        fields: ['server_id', 'position']
      }
    ]
  });

  ServerRole.associate = (models) => {
    ServerRole.belongsTo(models.Server, {
      foreignKey: 'server_id',
      as: 'server'
    });

    ServerRole.belongsToMany(models.ServerMember, {
      through: models.MemberRole,
      foreignKey: 'role_id',
      otherKey: 'server_member_id',
      as: 'serverMembers'
    });

    ServerRole.hasMany(models.ChannelPermissionOverride, {
      foreignKey: 'target_id',
      constraints: false, 
      scope: {
        target_type: 'role'
      },
      as: 'permissionOverrides'
    });
  };

  return ServerRole;
};