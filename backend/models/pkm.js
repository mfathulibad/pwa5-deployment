// models/penelitian.js
const client = require('../connection');

const getAllPKM = (callback) => {
    client.query('SELECT * FROM pkm', callback);
}

const getPKMById = (id_pkm, callback) => {
    const query = 'SELECT pkm.id_pkm, pkm.judul_pkm, pkm.tahun_pkm, pkm.bidang_pkm, pkm.kontributor, dosen.nama FROM pkm INNER JOIN dosen ON pkm.kontributor = dosen.id_dosen WHERE pkm.id_pkm = $1';
    const values = [id_pkm];
    client.query(query, values, callback);
}

const insertPKM = (judul_pkm, tahun_pkm, bidang_pkm, kontributor, link_pkm, callback) => {
    const query = 'INSERT INTO pkm (judul_pkm, tahun_pkm, bidang_pkm, kontributor, link_pkm) VALUES ($1, $2, $3, $4, $5) RETURNING id_pkm';
    const values = [judul_pkm, tahun_pkm, bidang_pkm, kontributor, link_pkm];

    client.query(query, values, (err, result) => {
        if (!err) {
            const query2 = 'INSERT INTO riwayat_pkm (id_dosen, id_pkm) VALUES ($1, $2)';
            const values2 = [kontributor, result.rows[0].id_pkm];
            client.query(query2, values2, callback);
        }
    });
}

const updatePKM = (id_pkm, judul_pkm, tahun_pkm, bidang_pkm, kontributor, link_pkm, callback) => {
    const query = 'UPDATE pkm SET judul_pkm = $1, tahun_pkm = $2, bidang_pkm = $3, kontributor = $4, link_pkm = $5 WHERE id_pkm = $6';
    const values = [judul_pkm, tahun_pkm, bidang_pkm, kontributor, link_pkm, id_pkm];
    client.query(query, values, callback);
}

const deletePKM = (id_pkm, callback) => {
    const query = 'DELETE FROM riwayat_pkm WHERE id_pkm = $1';
    const values = [id_pkm];
    client.query(query, values);

    const query2 = 'DELETE FROM pkm WHERE id_pkm = $1';
    const values2 = [id_pkm];
    client.query(query2, values2, callback);
}

module.exports = {
  getAllPKM,
  getPKMById,
  insertPKM,
  updatePKM,
  deletePKM
};
