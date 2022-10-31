import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";


export const Person = sequelize.define(
  "person",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);


export const Movie = sequelize.define(
  "movie",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    year: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

export const Casting = sequelize.define(
  "casting",
  {
    personId: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    movieId: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    rol: {
      type: DataTypes.ENUM('actor/actriz', 'director', 'productor'),
      primaryKey: true
    }
  },
  {
    timestamps: false,
  }
);

Movie.belongsToMany(Person, { through: { model: Casting, unique: false} });
Person.belongsToMany(Movie, { through: { model: Casting, unique: false} });

