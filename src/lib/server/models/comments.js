import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class comments extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    author_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    article_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'articles',
        key: 'id'
      }
    },
    date_published: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    published: {
      type: DataTypes.ENUM('Y','N'),
      allowNull: false,
      defaultValue: "Y"
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    perspective_socre: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: "0"
    },
    moderator_score: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: "0"
    },
    online: {
      type: DataTypes.ENUM('Y','N'),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'comments',
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
        name: "article_comment",
        using: "BTREE",
        fields: [
          { name: "article_id" },
        ]
      },
      {
        name: "comment_author",
        using: "BTREE",
        fields: [
          { name: "author_id" },
        ]
      },
    ]
  });
  }
}
