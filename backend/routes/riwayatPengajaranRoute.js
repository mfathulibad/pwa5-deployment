// routes/pengajaranRoute.js
const express = require("express");
const router = express.Router();
const pengajaranController = require("../controllers/riwayatPengajaranController");

router.get('/riwayat_pengajaran', pengajaranController.getAllPengajaran);
router.get('/riwayat_pengajaran/:id_pengajaran', pengajaranController.getPengajaranById);
router.post('/riwayat_pengajaran', pengajaranController.insertPengajaran);
router.put('/riwayat_pengajaran/:id_pengajaran', pengajaranController.updatePengajaran);
router.delete('/riwayat_pengajaran/:id_pengajaran', pengajaranController.deletePengajaran);
router.get('/profile_dosen/riwayat_pengajaran/:id_dosen', pengajaranController.getPengajaranByIdDosen);

module.exports = router;
