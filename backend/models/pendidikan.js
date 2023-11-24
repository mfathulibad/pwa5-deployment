// models/pengajaran.js
const client = require("../connection");

const getAllPendidikan = (callback) => {
    client.query('SELECT * FROM riwayat_pendidikan', callback);
}

const getPendidikanById = (id_pendidikan, callback) => {
    const query = 'SELECT riwayat_pendidikan.id_pendidikan, riwayat_pendidikan.jenjang_pendidikan, riwayat_pendidikan.nama_institusi, riwayat_pendidikan.tahun_lulus, dosen.nama FROM riwayat_pendidikan INNER JOIN dosen ON dosen.id_dosen = riwayat_pendidikan.id_dosen WHERE riwayat_pendidikan.id_pendidikan = $1';
    const values = [id_pendidikan];
    client.query(query, values, callback);
}

const insertPendidikan = (jenjang_pendidikan, nama_institusi, tahun_lulus, id_dosen, callback) => {
    const query = 'INSERT INTO riwayat_pendidikan(jenjang_pendidikan, nama_institusi, tahun_lulus, id_dosen) VALUES($1, $2, $3, $4)';
    const values = [jenjang_pendidikan, nama_institusi, tahun_lulus, id_dosen];
    client.query(query, values, callback);
}

const updatePendidikan = (id_pendidikan, jenjang_pendidikan, nama_institusi, tahun_lulus, callback) => {
    const query = 'UPDATE riwayat_Pendidikan SET jenjang_pendidikan = $1, nama_institusi = $2, tahun_lulus = $3 WHERE id_pendidikan = $4';
    const values = [jenjang_pendidikan, nama_institusi, tahun_lulus, id_pendidikan];
    client.query(query, values, callback);
}

const deletePendidikan = (id_pendidikan, callback) => {
    const query = 'DELETE FROM riwayat_pendidikan WHERE id_pendidikan = $1';
    const values = [id_pendidikan];
    client.query(query, values, callback);
}

const getPendidikanByIdDosen = (id_dosen, callback) => {
    const query = 'SELECT riwayat_pendidikan.id_pendidikan, riwayat_pendidikan.jenjang_pendidikan, riwayat_pendidikan.nama_institusi, riwayat_pendidikan.tahun_lulus FROM riwayat_pendidikan INNER JOIN dosen ON dosen.id_dosen = riwayat_pendidikan.id_dosen WHERE dosen.id_dosen = $1';
    const values = [id_dosen];
    client.query(query, values, callback);
}

module.exports = {
    getAllPendidikan,
    getPendidikanById,
    insertPendidikan,
    updatePendidikan,
    deletePendidikan,
    getPendidikanByIdDosen
};

// const client = require('../connection')

// const getAllRiwayatPendidikan = (callback) => {
//     client.query(`SELECT * FROM riwayat_pendidikan`, callback);
// }

// const getRiwayatPendidikanById = (id_pendidikan, callback) => {
//     const query = 'SELECT * FROM riwayat_pendidikan WHERE id_pendidikan = $1';
//     const values = [id_pendidikan];
//     client.query(query, values, callback);
// }

// const getRiwayatPendidikanByIdDosen = (id_dosen, callback) => {
//     const query = 'SELECT * from riwayat_pendidikan where id_dosen = $1';
//     const values = [id_dosen];
//     client.query(query, values, callback);
// }

// // const insertRiwayatPendidikan = (jenjang_pendidikan, nama_institusi, tahun_lulus, id_dosen, callback)=>{
// //     const query= `INSERT INTO riwayat_pendidikan(jenjang_pendidikan, nama_institusi, tahun_lulus, id_dosen) VALUES ($1, $2, $3, $4)`;
// //     const values= [jenjang_pendidikan, nama_institusi, tahun_lulus, id_dosen];
// //     client.query(query, values, callback)
// // }

// const insertRiwayatPendidikan = (jenjang_pendidikan, nama_institusi, tahun_lulus, id_dosen, callback) => {
//     const query = 'INSERT INTO riwayat_pendidikan(jenjang_pendidikan, nama_institusi, tahun_lulus, id_dosen) VALUES($1, $2, $3, $4)';
//     const values = [jenjang_pendidikan, nama_institusi, tahun_lulus, id_dosen];
//     client.query(query, values, callback);
// }

// const updateRiwayatPendidikan = (id_pendidikan, jenjang_pendidikan, nama_institusi, tahun_lulus, callback) => {
//     const query = 'UPDATE riwayat_pendidikan SET jenjang_pendidikan = $1, nama_institusi = $2, tahun_lulus = $3 WHERE id_pendidikan = $4';
//     const values = [jenjang_pendidikan, nama_institusi, tahun_lulus, id_pendidikan];
//     client.query(query, values, callback);
// }

// const deleteRiwayatPendidikan = (id_pendidikan, callback) => {
//     const query = 'DELETE FROM riwayat_pendidikan WHERE id_pendidikan = $1';
//     const values = [id_pendidikan];
//     client.query(query, values, callback);
// }

// module.exports = {
//     getAllRiwayatPendidikan,
//     getRiwayatPendidikanById,
//     getRiwayatPendidikanByIdDosen,
//     insertRiwayatPendidikan,
//     updateRiwayatPendidikan,
//     deleteRiwayatPendidikan
// };