import React, { useState, useEffect } from "react";
import axios from "axios";
import { Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import BASE_URL from '../../../config';

const ListRiwayatPKMComponent = ({ id }) => {
  // State untuk menyimpan data riwayat PKM
  const [riwayatPKM, setRiwayatPKM] = useState([]);

  // State untuk menyimpan data PKM
  const [pkm, setPKM] = useState([]);

  // State untuk menangani loading
  const [loading, setLoading] = useState(true);

  // State untuk menangani error
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Mendapatkan data riwayat PKM dan PKM berdasarkan ID dosen
        const [riwayatResponse, pkmResponse] = await Promise.all([
          axios.get(`${BASE_URL}/profile_dosen/riwayatpkm/detail/${id}`),
          axios.get(`${BASE_URL}/pkm/dosen/${id}`)
        ]);

        setRiwayatPKM(riwayatResponse.data);
        setPKM(pkmResponse.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="container margin-class">
      <Row>
        <Col md={12}>
          <Card className="card-blog mt-2">
          <h5>{pkm[0]?.judul_pkm}</h5>
          <div className="post-date">
              <span className="bi bi-clock"></span>{" "}
              {riwayatPKM[0]?.tahun_pkm}
          </div>
          <div>
            <h6 style={{ marginBottom: '0px', marginTop: '15px' }}>Ditulis oleh :</h6>
            {riwayatPKM.map((kontributor, index) => (
              <React.Fragment key={kontributor.id_riwayatpkm}>
                <Link to={`/DosenProfile/${kontributor.id_dosen}`}>
                  <span>{kontributor.nama}</span>
                </Link>
                {index < riwayatPKM.length - 1 && <span>, </span>}
              </React.Fragment>
            ))}
          </div>

              <Card.Body>
                  <Card.Text>
                      <iframe 
                          src={`${BASE_URL}/static/uploads/pkm/${riwayatPKM[0]?.link_pkm}`} 
                          width="100%" 
                          height="500px" 
                          title="PDF Viewer"
                      />
                  </Card.Text>
              </Card.Body>

            <Card.Footer>
              
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

//   return (
//     <div className="container margin-class">
//       <Row>
//         <Col md={12}>
//           <Card.Title>{pkm[0]?.judul_pkm}</Card.Title>
//           <div className="post-date">
//                 <span className="bi bi-clock"></span>{" "}
//                 {riwayatPKM[0]?.tahun_pkm}
//           </div>
//           <Card className="card-blog mt-2">
          // <div>
          //   <h6 style={{ marginBottom: '0px', marginTop: '15px' }}>Ditulis oleh :</h6>
          //   {riwayatPKM.map((kontributor, index) => (
          //     <React.Fragment key={kontributor.id_riwayatpkm}>
          //       <Link to={`/DosenProfile/${kontributor.id_dosen}`}>
          //         <span>{kontributor.nama}</span>
          //       </Link>
          //       {index < riwayatPKM.length - 1 && <span>, </span>}
          //     </React.Fragment>
          //   ))}
          // </div>
//             <Card.Body>
//                   <Card.Text>
//                       <iframe 
//                           src={`${BASE_URL}/static/uploads/pkm/${riwayatPKM[0]?.link_pkm}`} 
//                           width="100%" 
//                           height="500px" 
//                           title="PDF Viewer"
//                       />
//                   </Card.Text>
//               </Card.Body>
//             <Card.Footer>
              
//             </Card.Footer>
//           </Card>
//         </Col>
//       </Row>
//     </div>
//   );
// };

export default ListRiwayatPKMComponent;