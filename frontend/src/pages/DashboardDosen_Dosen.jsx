import EditDosen from "../components/dosen/EditDosenComponent";
import NavbarDosen from "../components/NavbarDosenCom";
import DashboardDosenDetailComponent from "../components/DashboardDosen";
import { useParams } from 'react-router-dom';

function DashboardDosen_Dosen(){
  const { id_dosen } = useParams();
  return (
      <>
      <NavbarDosen/>
      <DashboardDosenDetailComponent id={id_dosen}/>
      </>
  )
  
}

export default DashboardDosen_Dosen;
