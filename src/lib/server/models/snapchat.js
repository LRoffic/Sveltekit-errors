import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class snapchat extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    type: {
      type: DataTypes.ENUM('img','video'),
      allowNull: false,
      defaultValue: "img"
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    list: {
      type: DataTypes.ENUM('public','black'),
      allowNull: false,
      defaultValue: "public"
    },
    published: {
      type: DataTypes.ENUM('Y','N'),
      allowNull: false,
      defaultValue: "Y"
    },
    published_date: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    author: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    social_network: {
      type: DataTypes.ENUM('Y','N'),
      allowNull: false,
      defaultValue: "Y"
    },
    facebook_url: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    thumbnailPath: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'snapchat',
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
        name: "id",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "FK__users",
        using: "BTREE",
        fields: [
          { name: "author" },
        ]
      },
    ]
  });
  }
}
