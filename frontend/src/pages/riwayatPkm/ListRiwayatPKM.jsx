import ListRiwayatPKMComponent from "../../components/riwayatPkm/ListRiwayatPKMComponent";
import { useParams } from "react-router-dom";

function ListRiwayatPKM(){
    const { id_dosen } = useParams();
    return <ListRiwayatPKMComponent id={id_dosen}/>    
}

export default ListRiwayatPKM;