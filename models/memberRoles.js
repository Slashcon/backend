module.exports = (sequelize) => {
    const { DataTypes } = require('sequelize');

    const MemberRole = sequelize.define('MemberRole', {
        server_member_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'server_members',
                key: 'id'
            }
        },
        role_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'server_roles',
                key: 'id'
            }
        }
    }, {
        tableName: 'member_roles',
        timestamps: true,
        underscored: true
    });

    MemberRole.associate = (models) => {
        MemberRole.belongsTo(models.ServerMember, {
            foreignKey: 'server_member_id',
            as: 'serverMember'
        });

        MemberRole.belongsTo(models.ServerRole, {
            foreignKey: 'role_id',
            as: 'role'
        });
    };

    return MemberRole;
}