import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Image } from 'react-bootstrap';
import { Link } from "react-router-dom"; 
import { FaUsers, FaFlask, FaBook} from 'react-icons/fa';  
import "./style.css"; 
import BASE_URL from '../../config';

const ListDosenComponent = () => {
    const [dosenList, setDosenList] = useState([]);
    const [penelitianList, setPenelitianList] = useState([]);
    const [pkmList, setPKMList] = useState([]);
    // Menghitung jumlah data dalam array dosenList
    const totalDosen = dosenList.length;
    const totalPenelitian = penelitianList.length;
    const totalPKM = pkmList.length;
  
    useEffect(() => {
      // Lakukan permintaan GET ke backend endpoint untuk mendapatkan daftar dosen
      axios.get(`${BASE_URL}/dosen`)
        .then((response) => {
          const sortedDosenList = response.data.sort((a, b) =>
            a.nama.localeCompare(b.nama, undefined, { numeric: true })
          );
          setDosenList(sortedDosenList);
        })
        .catch((error) => {
          console.error(error);
          // Handle error
        });
  
      axios.get(`${BASE_URL}/penelitian`)
      .then((response) => {
        setPenelitianList(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

      axios.get(`${BASE_URL}/pkm`)
      .then((response) => {
        setPKMList(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

    return (
    <>
      {/* Background image */}
      <section id="beranda">
        <div className="my-jumbotron">
          <div className="my-content">
            <h4>Politeknik Negeri Bandung</h4>
            <h1>PROFIL DOSEN</h1>
          </div>
        </div>
      </section>
      
      {/* Counting */}
       <div className="section-counter paralax-mf">
        <div className="overlay-mf"></div>
        <Container className="position-relative">
          <Row>
            <Col sm={4} lg={4}>
              <div className="counter-box counter-box pt-4 pt-md-0">
                <div className="counter-ico">
                  <span className="ico-circle"><FaUsers size={34} color="blue" /></span>
                </div>
                <div className="counter-num">
                  <p data-purecounter-start="0" data-purecounter-end="450" data-purecounter-duration="1" className="counter purecounter"></p>
                  <span className="counter-number">{totalDosen}</span>
                  <span className="counter-text">DOSEN</span>
                </div>
              </div>
            </Col>
            <Col sm={4} lg={4}>
              <div className="counter-box pt-4 pt-md-0">
                <div className="counter-ico">
                  <span className="ico-circle"><FaFlask size={27} color="blue" /></span>
                </div>
                <div className="counter-num">
                  <p data-purecounter-start="0" data-purecounter-end="25" data-purecounter-duration="1" className="counter purecounter"></p>
                  <span className="counter-number">{totalPenelitian}</span>
                  <span className="counter-text">PENELITIAN</span>
                </div>
              </div>
            </Col>
            <Col sm={4} lg={4}>
              <div className="counter-box pt-4 pt-md-0">
                <div className="counter-ico">
                  <span className="ico-circle"><FaBook size={27} color="blue" /></span>
                </div>
                <div className="counter-num">
                  <p data-purecounter-start="0" data-purecounter-end="550" data-purecounter-duration="1" className="counter purecounter"></p>
                  <span className="counter-number">{totalPKM}</span>
                  <span className="counter-text">PKM</span>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Background image */}
      <section id="dosen" className="portfolio-mf sect-pt4 route">
        <Container>
          <Row>
            <Col xs={12}>
              <div className="title-box text-center">
                <h4 className="title-a mt-2">Dosen</h4>
                {/* <p className="subtitle-a">Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p> */}
                <div className="line-mf"></div>
              </div>
            </Col>
          </Row>
          <Row className="g-4 mt-3">
            {dosenList.map((dosen, index) => (
              <Col md={3} key={index}>
                <Link to={{ pathname: `/DosenProfile/${dosen.id_dosen}` }}>
                  <Card className="dosen-box">
                      <div className="work-img mb-4">
                        <Image
                          src="https://th.bing.com/th/id/R.4af6ce5416a72bbbc3ade4dc082b8753?rik=FL6eQf6dHNAF5g&riu=http%3a%2f%2ficons.iconarchive.com%2ficons%2fpaomedia%2fsmall-n-flat%2f1024%2fprofile-icon.png&ehk=7%2bekY9GHPFrkSaye%2f6RZA7u%2fs7gpZ9GMP5phoOj6j4U%3d&risl=&pid=ImgRaw&r=0"
                          style={{ width: "50%", height: "auto" }}
                        />
                      </div>
                    <div className="work-content">
                      <h5 className="w-title">{dosen.nama}</h5>
                      <div className="w-more">
                        <span className="w-ctegory">{dosen.jabatan}</span> / <span className="w-date">{dosen.jurusan}</span>
                      </div>
                    </div>
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </>
    );
  };
  
  export default ListDosenComponent;
  