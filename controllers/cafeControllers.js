const cafeModel = require('../models/cafeModel.js');

const cafes = async (req, res) => {
  try {
    const cafes = await cafeModel.getAllCafes();
    return res.status(200).json(cafes);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Error interno del servidor',
    });
  }
};

const createCafe = async (req, res) => {
  const { cafe, preparacion } = req.body;
  try {
    const newCafe = await cafeModel.createCafe({ cafe, preparacion });
    return res.status(201).json({
      message: 'Café creado correctamente',
      cafe: newCafe,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Error interno del servidor',
    });
  }
};

const deleteCafeById = async (req, res) => {
  const { id } = req.params;
  try {
    const cafe = await cafeModel.deleteCafe(id);
    if (!cafe) {
      return res.status(404).json({ message: 'Café no encontrado' });
    }
    return res.status(200).json({
      message: 'Café eliminado correctamente',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Error interno del servidor',
    });
  }
};

const updateCafeById = async (req, res) => {
  const { id } = req.params;
  const { cafe, preparacion } = req.body;
  if (id !== req.body.id) {
    return res.status(400).json({
      message: 'El ID en el payload no coincide con el ID en los parámetros',
    });
  }
  try {
    const updatedCafe = await cafeModel.updateCafe(id, { cafe, preparacion });
    if (!updatedCafe) {
      return res.status(404).json({ message: 'Café no encontrado' });
    }
    return res.status(200).json({
      message: 'Café actualizado correctamente',
      cafe: updatedCafe,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Error interno del servidor',
    });
  }
};

module.exports = {
  cafes,
  createCafe,
  deleteCafeById,
  updateCafeById,
};
