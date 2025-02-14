import Power from "../models/power.model.js";

export async function createPower({powerName, powerDesc, id_hero}) {
    const power = await Power.create({powerName, powerDesc, id_hero});
    return power;
}

export async function getPowerById(id) {
    const power = await Power.findByPk(id);
    if (!power) {
      return null;
    }
  
    return power;
  }
  
  export async function getDeletedPowerById(id) {
    const power = await Power.scope("deleted").findByPk(id);
    if (!power) {
      return null;
    }
  
    return power;
  }
  
  export async function updatePower(id, values) {
    const power = await getPowerById(id);
    if (!power) {
      return null;
    }
  
    return await power.update(values);
  }
  
  export async function deletePower(id) {
    const power = await getPowerById(id);
    if (!power) {
      return null;
    }
  
    return await updatePower(power.id, { isDeleted: true });
  }
  
  export async function getAllPowers() {
    return await Power.findAll();
  }
  
  export async function powerExists(alias) {
    const power = await Power.findOne({ where: { alias } });
    return Boolean(power);
  }
  
  export async function powerDeletedExists(alias) {
    const power = await Power.scope("deleted").findOne({ where: { alias } });
    return Boolean(power);
  }
  
  export async function getAllPowersWithDeleted() {
    await Power.scope("withDeleted").findAll();
  }
  
  export async function getAllPowersDeleted() {
    await Power.scope("deleted").findAll();
  }