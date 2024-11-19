import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class config extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    FacebookToken: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    FacebookTokenUpdateDate: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    JoinAppNotification: {
      type: DataTypes.ENUM('Y','N'),
      allowNull: false,
      defaultValue: "Y"
    }
  }, {
    sequelize,
    tableName: 'config',
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
    ]
  });
  }
}
