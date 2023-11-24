// models/penelitian.js
const client = require("../connection");


const getAllPenelitian = (callback) => {
    client.query('SELECT * FROM penelitian', callback);
}

// Mendapatkan data dosen dari database berdasarkan ID
const getPenelitianById = (id_penelitian, callback) => {
    const query = 'SELECT penelitian.id_penelitian, penelitian.judul, penelitian.tanggal_publikasi, penelitian.bidang, penelitian.author, dosen.nama FROM penelitian INNER JOIN dosen ON penelitian.author = dosen.id_dosen WHERE penelitian.id_penelitian = $1';
    const values = [id_penelitian];
    client.query(query, values, callback);
}


const insertPenelitian = (judul, tanggal_publikasi, bidang, author, link_penelitian, callback) => {
    const query = 'INSERT INTO penelitian (judul, tanggal_publikasi, bidang, author, link_penelitian) VALUES ($1, $2, $3, $4, $5) RETURNING id_penelitian';
    const values = [judul, tanggal_publikasi, bidang, author, link_penelitian];

    client.query(query, values, (err, result) => {
        if (!err) {
            const query2 = 'INSERT INTO riwayat_penelitian (id_dosen, id_penelitian) VALUES ($1, $2)';
            const values2 = [author, result.rows[0].id_penelitian];
            client.query(query2, values2, callback);
        }
    });
}

const updatePenelitian = (id_penelitian, judul, tanggal_publikasi, bidang, author, link_penelitian, callback) => {
    const query = 'UPDATE penelitian SET judul = $1, tanggal_publikasi = $2, bidang = $3, author = $4, link_penelitian = $5 WHERE id_penelitian = $6';
    const values = [judul, tanggal_publikasi, bidang, author, link_penelitian, id_penelitian];
    client.query(query, values, callback);
}

const deletePenelitian = (id_penelitian, callback) => {
    const query = 'DELETE FROM riwayat_penelitian WHERE id_penelitian = $1';
    const values = [id_penelitian];
    client.query(query, values);

    const query2 = 'DELETE FROM penelitian WHERE id_penelitian = $1';
    const values2 = [id_penelitian];
    client.query(query2, values2, callback);
}

module.exports = {
    getAllPenelitian,
    getPenelitianById,
    insertPenelitian,
    updatePenelitian,
    deletePenelitian
};
