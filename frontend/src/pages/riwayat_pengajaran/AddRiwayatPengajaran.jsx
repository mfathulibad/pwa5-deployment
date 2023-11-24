import AddRiwayatPengajaranComponent from "../../components/riwayat_pengajaran/AddRiwayatPengajaranComponent";
import { useParams } from "react-router-dom";

function AddPengajaran(){
    const { id_dosen } = useParams();
    return <AddRiwayatPengajaranComponent id={id_dosen}/>
}

export default AddPengajaran;