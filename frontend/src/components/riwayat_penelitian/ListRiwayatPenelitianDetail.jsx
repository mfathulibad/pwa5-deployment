import React, { useState, useEffect } from "react";
import axios from "axios";
import { Row, Col, Card } from "react-bootstrap";
import { FaFile } from 'react-icons/fa';
import { Link } from "react-router-dom";
import "../style.css";
import BASE_URL from '../../../config';

const ListRiwayatPenelitianDetailCom = ({ id }) => {
  const [riwayatPenelitian, setRiwayatPenelitian] = useState([]);
  const [penelitian, setPenelitian] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [riwayatResponse, penelitianResponse] = await Promise.all([
          axios.get(`${BASE_URL}/profile_dosen/riwayat_penelitian/detail/${id}`),
          axios.get(`${BASE_URL}/penelitian/dosen/${id}`)
        ]);

        setRiwayatPenelitian(riwayatResponse.data);
        setPenelitian(penelitianResponse.data);
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
          <h5>{penelitian[0]?.judul}</h5>
          <div className="post-date">
              <span className="bi bi-clock"></span>{" "}
              {formatDate(riwayatPenelitian[0]?.tanggal_publikasi)}
          </div>
          <div>   
            <h6 style={{ marginBottom: '0px', marginTop: '15px' }}>Ditulis oleh :</h6>
            {riwayatPenelitian.map((author, index) => (
              <React.Fragment key={author.id_riwayatpenelitian}>
                <Link to={`/DosenProfile/${author.id_dosen}`}>
                  <span>{author.nama}</span>
                </Link>
                {index < riwayatPenelitian.length - 1 && <span>, </span>}
              </React.Fragment>
            ))}
          </div>

              <Card.Body>
                  <Card.Text>
                      <iframe 
                          src={`${BASE_URL}/static/uploads/penelitian/${riwayatPenelitian[0]?.link_penelitian}`} 
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

export default ListRiwayatPenelitianDetailCom;