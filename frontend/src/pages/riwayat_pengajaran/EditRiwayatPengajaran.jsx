import EditRiwayatPengajaranCom from '../../components/riwayat_pengajaran/EditRiwayatPengajaranComponent';
import { useParams } from 'react-router-dom';

function EditRiwayatPengajaran(){
    const { id_pengajaran } = useParams();
    return <EditRiwayatPengajaranCom id={id_pengajaran}/>
}

export default EditRiwayatPengajaran;