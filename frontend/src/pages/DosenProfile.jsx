import DosenProfile from "../components/DosenProfile";
import { useParams } from 'react-router-dom';
import Navbar from "../components/NavbarCom";

function Profile() {
  const { id_dosen } = useParams();

  return (
    <>
      <Navbar />
      <DosenProfile id={id_dosen} />
    </>
  );
}

export default Profile;
