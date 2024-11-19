import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class categories_articles extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    subcategorie_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'subcategories',
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
    }
  }, {
    sequelize,
    tableName: 'categories_articles',
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
        name: "Colonne 3",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "article",
        using: "BTREE",
        fields: [
          { name: "article_id" },
        ]
      },
      {
        name: "subcategorie_article",
        using: "BTREE",
        fields: [
          { name: "subcategorie_id" },
        ]
      },
    ]
  });
  }
}
