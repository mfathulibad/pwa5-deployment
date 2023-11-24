// routes/dosenRoute.js
const express = require("express");
const router = express.Router();
const riwayatPenelitianController = require("../controllers/riwayatPenelitianController");

router.get('/riwayat_penelitian', riwayatPenelitianController.getAllRiwayatPenelitian);
router.get('/riwayat_penelitian/:id_riwayatpenelitian', riwayatPenelitianController.getRiwayatPenelitianById);
router.post('/riwayat_penelitian', riwayatPenelitianController.insertRiwayatPenelitian);
router.put('/riwayat_penelitian/:id_riwayatpenelitian', riwayatPenelitianController.updateRiwayatPenelitian);
router.delete('/riwayat_penelitian/:id_riwayatpenelitian', riwayatPenelitianController.deleteRiwayatPenelitian);
router.get('/profile_dosen/riwayat_penelitian/:id_dosen', riwayatPenelitianController.getPenelitianByIdDosen);
router.get('/profile_dosen/riwayat_penelitian/detail/:id_penelitian', riwayatPenelitianController.getDosenByIdPenelitian);
router.get('/profile_dosen/riwayat_penelitian/addAuthor/:id_dosen', riwayatPenelitianController.getRiwayatPenelitianExceptDosen);


module.exports = router;
