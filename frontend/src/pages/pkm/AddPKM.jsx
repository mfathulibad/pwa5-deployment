import AddPKMComponent from "../../components/pkm/AddPKMComponent";
import { useParams } from "react-router-dom";

function AddPKM(){
    const { id_dosen } = useParams();
    return <AddPKMComponent id={id_dosen}/>
    // return <AddPKMComponent/>
}

export default AddPKM;