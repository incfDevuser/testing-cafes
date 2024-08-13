const pool = require("../config/db.js");

const getAllCafes = async () => {
  try {
    const query = await pool.query("SELECT * FROM cafes");
    return query.rows;
  } catch (error) {
    console.error(error);
    throw new Error("Hubo un error con la operación getAllCafes");
  }
};

const createCafe = async ({ cafe, preparacion }) => {
  try {
    const query =
      "INSERT INTO cafes (cafe, preparacion) VALUES ($1, $2) RETURNING *";
    const values = [cafe, preparacion];
    const doQuery = await pool.query(query, values);
    return doQuery.rows[0];
  } catch (error) {
    console.error(error);
    throw new Error("Hubo un error con la operación createCafe");
  }
};

const getCafeById = async (id) => {
  try {
    const query = await pool.query("SELECT * FROM cafes WHERE id = $1", [id]);
    return query.rows[0];
  } catch (error) {
    console.error(error);
    throw new Error("Hubo un error con la operación getCafeById");
  }
};

const deleteCafe = async (id) => {
  try {
    const query = await pool.query(
      "DELETE FROM cafes WHERE id = $1 RETURNING *",
      [id]
    );
    return query.rows[0];
  } catch (error) {
    console.error(error);
    throw new Error("Hubo un error con la operación deleteCafe");
  }
};

const updateCafe = async (id, { cafe, preparacion }) => {
  try {
    const query =
      "UPDATE cafes SET cafe = $1, preparacion = $2 WHERE id = $3 RETURNING *";
    const values = [cafe, preparacion, id];
    const doQuery = await pool.query(query, values);
    return doQuery.rows[0];
  } catch (error) {
    console.error(error);
    throw new Error("Hubo un error con la operación updateCafe");
  }
};

module.exports = {
  getAllCafes,
  createCafe,
  getCafeById,
  deleteCafe,
  updateCafe,
};
