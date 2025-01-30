import { heroes } from "./db.js";
import { v4 as uuidv4 } from "uuid";

export function getAllHeroes() {
  return heroes;
}

export function addHero({ alias, identity }) {
  const hero = {
    id: uuidv4(),
    alias,
    identity,
    powerDate: new Intl.DateTimeFormat("fr-FR").format(new Date()),
  };
  heroes.push(hero);
}

export function heroExists(alias) {
  return heroes.some((hero) => hero.alias === alias);
}

// Delete
// Update