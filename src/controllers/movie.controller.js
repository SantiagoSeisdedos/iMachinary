import { Movie } from "../models/index.js";
import { groupBy } from "../commons/utils.js"

export async function getMovies(req, res) {
  try {
    const movies = await Movie.findAll(
      // { attributes: ["id", "personId", "title", "year"],}
    );
    res.json(movies);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export async function getMovie(req, res) {
  const { id } = req.params;
  try {
    const movie = await Movie.findOne({
      where: { id },
      attributes: ["id", "title", "year"],
    });
    res.json(movie);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export async function getMoviePersons(req, res) {
  const { id } = req.params;
  try {
    const movie = await Movie.findOne({
      where: {
        id,
      },
    });
    const groupedPeople = groupBy(await movie.getPeople(), "id");
    const people = Object.entries(groupedPeople).map(([key, value]) => {
      const { id, name, lastName, age } = value[0]
      return {
        id,
        name,
        lastName,
        age,
        roles: value.map(({ casting: { rol } }) => rol)
      };
    });
    res.json(people);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
}

export async function createMovie(req, res) {
  try {
    const { title, year } = req.body;
    const { id } = req.params;
    const newMovie = await Movie.create({
      title,
      year,
      personId: id,

    });
    res.json(newMovie);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export async function updateMovie(req, res) {
  const { id } = req.params;
  try {
    const movie = await Movie.findOne({
      where: { id },
    });

    movie.set(req.body);

    await movie.save();

    res.json(movie);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export async function deleteMovie(req, res) {
  const { id } = req.params;
  try {
    await Movie.destroy({
      where: { id },
    });

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
