import AddRiwayatPKMComponent from "../../components/riwayatPkm/AddRiwayatPKMComponent";
import { useParams } from "react-router-dom";

function AddRiwayatPKM(){
    const { id_pkm } = useParams();
    return <AddRiwayatPKMComponent id={id_pkm}/>
    
}

export default AddRiwayatPKM;