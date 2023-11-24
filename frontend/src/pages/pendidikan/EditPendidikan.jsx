import EditPendidikanComponent from "../../components/pendidikan/EditPendidikanComponent";
import { useParams } from 'react-router-dom';

function EditPendidikan(){
    const { id_pendidikan } = useParams();
    return <EditPendidikanComponent id={id_pendidikan}/>
}

export default EditPendidikan;