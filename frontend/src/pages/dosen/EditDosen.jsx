import EditDosenComponent from "../../components/dosen/EditDosenComponent";
import { useParams } from 'react-router-dom';

function EditDosen(){
    const { id_dosen } = useParams();
    return <EditDosenComponent id={id_dosen}/>
}

export default EditDosen;