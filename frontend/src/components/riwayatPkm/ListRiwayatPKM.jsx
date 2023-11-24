import React, { useState, useEffect } from "react";
import axios from "axios";
import { Row, Col, Card, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import BASE_URL from '../../../config';

const ListRiwayatPKMComponent = ({ id }) => {
  const [listRiwayatPKM, setlistRiwayatPKM] = useState([]);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/profile_dosen/riwayatpkm/${id}`)
      .then((response) => {
        setlistRiwayatPKM(response.data); // Mengatur data dosen ke dalam state
      })
      .catch((error) => {
        console.error(error);
        // Handle error
      });
  }, [id]);

  return (
    <Row>
      {listRiwayatPKM.map((riwayat_pkm) => (
        <Col md={3} key={riwayat_pkm.id_pkm}>
          <Link to={{ pathname: `/detail_pkm/${riwayat_pkm.id_pkm}` }}>
            <Card className="card-blog mt-2 dosen-box" style={{height:"170px"}}>
                <Card.Title>
                  <span></span> {riwayat_pkm.judul_pkm}
                </Card.Title>
              <Card.Footer>
                <div className="post-date">
                  <span className="bi bi-clock"></span> {riwayat_pkm.tahun_pkm}
                </div>
              </Card.Footer>
            </Card>
          </Link>
        </Col>
      ))}
    </Row>
  );
};

export default ListRiwayatPKMComponent;
