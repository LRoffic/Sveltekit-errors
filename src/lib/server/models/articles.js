import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class articles extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    description: {
      type: DataTypes.STRING(150),
      allowNull: true
    },
    published_date: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    author: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    published: {
      type: DataTypes.ENUM('Y','N'),
      allowNull: false,
      defaultValue: "N"
    },
    allow_comment: {
      type: DataTypes.ENUM('Y','N'),
      allowNull: false,
      defaultValue: "N"
    },
    update_date: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    img: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    content: {
      type: DataTypes.JSON,
      allowNull: false
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'categories',
        key: 'id'
      }
    },
    note: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    imdbid: {
      type: DataTypes.STRING(250),
      allowNull: true
    },
    type: {
      type: DataTypes.ENUM('movie','serie'),
      allowNull: true
    },
    source: {
      type: DataTypes.JSON,
      allowNull: true
    },
    folderId: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'articles',
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
        name: "article_author",
        using: "BTREE",
        fields: [
          { name: "author" },
        ]
      },
      {
        name: "FK_articles_categories",
        using: "BTREE",
        fields: [
          { name: "category_id" },
        ]
      },
      {
        name: "imdbid",
        using: "BTREE",
        fields: [
          { name: "imdbid" },
        ]
      },
    ]
  });
  }
}
