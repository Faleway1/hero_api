import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";


const Mission = sequelize.define(
  "missions",
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    missionName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    missionDesc: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    missionDifficulty: {
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

export default Mission;