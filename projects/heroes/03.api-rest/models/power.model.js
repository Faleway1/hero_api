import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";
import Hero from "./hero.model.js";


const Power = sequelize.define(
  "powers",
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    powerName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    powerDesc: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id_hero: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Hero,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    defaultScope: {
      where: {
        isDeleted: false,
      },
    },
    scopes: {
      deleted: {
        where: {
          isDeleted: true,
        },
      },
      withDeleted: {},
    },
  }
);

Hero.hasMany(Power, { foreignKey: "id_hero" }); 
Power.belongsTo(Hero, { foreignKey: "id_hero" });

export default Power;