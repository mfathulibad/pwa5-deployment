import AddPendidikanComponent from "../../components/pendidikan/AddPendidikanComponent"
import { useParams } from 'react-router-dom';

function AddRiwayat(){
    const { id_dosen } = useParams();
    return <AddPendidikanComponent id={id_dosen}/>
    // return <AddPendidikanComponent/>
}

export default AddRiwayat;