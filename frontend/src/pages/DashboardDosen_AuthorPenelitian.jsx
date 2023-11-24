import AddAuthorPenelitian from "../components/riwayat_penelitian/AddRiwayatPenelitianComponent";
import NavbarDosen from "../components/NavbarDosenCom";
// import { useParams } from 'react-router-dom';

function DashboardDosen_Penelitian(){
  return (
      <>
      <NavbarDosen/>
      <AddAuthorPenelitian/>     
      </>
  )
  
}

export default DashboardDosen_Penelitian;
