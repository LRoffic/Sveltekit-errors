import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class permissions extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    rank_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'rank',
        key: 'ID'
      }
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'permissions',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ID" },
        ]
      },
      {
        name: "ID",
        using: "BTREE",
        fields: [
          { name: "ID" },
        ]
      },
      {
        name: "rank_link",
        using: "BTREE",
        fields: [
          { name: "rank_id" },
        ]
      },
    ]
  });
  }
}
