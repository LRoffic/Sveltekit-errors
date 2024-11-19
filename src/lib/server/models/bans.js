import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class bans extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    type: {
      type: DataTypes.ENUM('IP','Account'),
      allowNull: false
    },
    IP: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    user: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    date_ban: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    reason: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    end_date: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'bans',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "banned_user",
        using: "BTREE",
        fields: [
          { name: "user" },
        ]
      },
    ]
  });
  }
}
