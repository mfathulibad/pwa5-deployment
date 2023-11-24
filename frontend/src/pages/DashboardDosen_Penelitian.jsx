import ListRiwayatPenelitian from "../components/riwayat_penelitian/ListRiwayatPenelitian_Dosen";
import NavbarDosen from "../components/NavbarDosenCom"
import { useParams } from 'react-router-dom';

function DashboardDosen_Penelitian(){
  const { id_dosen } = useParams();
  return (
      <>
      <NavbarDosen/>
      <ListRiwayatPenelitian id={id_dosen}/>     
      </>
  )
  
}

export default DashboardDosen_Penelitian;
