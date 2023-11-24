// models/matkul.js
const client = require("../connection");

const getAllMatkul = (callback) => {
    client.query('SELECT * FROM mata_kuliah', callback);
}

const getMatkulById = (id_matkul, callback) => {
    const query = 'SELECT * FROM mata_kuliah WHERE id_matkul = $1';
    const values = [id_matkul];
    client.query(query, values, callback);
}

const insertMatkul = (kode_matkul, nama_matkul, kode_kelas, perguruan_tinggi, callback) => {
    const query = 'INSERT INTO mata_kuliah(kode_matkul, nama_matkul, kode_kelas, perguruan_tinggi) VALUES($1, $2, $3, $4)';
    const values = [kode_matkul, nama_matkul, kode_kelas, perguruan_tinggi];
    client.query(query, values, callback);
}

const updateMatkul = (id_matkul, kode_matkul, nama_matkul, kode_kelas, perguruan_tinggi, callback) => {
    const query = 'UPDATE mata_kuliah SET kode_matkul = $1, nama_matkul = $2, kode_kelas = $3, perguruan_tinggi = $4 WHERE id_matkul = $5';
    const values = [kode_matkul, nama_matkul, kode_kelas, perguruan_tinggi, id_matkul];
    client.query(query, values, callback);
}

const deleteMatkul = (id_matkul, callback) => {
    const query = 'DELETE FROM mata_kuliah WHERE id_matkul = $1';
    const values = [id_matkul];
    client.query(query, values, callback);
}

module.exports = {
    getAllMatkul,
    getMatkulById,
    insertMatkul,
    updateMatkul,
    deleteMatkul
};