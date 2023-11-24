const express = require("express");
const router = express.Router();
const riwayatPkmController = require("../controllers/riwayatPkmController");

router.get('/riwayatpkm', riwayatPkmController.getAllRiwayatPKM);
router.get('/riwayatpkm/:id_riwayatpkm', riwayatPkmController.getRiwayatPKMById);
router.get('/profile_dosen/riwayatpkm/:id_dosen', riwayatPkmController.getPKMByIdDosen);
router.get('/profile_dosen/riwayatpkm/detail/:id_pkm', riwayatPkmController.getDosenByIdPKM);
router.post('/riwayatpkm', riwayatPkmController.insertRiwayatPKM);
router.put('/riwayatpkm/:id_riwayatpkm', riwayatPkmController.updateRiwayatPKM);
router.delete('/riwayatpkm/:id_riwayatpkm', riwayatPkmController.deleteRiwayatPKM);
router.get('/profile_dosen/riwayatpkm/addAuthor/:id_dosen', riwayatPkmController.getRiwayatPKMExceptDosen);

module.exports = router;
