import { FOREIGNKEYS } from "sequelize/lib/query-types";
import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";

const Hero = sequelize.define(
  "heroes",
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    alias: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    identity: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    powerDate: {
      type: DataTypes.STRING,
      allowNull: false,
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
  },
  "powers", {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    powerName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    powerDesc: {
      type: DataTypes.STRING,
      allowNull: false
    },
    id_hero: {
      FOREIGNKEYS: true,
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  },
  "missions", {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    missionName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    missionDesc: {
      type: DataTypes.STRING,
      allowNull: false
    },
    missionDifficulty: {
      type: DataTypes.STRING,
      allowNull: false
    },
    id_hero: {
      FOREIGNKEYS: true,
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }
);

export default Hero;
