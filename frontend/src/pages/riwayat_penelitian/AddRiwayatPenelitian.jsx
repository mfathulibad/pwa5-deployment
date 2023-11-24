import AddRiwayatPenelitianComponent from "../../components/riwayat_penelitian/AddRiwayatPenelitianComponent";
import { useParams } from "react-router-dom";

function AddPenelitian(){
    const { id_penelitian } = useParams();
    return <AddRiwayatPenelitianComponent id={id_penelitian}/>

}

export default AddPenelitian;