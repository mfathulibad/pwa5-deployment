import ListRiwayatPenelitianComponent from "../../components/riwayat_penelitian/ListRiwayatPenelitian_Dosen";

function RiwayatPenelitian(){
    const { id_dosen } = useParams();
    return <ListRiwayatPenelitianComponent id={id_dosen}/>
}

export default RiwayatPenelitian;