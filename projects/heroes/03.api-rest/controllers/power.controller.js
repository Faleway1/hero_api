import { PowerService } from "../services/power.service.js";

export async function getAllPowers(req, res, next) {
  try {
    const powers = await PowerService.getAllPowers();
    res.json(powers);
  } catch (error) {
    next(error)
  }
}

export async function getPowerById(req, res, next) {
  try {
    const id = req.params.id;
    const hero = await PowerService.getPowerById(id);
    res.json(hero);
  } catch (error) {
    next(error)
  }
}

export async function createPower(req, res, error) {
  try {
    const { powerName, powerDesc, id_hero } = req.body;
    const newPower = await PowerService.createPower({
      powerName,
      powerDesc,
      id_hero,
    });
    res.json(newPower);
  } catch (error) {
    next(error)
  }
}

export async function updatePower(req, res, next) {
  try {
    const id = req.params.id;
    const { powerName, powerDesc, id_hero } = req.body;
    const updatedPower = await PowerService.updatePower(id, {
      powerName,
      powerDesc,
      id_hero,
    });
    res.json(updatedPower);
  } catch (error) {
    next(error)
  }
}

export async function deletePower(req, res, next) {
  try {
    const id = req.params.id;
    const deletedPower = await PowerService.deletePower(id);
    res.json(deletedPower);
  } catch (error) {
    next(error)
  }
}

export async function restorePower(req, res, next) {
  try {
    const id = req.params.id;
    const restoredPower = await PowerService.restorePower(id);
    res.json(restoredPower);
  } catch (error) {
    next(error)
  }
}