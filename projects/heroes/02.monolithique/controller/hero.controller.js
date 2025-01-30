import { addHero, getAllHeroes, heroExists } from "../model/hero.model.js";

export async function renderHome(req, res) {
  res.render("index", {
    heroes: getAllHeroes(),
    h1: "Bureau d'enregistrement",
  });
}

export async function addHeroes(req, res) {
  const { alias, identity } = req.body;
  if (!alias || alias.length < 3 || !/^[a-zA-Z ]+$/.test(alias)) {
    return res
      .status(400)
      .send(
        "Le nom du héros est requis, il doit faire au moins 3 caractères et ne pas contenir de caractères spéciaux (espaces autorisés) !"
      );
  }
  if (!identity || identity.length < 3 || !/^[a-zA-Z ]+$/.test(identity)) {
    return res
      .status(400)
      .send(
        "L'identité du héros est requis, il doit faire au moins 3 caractères et ne pas contenir de caractères spéciaux (espaces autorisés) !"
      );
  }

  if (heroExists(alias)) {
    return res.status(400).send("Le héros existe déjà !!");
  }

  addHero({ alias, identity });

  res.redirect("/");
}

export async function renderHeroesList(req, res) {
  res.render("heroes", { heroes: getAllHeroes(), h1: "Liste des héros:" });
}
