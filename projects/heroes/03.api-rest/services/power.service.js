import {
    ConflictError,
    BadRequestError,
    NotFoundError,
  } from "../errors/api.error.js";
  import { PowerRepository } from "../repositories/index.repository.js";
  
  export async function getPowerById(id) {
    const power = await PowerRepository.getPowerById(id);
  
    if (!power) {
      throw new NotFoundError("Le pouvoir n'existe pas.");
    }
  
    return {
      id: power.id,
      alias: power.alias,
      powerDate: power.powerDate.slice(-4),
    };
  }
  
  export async function createPower({ alias, identity, powerDate }) {
    if (!alias || alias.length < 3 || !/^[a-zA-Z ]+$/.test(alias)) {
      throw new BadRequestError("Alias non valide (3 caractères min, etc.)");
    }
  
    if (await PowerRepository.PowerExists(alias)) {
      throw new ConflictError("Le pouvoir existe déjà (alias).");
    }
  
    const power = await PowerRepository.createPower({ alias, identity, powerDate });
  
    return power.dataValues;
  }
  
  export async function updatePower(id, { alias, identity, powerDate }) {
    if (!alias || alias.length < 3 || !/^[a-zA-Z ]+$/.test(alias)) {
      throw new BadRequestError("Alias non valide (3 caractères min, etc.)");
    }
  
    if (await PowerRepository.PowerExists(alias)) {
      throw new ConflictError("Le pouvoir existe déjà (alias).");
    }
  
    if (!await PowerRepository.getPowerById(id)) {
      throw new NotFoundError("Le pouvoir n'existe pas, id:");
    }
  
    const power = await PowerRepository.updatePower(id, {
      alias,
      identity,
      powerDate,
    });
  
    return power.dataValues;
  }
  
  export async function deletePower(id) {
    if (!(await getpowerById(id))) {
      throw new NotFoundError("Le pouvoir n'existe pas.");
    }
  
    return await PowerRepository.deletepower(id);
  }
  
  export async function getAllPowers() {
    const poweres = await PowerRepository.getAllPowers();
  
    const formattedpoweres = poweres.map((power) => {
      return {
        id: power.id,
        alias: power.alias,
        powerDate: power.powerDate.slice(-4),
      };
    });
  
    return formattedpoweres;
  }
  
  export async function restoredPower(id) {
    const restoredpower = await PowerRepository.restoredPower(id);
  
    if (!restoredpower) {
      throw new NotFoundError(
        "Le pouvoir n'existe pas. Le pouvoir ne peut pas être restauré."
      );
    }
  
    if (await PowerRepository.PowerExists(restoredpower.alias)) {
      throw new ConflictError("L'alias existe déjà. Le pouvoir ne peut pas être restauré.")
    }
  
    return restoredpower;
  }
  