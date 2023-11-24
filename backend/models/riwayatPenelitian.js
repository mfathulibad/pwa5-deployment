// models/penelitian.js
const client = require("../connection");


const getAllRiwayatPenelitian = (callback) => {
    client.query('SELECT * FROM riwayat_penelitian', callback);
}

// Mendapatkan data dosen dari database berdasarkan ID
const getRiwayatPenelitianById = (id_riwayatpenelitian, callback) => {
    const query = 'SELECT * FROM riwayat_penelitian WHERE id_riwayatpenelitian = $1';
    const values = [id_riwayatpenelitian];
    client.query(query, values, callback);
}

const getRiwayatPenelitianExceptDosen = (id_dosen, callback) => {
    const query = 'SELECT penelitian.id_penelitian, MIN(penelitian.judul) AS judul, MIN(penelitian.tanggal_publikasi) AS tanggal_publikasi, MIN(penelitian.bidang) AS bidang, MIN(penelitian.author) AS author, MIN(penelitian.link_penelitian) AS link_penelitian, MIN(dosen.nama) AS nama FROM penelitian LEFT JOIN riwayat_penelitian ON penelitian.id_penelitian = riwayat_penelitian.id_penelitian LEFT JOIN dosen ON riwayat_penelitian.id_dosen = dosen.id_dosen WHERE penelitian.id_penelitian NOT IN (SELECT id_penelitian FROM riwayat_penelitian WHERE id_dosen = $1) OR dosen.id_dosen IS NULL GROUP BY penelitian.id_penelitian; ';
    const values = [id_dosen];
    client.query(query, values, callback);
}


const insertRiwayatPenelitian = (id_dosen, id_penelitian, callback) => {
    const query = 'INSERT INTO riwayat_penelitian (id_dosen, id_penelitian) VALUES ($1, $2) RETURNING id_riwayatpenelitian';
    const values = [id_dosen, id_penelitian];
    client.query(query, values, callback);
}

const updateRiwayatPenelitian = (id_penelitian, id_dosen, callback) => {
    const query = 'UPDATE riwayat_penelitian SET id_penelitian = $1, id_dosen = $2 WHERE id_riwayatpenelitian = $3';
    const values = [id_penelitian, id_dosen];
    client.query(query, values, callback);
}

const deleteRiwayatPenelitian = (id_riwayatpenelitian, callback) => {
    const query = 'DELETE FROM riwayat_penelitian WHERE id_riwayatpenelitian = $1';
    const values = [id_riwayatpenelitian];
    client.query(query, values, callback);
}

const getDosenByIdPenelitian = (id_penelitian, callback) => {
    const query = 'SELECT dosen.id_dosen, dosen.nama, penelitian.judul, penelitian.tanggal_publikasi, penelitian.bidang, penelitian.link_penelitian FROM riwayat_penelitian INNER JOIN penelitian ON riwayat_penelitian.id_penelitian = penelitian.id_penelitian INNER JOIN dosen ON riwayat_penelitian.id_dosen = dosen.id_dosen WHERE penelitian.id_penelitian = $1';
    const values = [id_penelitian];
    client.query(query, values, callback);
}

const getPenelitianByIdDosen = (id_dosen, callback) => {
    const query = 'SELECT riwayat_penelitian.id_riwayatpenelitian, penelitian.judul, penelitian.tanggal_publikasi, penelitian.bidang, penelitian.author, penelitian.link_penelitian, penelitian.id_penelitian, dosen.nama FROM riwayat_penelitian INNER JOIN penelitian ON riwayat_penelitian.id_penelitian = penelitian.id_penelitian INNER JOIN dosen ON riwayat_penelitian.id_dosen = dosen.id_dosen WHERE riwayat_penelitian.id_dosen = $1';
    const values = [id_dosen];
    client.query(query, values, callback);
}

module.exports = {
    getAllRiwayatPenelitian,
    getRiwayatPenelitianById,
    getDosenByIdPenelitian,
    insertRiwayatPenelitian,
    updateRiwayatPenelitian,
    deleteRiwayatPenelitian,
    getPenelitianByIdDosen,
    getRiwayatPenelitianExceptDosen
    
};
