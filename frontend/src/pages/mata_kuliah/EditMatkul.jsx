import EditMatkulComponent from '../../components/mata_kuliah/EditMatkulComponent';
import { useParams } from 'react-router-dom';

function EditMatkul(){
    const { id_matkul } = useParams();
    return <EditMatkulComponent id={id_matkul}/>
}

export default EditMatkul;