import ListRiwayatPenelitianDetailComponent from "../../components/riwayat_penelitian/ListRiwayatPenelitianDetail";
import Navbar from "../../components/NavbarCom";
import { useParams } from 'react-router-dom';

function RiwayatPenelitianDetail(){
    const { id_penelitian } = useParams();
    return (
        <>
        <Navbar />
        <ListRiwayatPenelitianDetailComponent id={id_penelitian}/>
        </>
    );
}

export default RiwayatPenelitianDetail;