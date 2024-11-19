import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class categories extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    icon: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    iconColor: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    published: {
      type: DataTypes.ENUM('Y','N'),
      allowNull: false,
      defaultValue: "N"
    }
  }, {
    sequelize,
    tableName: 'categories',
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
