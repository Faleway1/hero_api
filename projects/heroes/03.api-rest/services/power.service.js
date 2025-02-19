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
      powerName: power.powerName,
      powerDesc: power.powerDesc,
      id_hero: power.id_hero
    };
  }
  
  export async function createPower({ powerName, powerDesc, id_hero }) {
    if (!powerName || powerName.length < 3 || !/^[a-zA-Z ]+$/.test(powerName)) {
      throw new BadRequestError("power non valide (3 caractères min, etc.)");
    }
  
    if (await PowerRepository.PowerExists(powerName)) {
      throw new ConflictError("Le pouvoir existe déjà (powerName).");
    }
  
    const power = await PowerRepository.createPower({ powerName, powerDesc, id_hero });
  
    return power.dataValues;
  }
  
  export async function updatePower(id, { powerName, powerDesc, id_hero }) {
    if (!powerName || powerName.length < 3 || !/^[a-zA-Z ]+$/.test(powerName)) {
      throw new BadRequestError("Nom du pouvoir non valide (3 caractères min, etc.)");
    }
  
    if (await PowerRepository.PowerExists(powerName)) {
      throw new ConflictError("Le pouvoir existe déjà (power).");
    }
  
    if (!await PowerRepository.getPowerById(id)) {
      throw new NotFoundError("Le pouvoir n'existe pas, id:");
    }
  
    const power = await PowerRepository.updatePower(id, {
      powerName,
      powerDesc,
      id_hero,
    });
  
    return power.dataValues;
  }
  
  export async function deletePower(id) {
    if (!(await getPowerById(id))) {
      throw new NotFoundError("Le pouvoir n'existe pas.");
    }
  
    return await PowerRepository.deletePower(id);
  }
  
  export async function getAllPowers() {
    const powers = await PowerRepository.getAllPowers();
  
    const formattedpowers = powers.map((power) => {
      return {
        id: power.id,
        powerName: power.powerName,
        powerDesc: power.powerDesc,
        id_hero: power.id_hero
      };
    });
  
    return formattedpowers;
  }
  
  export async function restoredPower(id) {
    const restoredpower = await PowerRepository.restoredPower(id);
  
    if (!restoredpower) {
      throw new NotFoundError(
        "Le pouvoir n'existe pas. Le pouvoir ne peut pas être restauré."
      );
    }
  
    if (await PowerRepository.powerExists(restoredpower.powerName)) {
      throw new ConflictError("Le pouvoir existe déjà. Le pouvoir ne peut pas être restauré.")
    }
  
    return restoredpower;
  }
  