import EditPenelitianComponent from "../../components/penelitian/EditPenelitianComponent";
import { useParams } from 'react-router-dom';

function EditPenelitian(){
    const { id_penelitian } = useParams();
    return <EditPenelitianComponent id={id_penelitian}/>
}

export default EditPenelitian;