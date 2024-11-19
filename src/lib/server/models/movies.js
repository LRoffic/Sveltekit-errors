import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class movies extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    imdb_id: {
      type: DataTypes.STRING(250),
      allowNull: false,
      primaryKey: true
    },
    json: {
      type: DataTypes.JSON,
      allowNull: false
    },
    created: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    last_update: {
      type: DataTypes.BIGINT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'movies',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "imdb_id" },
        ]
      },
      {
        name: "imdb_id",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "imdb_id" },
        ]
      },
    ]
  });
  }
}
