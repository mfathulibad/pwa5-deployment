// routes/pendidikanRoute.js
const express = require("express");
const router = express.Router();
const pendidikanController = require("../controllers/pendidikanController");

router.get('/riwayat_pendidikan', pendidikanController.getAllPendidikan);
router.get('/riwayat_pendidikan/:id_pendidikan', pendidikanController.getPendidikanById);
router.post('/riwayat_pendidikan', pendidikanController.insertPendidikan);
router.put('/riwayat_pendidikan/:id_pendidikan', pendidikanController.updatePendidikan);
router.delete('/riwayat_pendidikan/:id_pendidikan', pendidikanController.deletePendidikan);
router.get('/profile_dosen/riwayat_pendidikan/:id_dosen', pendidikanController.getPendidikanByIdDosen);

module.exports = router;


// const express = require("express");
// const router = express.Router();
// const riwayatPendidikanController = require("../controllers/pendidikanController");

// router.get('/riwayat_pendidikan', riwayatPendidikanController.getAllRiwayatPendidikan);
// router.get('/riwayat_pendidikan/:id_pendidikan', riwayatPendidikanController.getRiwayatPendidikanById);
// router.get('/profile_dosen/riwayat_pendidikan/:id_dosen', riwayatPendidikanController.getRiwayatPendidikanByIdDosen);
// router.post('/riwayat_pendidikan', riwayatPendidikanController.insertRiwayatPendidikan);
// router.put('/riwayat_pendidikan/:id_pendidikan', riwayatPendidikanController.updateRiwayatPendidikan);
// router.delete('/riwayat_pendidikan/:id_pendidikan', riwayatPendidikanController.deleteRiwayatPendidikan);

// module.exports = router;