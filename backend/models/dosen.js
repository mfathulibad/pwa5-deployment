// models/dosen.js
const client = require("../connection");

const getAllDosen = (callback) => {
  client.query(
    'SELECT d.*, u.password FROM dosen d JOIN "user" u ON d.id_user = u.id_user',
    callback
  );
};

// Mendapatkan data dosen dari database berdasarkan ID
const getDosenById = (id_dosen, callback) => {
  const query = "SELECT * FROM dosen WHERE id_dosen = $1";
  const values = [id_dosen];
  client.query(query, values, callback);
};

const insertDosen = (nama, email, jabatan, jurusan, callback) => {
  const query =
    "INSERT INTO dosen(nama, email, jabatan, jurusan) VALUES($1, $2, $3, $4)";
  const values = [nama, email, jabatan, jurusan];
  client.query(query, values, callback);
};

const updateDosen = (nama, email, jabatan, jurusan, id_dosen, callback) => {
  const query =
    "UPDATE dosen SET nama = $1, email = $2, jabatan = $3, jurusan = $4 WHERE id_dosen = $5";
  const values = [nama, email, jabatan, jurusan, id_dosen];
  client.query(query, values, callback);
};

const deleteDosen = (id_dosen, callback) => {
  const query = "DELETE FROM dosen WHERE id_dosen = $1";
  const values = [id_dosen];
  client.query(query, values, callback);
};

const getUserByUsername = (username, password, callback) => {
  const query = 'SELECT * FROM "user" WHERE username = $1 AND password = $2';
  const values = [username, password];
  client.query(query, values, callback);
};

const getDosenByIdUser = (id_user, callback) => {
  const query = "SELECT * FROM dosen WHERE id_user = $1";
  const values = [id_user];
  client.query(query, values, callback);
};

module.exports = {
  getAllDosen,
  getDosenById,
  insertDosen,
  updateDosen,
  deleteDosen,
  getUserByUsername,
  getDosenByIdUser
};
