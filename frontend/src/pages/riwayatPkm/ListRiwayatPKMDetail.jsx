import ListRiwayatPKMComponentDetail from "../../components/riwayatPkm/ListRiwayatPKM_Detail";
import Navbar from "../../components/NavbarCom";
import { useParams } from 'react-router-dom';

function ListRiwayatPKMDetail(){
    const { id_pkm } = useParams();

    return (
        <>
        <Navbar />
        <ListRiwayatPKMComponentDetail id={id_pkm} />
        </>
    );
}

export default ListRiwayatPKMDetail;