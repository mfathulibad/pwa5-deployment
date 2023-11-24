import React, { useEffect, useState, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css'
import { Link } from "react-router-dom";

// Dosen
import Dosen from './pages/dosen/Dosen';
import AddDosen from './pages/dosen/AddDosen';
import EditDosen from './pages/dosen/EditDosen';

// Riwayat Pendidikan
import Pendidikan from './pages/pendidikan/Pendidikan';
import AddPendidikan from './pages/pendidikan/AddPendidikan';
import EditPendidikan from './pages/pendidikan/EditPendidikan';

// Mata Kuliah & Riwayat Pengajaran
import AddMatkul from './pages/mata_kuliah/AddMatkul';
import Mata_Kuliah from './pages/mata_kuliah/Matkul';
import EditMatkul from './pages/mata_kuliah/EditMatkul';
import AddPengajaran from './pages/riwayat_pengajaran/AddRiwayatPengajaran';
import EditRiwayatPengajaran from './pages/riwayat_pengajaran/EditRiwayatPengajaran'

// Penelitian
import Penelitian from './pages/penelitian/Penelitian';
import AddPenelitian from './pages/penelitian/AddPenelitian';
import EditPenelitian from './pages/penelitian/EditPenelitian';
import AddRiwayatPenelitian from './pages/riwayat_penelitian/AddRiwayatPenelitian';
import DetailPenelitian from './pages/riwayat_penelitian/ListRiwayatPenelitianDetail';

// PKM
import AddPKM from './pages/pkm/AddPKM'
import EditPKM from './pages/pkm/EditPKM'
// import ListPkm from './pages/pkm/ListPKM'

// Riwayat PKM
// import EditRiwayatPkm from './pages/riwayatPkm/EditRiwayatPKM'
import AddRiwayatPKM from './pages/riwayatPkm/AddRiwayatPKM'
import DetailPKM from './pages/riwayatPkm/ListRiwayatPKMDetail'

// Web Pages Viewer
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/DosenProfile';

// Dashboard Admin
import DashboardAdmin_Dosen from './pages/DashboardAdmin_Dosen';
import DashboardAdmin_Matkul from './pages/DashboardAdmin_Matkul';

// Dashboard Dosen
import DashboardDosen_Dosen from './pages/DashboardDosen_Dosen';
// import DashboardDosen_Penelitian from './pages/DashboardDosen_Penelitian';

function App() {
  return (
      <Router>
          <Routes>
            <Route path="/" element = {<Home/>} />
            {/* Dosen */}
            <Route path="/dosen" element = {<Dosen />} />
            <Route path="/dosen/insert" element = {<AddDosen/>} />
            <Route path="/dosen/edit/:id_dosen" element = {<EditDosen/>} />

            {/* Pendidikan */}
            <Route path="/pendidikan" element = {<Pendidikan />} />
            <Route path="/pendidikan/insert" element = {<AddPendidikan/>} />
            <Route path="/pendidikan/edit/:id_pendidikan" element = {<EditPendidikan/>} />

            {/* Penelitian */}
            <Route path="/penelitian" element = {<Penelitian />} />
            <Route path="/penelitian/insert" element = {<AddPenelitian/>} />
            <Route path="/penelitian/edit/:id_penelitian" element = {<EditPenelitian/>} />
            <Route path="/riwayat_penelitian/insert" element = {<AddRiwayatPenelitian/>} />
            <Route path="/detail_penelitian/:id_penelitian" element = {<DetailPenelitian/>} />

            {/* PKM */}
            {/* <Route path="/pkm/list" element={<ListPkm />} /> */}
            <Route path="/pkm/insert" element={<AddPKM />} />
            <Route path="/pkm/edit/:id_pkm" element={<EditPKM />} />
            {/* <Route path="/riwayatpkm/list" element={<ListRiwayatPkm />} /> */}
            <Route path="/riwayatpkm/insert" element={<AddRiwayatPKM />} />
            <Route path="/detail_pkm/:id_pkm" element={<DetailPKM/>} />

            {/* Mata Kuliah & Pengajaran */}
            <Route path="/mata_kuliah/insert" element = {<AddMatkul/>} />
            <Route path="/mata_kuliah" element = {<Mata_Kuliah/>} />
            <Route path="/mata_kuliah/edit/:id_matkul" element = {<EditMatkul/>} />
            <Route path="/riwayat_pengajaran/insert" element = {<AddPengajaran/>} />
            <Route path="/riwayat_pengajaran/edit/:id_pengajaran" element={<EditRiwayatPengajaran/>} />
            
            {/* Web Pages */}
            <Route path="/home" element = {<Home/>} />
            <Route path="/login" element = {<Login/>} />
            <Route path="/dosenProfile/:id_dosen" element = {<Profile/>} />

            {/* Dashboard Admin */}
            <Route path="/dashboard_admin/dosen" element = {<DashboardAdmin_Dosen/>} />
            <Route path="/dashboard_admin/mata_kuliah" element = {<DashboardAdmin_Matkul/>} />

            {/* Dashboard Dosen */}
            <Route path="/dashboard_dosen/dosen/:id_dosen" element = {<DashboardDosen_Dosen/>} />
            {/* <Route path="/dashboard_dosen/penelitian/:id_dosen" element={<DashboardDosen_Penelitian />} /> */}

          </Routes>
      </Router>
      
  )
}


export default App;