import EditPKMComponent from "../../components/pkm/EditPKMComponent"
import { useParams } from 'react-router-dom';

function EditPKM(){
    const { id_pkm } = useParams();
    return <EditPKMComponent id={id_pkm}/>
}

export default EditPKM;