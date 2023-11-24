import React, { useState, useEffect } from "react";
import axios from "axios";
import { Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import BASE_URL from '../../../config';

const ListRiwayatPenelitianCom = ({ id }) => {
  const [listRiwayatPenelitian, setlistRiwayatPenelitian] = useState([]);

  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  useEffect(() => {
    axios
      .get(`${BASE_URL}/profile_dosen/riwayat_penelitian/${id}`)
      .then((response) => {
        setlistRiwayatPenelitian(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  return (
    <Row>
      {listRiwayatPenelitian.map((riwayat_penelitian) => (
        <Col md={3} key={riwayat_penelitian.id_penelitian}>
          <Link to={{ pathname: `/detail_penelitian/${riwayat_penelitian.id_penelitian}` }}>
            <Card className="card-blog mt-2 dosen-box" style={{height:"170px"}}>
                <Card.Title>
                  <span></span> {riwayat_penelitian.judul}
                </Card.Title>
              <Card.Footer>
                <div className="post-date">
                  <span className="bi bi-clock"></span> {formatDate(riwayat_penelitian.tanggal_publikasi)}
                </div>
              </Card.Footer>
            </Card>
          </Link>
        </Col>
      ))}
    </Row>
  );
};

export default ListRiwayatPenelitianCom;
