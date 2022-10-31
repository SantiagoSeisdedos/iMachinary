import { Person, Movie } from "../models/index.js";
import { groupBy } from "../commons/utils.js"

export async function getPersons(req, res) {
  try {
    const persons = await Person.findAll({
      atributes: ["id", "name", "lastName", "age"],
    });
    res.json(persons);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

export async function getPerson(req, res) {
  const { id } = req.params;
  try {
    const person = await Person.findOne({
      where: {
        id,
      },
    });
    res.json(person);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

export async function createPerson(req, res) {
  const { name, lastName, age } = req.body;
  try {
    let newPerson = await Person.create(
      {
        name,
        lastName,
        age,
      },
      {
        fields: ["name", "lastName", "age"],
      }
    );
    return res.json(newPerson);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
  res.json("received");
}


export const updatePerson = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, lastName, age } = req.body;

    const person = await Person.findByPk(id);
    // person.name = name;
    // person.lastName = lastName;
    // person.age = age;

    person.set({
      name,
      lastName,
      age
    })

    await person.save();

    res.json(person);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export async function deletePerson(req, res) {
  const { id } = req.params;
  try {
    await Movie.destroy({
      where: {
        personId: id,
      },
    });
    await Person.destroy({
      where: {
        id,
      },
    });
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export async function getPersonMovies(req, res) {
  const { id } = req.params;
  try {
    const person = await Person.findOne({
      where: {
        id,
      },
    });
    const groupedMovies = groupBy(await person.getMovies(), "id"); 
    const movies = Object.entries(groupedMovies).map(([key, value]) => {
      const { id, title, year } = value[0]
      return {
        id,
        title,
        year,
        roles: value.map(({ casting: { rol } }) => rol)
      };
    });
    res.json(movies);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
}