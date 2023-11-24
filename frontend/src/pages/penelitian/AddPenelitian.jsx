import AddPenelitianComponent from "../../components/penelitian/AddPenelitianComponent";
import { useParams } from "react-router-dom";

function AddPenelitian(){
    const { id_dosen } = useParams();
    return <AddPenelitianComponent id={id_dosen}/>
    // return <AddPenelitianComponent/>
}

export default AddPenelitian;