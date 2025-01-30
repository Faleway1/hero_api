import { v4 as uuidv4 } from "uuid";

export const heroes = [
  {
    id: uuidv4(),
    alias: "Batman",
    identity: "Bruce Wayne",
    powerDate: "04/08/1987",
  },
  {
    id: uuidv4(),
    alias: "Superman",
    identity: "Clark Kent",
    powerDate: "03/03/1990",
  },
];