import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class users extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    last_password_modify: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: 0
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    rank_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 1,
      references: {
        model: 'rank',
        key: 'ID'
      }
    },
    verify_email_code: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    last_ip: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    register_ip: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    last_connexion: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    register_date: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    avatar: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    otp: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    otp_time: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'users',
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
        name: "rank_link_user",
        using: "BTREE",
        fields: [
          { name: "rank_id" },
        ]
      },
      {
        name: "ID",
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
