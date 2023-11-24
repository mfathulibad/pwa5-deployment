// models/pengajaran.js
const client = require('../connection');

const getAllRiwayatPKM = (callback) => {
    client.query("SELECT * FROM riwayat_pkm", callback);
}

const getRiwayatPKMById = (id_riwayatpkm, callback) => {
    const query = 'SELECT * FROM riwayat_pkm WHERE id_riwayatpkm = $1';
    const values = [id_riwayatpkm];
    client.query(query, values, callback);
}

const getPKMByIdDosen = (id_dosen, callback) => {
    const query = 'SELECT riwayat_pkm.id_riwayatpkm, pkm.judul_pkm, pkm.tahun_pkm, pkm.bidang_pkm, pkm.link_pkm, pkm.kontributor, pkm.id_pkm, dosen.nama FROM riwayat_pkm INNER JOIN pkm ON riwayat_pkm.id_pkm = pkm.id_pkm INNER JOIN dosen ON riwayat_pkm.id_dosen = dosen.id_dosen WHERE riwayat_pkm.id_dosen = $1';
    const values = [id_dosen];
    client.query(query, values, callback);
}

const getDosenByIdPKM = (id_pkm, callback) => {
    const query = 'SELECT dosen.id_dosen, dosen.nama, pkm.judul_pkm, pkm.tahun_pkm, pkm.bidang_pkm, pkm.link_pkm, pkm.kontributor FROM riwayat_pkm INNER JOIN pkm ON riwayat_pkm.id_pkm = pkm.id_pkm INNER JOIN dosen ON riwayat_pkm.id_dosen = dosen.id_dosen WHERE pkm.id_pkm = $1';
    const values = [id_pkm];
    client.query(query, values, callback);
}

const getRiwayatPKMExceptDosen = (id_dosen, callback) => {
    const query = 'SELECT pkm.id_pkm, MIN(riwayat_pkm.id_riwayatpkm) AS id_riwayatpkm, MIN(pkm.judul_pkm) AS judul_pkm, MIN(pkm.tahun_pkm) AS tahun_pkm, MIN(pkm.bidang_pkm) AS bidang_pkm, MIN(pkm.link_pkm) AS link_pkm, MIN(pkm.kontributor) AS kontributor, MIN(dosen.nama) AS nama FROM pkm LEFT JOIN riwayat_pkm ON pkm.id_pkm = riwayat_pkm.id_pkm LEFT JOIN dosen ON riwayat_pkm.id_dosen = dosen.id_dosen WHERE pkm.id_pkm NOT IN (SELECT id_pkm FROM riwayat_pkm WHERE id_dosen = $1) OR dosen.id_dosen IS NULL GROUP BY pkm.id_pkm;';
    const values = [id_dosen];
    client.query(query, values, callback);
}


const insertRiwayatPKM = (id_pkm, id_dosen, callback) => {
    const query = 'INSERT INTO riwayat_pkm (id_pkm, id_dosen) VALUES ($1, $2)';
    const values = [id_pkm, id_dosen];
    client.query(query, values, callback);
}

const updateRiwayatPKM = (id_riwayatpkm, id_pkm, id_dosen, callback) => {
    const query = 'UPDATE riwayat_pkm SET id_pkm = $1, id_dosen = $2 WHERE id_riwayatpkm = $3';
    const values = [id_pkm, id_dosen, id_riwayatpkm];
    client.query(query, values, callback);
}

const deleteRiwayatPKM = (id_riwayatpkm, callback) => {
    const query = 'DELETE FROM riwayat_pkm WHERE id_riwayatpkm = $1';
    const values = [id_riwayatpkm];
    client.query(query, values, callback);
}

module.exports = {
    getAllRiwayatPKM,
    getRiwayatPKMById,
    getPKMByIdDosen,
    getDosenByIdPKM,
    insertRiwayatPKM,
    updateRiwayatPKM,
    deleteRiwayatPKM,
    getRiwayatPKMExceptDosen,
};
