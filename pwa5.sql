--
-- PostgreSQL database dump
--

-- Dumped from database version 16.0
-- Dumped by pg_dump version 16.0

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: delete_related_dosen_data(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.delete_related_dosen_data() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    -- Delete from riwayat_penelitian
    DELETE FROM riwayat_penelitian WHERE id_dosen = OLD.id_dosen;
    
    -- Delete from penelitian
    DELETE FROM penelitian WHERE author = OLD.id_dosen;
    
    -- Delete from riwayat_pengajaran
    DELETE FROM riwayat_pengajaran WHERE id_dosen = OLD.id_dosen;
    
    -- Delete from riwayat_pkm
    DELETE FROM riwayat_pkm WHERE id_dosen = OLD.id_dosen;
    
    -- Delete from pkm
    DELETE FROM pkm WHERE kontributor = OLD.id_dosen;
    
    -- Delete from riwayat_pendidikan
    DELETE FROM riwayat_pendidikan WHERE id_dosen = OLD.id_dosen;

    RETURN OLD;
END;
$$;


ALTER FUNCTION public.delete_related_dosen_data() OWNER TO postgres;

--
-- Name: delete_user_on_dosen_delete(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.delete_user_on_dosen_delete() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  DELETE FROM "user" WHERE id_user = OLD.id_user;
  RETURN OLD;
END;
$$;


ALTER FUNCTION public.delete_user_on_dosen_delete() OWNER TO postgres;

--
-- Name: generate_dosen_id_user(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.generate_dosen_id_user() RETURNS trigger
    LANGUAGE plpgsql
    AS $$DECLARE
   new_id_dosen VARCHAR(7);
   new_id_user VARCHAR(7);
BEGIN
   -- Generate new id_dosen
   SELECT 'DSN' || LPAD(CAST((COALESCE(MAX(SUBSTRING(id_dosen FROM 4)::INT), 0) + 1) AS TEXT), 4, '0') INTO new_id_dosen FROM dosen;
   NEW.id_dosen := new_id_dosen;

   -- Generate new id_user
   SELECT 'USR' || LPAD(CAST((COALESCE(MAX(SUBSTRING(id_user FROM 4)::INT), 0) + 1) AS TEXT), 4, '0') INTO new_id_user FROM "user";
   NEW.id_user := new_id_user;

   -- Insert into "user" table
   INSERT INTO "user" (id_user, username, password, role)
   VALUES (NEW.id_user, NEW.email, LPAD(FLOOR(random()*10000)::text, 6, '0'), 'Dosen');

   RETURN NEW;
END;
$$;


ALTER FUNCTION public.generate_dosen_id_user() OWNER TO postgres;

--
-- Name: generate_mata_kuliah_id(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.generate_mata_kuliah_id() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
    new_id VARCHAR(5);
BEGIN
    SELECT 'MK' || LPAD(CAST((COALESCE(MAX(SUBSTRING(id_matkul FROM 3)::INT), 0) + 1) AS TEXT), 3, '0') INTO new_id FROM mata_kuliah;
    NEW.id_matkul := new_id;
    RETURN NEW;
END;
$$;


ALTER FUNCTION public.generate_mata_kuliah_id() OWNER TO postgres;

--
-- Name: generate_penelitian_id(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.generate_penelitian_id() RETURNS trigger
    LANGUAGE plpgsql
    AS $$DECLARE
    new_id VARCHAR(8);
BEGIN
    SELECT 'PEN' || LPAD(CAST((COALESCE(MAX(SUBSTRING(id_penelitian FROM 4)::INT), 0) + 1) AS TEXT), 4, '0') INTO new_id FROM penelitian;
    NEW.id_penelitian := new_id;
    RETURN NEW;
END;$$;


ALTER FUNCTION public.generate_penelitian_id() OWNER TO postgres;

--
-- Name: generate_pkm_id(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.generate_pkm_id() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
    new_id VARCHAR(6);
BEGIN
    SELECT 'PKM' || LPAD(CAST((COALESCE(MAX(SUBSTRING(id_pkm FROM 4)::INT), 0) + 1) AS TEXT), 3, '0') INTO new_id FROM pkm;
    NEW.id_pkm := new_id;
    RETURN NEW;
END;
$$;


ALTER FUNCTION public.generate_pkm_id() OWNER TO postgres;

--
-- Name: generate_riwayat_pendidikan_id(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.generate_riwayat_pendidikan_id() RETURNS trigger
    LANGUAGE plpgsql
    AS $$DECLARE
    new_id VARCHAR(6);
BEGIN
    SELECT 'PD' || LPAD(CAST((COALESCE(MAX(SUBSTRING(id_pendidikan FROM 3)::INT), 0) + 1) AS TEXT), 4, '0') INTO new_id FROM riwayat_pendidikan;
    NEW.id_pendidikan := new_id;
    RETURN NEW;
END;$$;


ALTER FUNCTION public.generate_riwayat_pendidikan_id() OWNER TO postgres;

--
-- Name: generate_riwayat_penelitian_id(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.generate_riwayat_penelitian_id() RETURNS trigger
    LANGUAGE plpgsql
    AS $$DECLARE
    new_id VARCHAR(12);
BEGIN
    SELECT 'RWL' || LPAD(CAST((COALESCE(MAX(SUBSTRING(id_riwayatpenelitian FROM 6)::INT), 0) + 1) AS TEXT), 6, '0') INTO new_id FROM riwayat_penelitian;
    NEW.id_riwayatpenelitian := new_id;
    RETURN NEW;
END;$$;


ALTER FUNCTION public.generate_riwayat_penelitian_id() OWNER TO postgres;

--
-- Name: generate_riwayat_pengajaran_id(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.generate_riwayat_pengajaran_id() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
    new_id VARCHAR(6);
BEGIN
    SELECT 'RPA' || LPAD(CAST((COALESCE(MAX(SUBSTRING(id_pengajaran FROM 4)::INT), 0) + 1) AS TEXT), 3, '0') INTO new_id FROM riwayat_pengajaran;
    NEW.id_pengajaran := new_id;
    RETURN NEW;
END;
$$;


ALTER FUNCTION public.generate_riwayat_pengajaran_id() OWNER TO postgres;

--
-- Name: generate_riwayat_pkm_id(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.generate_riwayat_pkm_id() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
    new_id VARCHAR(7);
BEGIN
    SELECT 'RPKM' || LPAD(CAST((COALESCE(MAX(SUBSTRING(id_riwayatpkm FROM 5)::INT), 0) + 1) AS TEXT), 3, '0') INTO new_id FROM riwayat_pkm;
    NEW.id_riwayatpkm := new_id;
    RETURN NEW;
END;
$$;


ALTER FUNCTION public.generate_riwayat_pkm_id() OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: dosen; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.dosen (
    id_dosen character varying(10) NOT NULL,
    nama character varying(100) NOT NULL,
    email character varying(100) NOT NULL,
    jabatan character varying(100) NOT NULL,
    jurusan character varying(100) NOT NULL,
    id_user character varying(10) NOT NULL
);


ALTER TABLE public.dosen OWNER TO postgres;

--
-- Name: mata_kuliah; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.mata_kuliah (
    id_matkul character varying(10) NOT NULL,
    kode_matkul character varying(20) NOT NULL,
    nama_matkul character varying(255) NOT NULL,
    kode_kelas character varying(10) NOT NULL,
    perguruan_tinggi character varying(255) NOT NULL
);


ALTER TABLE public.mata_kuliah OWNER TO postgres;

--
-- Name: penelitian; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.penelitian (
    id_penelitian character varying(10) NOT NULL,
    judul character varying(100) NOT NULL,
    tanggal_publikasi date NOT NULL,
    bidang character varying(100) NOT NULL,
    author character varying(50) NOT NULL,
    link_penelitian character varying(200)
);


ALTER TABLE public.penelitian OWNER TO postgres;

--
-- Name: pkm; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.pkm (
    id_pkm character varying(10) NOT NULL,
    judul_pkm character varying(200) NOT NULL,
    tahun_pkm integer NOT NULL,
    bidang_pkm character varying(100) NOT NULL,
    link_pkm character varying(200),
    kontributor character varying(50) NOT NULL
);


ALTER TABLE public.pkm OWNER TO postgres;

--
-- Name: riwayat_pendidikan; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.riwayat_pendidikan (
    id_pendidikan character varying(10) NOT NULL,
    jenjang_pendidikan character varying(10) NOT NULL,
    nama_institusi character varying(100) NOT NULL,
    tahun_lulus smallint NOT NULL,
    id_dosen character varying(10) NOT NULL
);


ALTER TABLE public.riwayat_pendidikan OWNER TO postgres;

--
-- Name: riwayat_penelitian; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.riwayat_penelitian (
    id_riwayatpenelitian character varying(10) NOT NULL,
    id_penelitian character varying(10) NOT NULL,
    id_dosen character varying(10) NOT NULL
);


ALTER TABLE public.riwayat_penelitian OWNER TO postgres;

--
-- Name: riwayat_pengajaran; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.riwayat_pengajaran (
    id_pengajaran character varying(10) NOT NULL,
    id_matkul character varying(10) NOT NULL,
    id_dosen character varying(10) NOT NULL,
    semester character varying(6) NOT NULL,
    tahun smallint NOT NULL
);


ALTER TABLE public.riwayat_pengajaran OWNER TO postgres;

--
-- Name: riwayat_pkm; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.riwayat_pkm (
    id_riwayatpkm character varying(10) NOT NULL,
    id_pkm character varying(10),
    id_dosen character varying(10)
);


ALTER TABLE public.riwayat_pkm OWNER TO postgres;

--
-- Name: user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."user" (
    id_user character varying(10) NOT NULL,
    username character varying(50) NOT NULL,
    password character varying(20) NOT NULL,
    role character varying(20) NOT NULL
);


ALTER TABLE public."user" OWNER TO postgres;

--
-- Data for Name: dosen; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.dosen (id_dosen, nama, email, jabatan, jurusan, id_user) FROM stdin;
DSN0003	Robert Smith	robert.smith@email.com	Lektor	Hukum	USR0003
DSN0004	Mary White	mary.white@email.com	Asisten Prof.	Kedokteran	USR0004
DSN0005	David Lee	david.lee@email.com	Profesor	Ilmu Komputer	USR0005
DSN0006	Sarah Brown	sarah.brown@email.com	Lektor	Fisika	USR0006
DSN0007	Michael Clark	michael.clark@email.com	Asisten Prof.	Kimia	USR0007
DSN0008	Jennifer Davis	jennifer.davis@email.com	Lektor	Sastra	USR0008
DSN0009	Daniel Evans	daniel.evans@email.com	Profesor	Biologi	USR0009
DSN0010	Laura Turner	laura.turner@email.com	Asisten Prof.	Matematika	USR0010
DSN0011	Evelyn Anderson	evelyn.anderson@email.com	Profesor	Kimia	USR0011
DSN0012	William Harris	william.harris@email.com	Asisten Prof.	Fisika	USR0012
DSN0013	Olivia Wilson	olivia.wilson@email.com	Profesor	Kimia	USR0013
DSN0002	Alice Johnsons	alice.johnson@email.com	Profesor	Ekonomi	USR0002
\.


--
-- Data for Name: mata_kuliah; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.mata_kuliah (id_matkul, kode_matkul, nama_matkul, kode_kelas, perguruan_tinggi) FROM stdin;
MK002	21MK002	Pemrograman Dasar	1ATI4	Politeknik Negeri Bandung
MK003	21MK003	Basis Data	1BTI3	Politeknik Negeri Bandung
MK004	21MK004	Sistem Operasi	1BTI4	Politeknik Negeri Bandung
MK005	21MK005	Pengembangan Web	2ATI3	Politeknik Negeri Bandung
MK006	21MK006	Kecerdasan Buatan	2ATI4	Politeknik Negeri Bandung
MK007	21MK007	Jaringan Komputer	2BTI3	Politeknik Negeri Bandung
MK008	21MK008	Desain Grafis	2BTI4	Politeknik Negeri Bandung
MK009	21MK009	Pengembangan Aplikasi Mobile	3ATI3	Politeknik Negeri Bandung
MK010	21MK010	Manajemen Proyek TI	3ATI4	Politeknik Negeri Bandung
MK011	21MK011	Pemrograman Lanjut	3BTI3	Politeknik Negeri Bandung
MK012	21MK012	Sistem Informasi	3BTI4	Politeknik Negeri Bandung
MK013	21MK013	Analisis dan Desain Sistem	4ATI3	Politeknik Negeri Bandung
MK014	21MK014	Pengantar Keamanan Informasi	4ATI4	Politeknik Negeri Bandung
MK015	21MK015	Manajemen Database	4BTI3	Politeknik Negeri Bandung
\.


--
-- Data for Name: penelitian; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.penelitian (id_penelitian, judul, tanggal_publikasi, bidang, author, link_penelitian) FROM stdin;
PEN001	nlp	2023-11-01	kecerdasan buatan	DSN0002	FILE-1700656191823.pdf
PEN002	NLP	2023-11-22	Kecerdasan Buatan	DSN0002	FILE-1700656220882.pdf
PEN003	nlp	2023-11-01	kecerdasan buatan	DSN0002	FILE-1700656270371.pdf
PEN004	NLP	2023-11-22	Kecerdasan Buatan	DSN0002	FILE-1700656349155.pdf
PEN005	NLP	2023-11-24	Kecerdasan Buatan	DSN0002	FILE-1700796389096.pdf
PEN006	NLP	2023-11-02	Kecerdasan Buatan	DSN0002	FILE-1700796968274.pdf
PEN0007	NLP	2023-11-02	Kecerdasan Buatan	DSN0002	FILE-1700821289339.pdf
PEN0008	NLP	2023-11-02	Kecerdasan Buatan	DSN0002	FILE-1700821335305.pdf
\.


--
-- Data for Name: pkm; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.pkm (id_pkm, judul_pkm, tahun_pkm, bidang_pkm, link_pkm, kontributor) FROM stdin;
PKM016	AB	2012	Pengabdian Kepada Masyarakat	FILE-.pdf	DSN0002
PKM018	AB	2012	Pengabdian Kepada Masyarakat	FILE-1698737115467.pdf	DSN0002
PKM019	AB	2012	Pengabdian Kepada Masyarakat	FILE-1698737115467.pdf	DSN0002
PKM020	AB	2012	Pengabdian Kepada Masyarakat	FILE-1698738403560.pdf	DSN0002
PKM021	AB	2012	Pengabdian Kepada Masyarakat	FILE-1698738403560.pdf	DSN0002
PKM022	Reka	2021	Reka	FILE-1698738542659.pdf	DSN0002
PKM023	Reka	2021	Reka	FILE-1698738542659.pdf	DSN0002
PKM024	Dyran	2021	Sains	FILE-1698738812613.pdf	DSN0002
PKM025	Dyran	2021	Sains	FILE-1698738812613.pdf	DSN0002
PKM027	NLP 	2021	Kecerdasan Buatan	FILE-1700207246316.pdf	DSN0002
PKM030	Aplikasi Kursus Online	2020	PKM-K	FILE-1700582903707.pdf	DSN0002
PKM031	Aplikasi Kursus Online	2020	PKM-K	DSN0002	FILE-1700587093236.pdf
PKM033	PKM2	2020	PKM-PM	FILE-1700588764419.pdf	DSN0002
PKM034	Aplikasi Kursus Online 3	2016	PKM-K	FILE-1700646474994.pdf	DSN0002
PKM032	Aplikasi Kursus	2018	PKM-K	FILE-1700649448254.pdf	DSN0002
PKM035	Aplikasi Kursus Online	2020	PKM-K	FILE-1700654225020.pdf	DSN0002
PKM036	PKM1	2013	PKM-K	FILE-1700654288483.pdf	DSN0002
PKM037	PKM1	2013	PKM-K	FILE-1700796498037.pdf	DSN0002
\.


--
-- Data for Name: riwayat_pendidikan; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.riwayat_pendidikan (id_pendidikan, jenjang_pendidikan, nama_institusi, tahun_lulus, id_dosen) FROM stdin;
PD0003	S1	Universitas Gadjah Mada	2012	DSN0002
PD0004	S2	Universitas Indonesia	2018	DSN0002
PD0005	S1	University of Tokyo	2003	DSN0009
PD0006	S2	University of Tokyo	2015	DSN0009
\.


--
-- Data for Name: riwayat_penelitian; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.riwayat_penelitian (id_riwayatpenelitian, id_penelitian, id_dosen) FROM stdin;
RWL005	PEN004	DSN0009
RWL000008	PEN0007	DSN0003
RWL000009	PEN0007	DSN0006
RWL000010	PEN0008	DSN0002
\.


--
-- Data for Name: riwayat_pengajaran; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.riwayat_pengajaran (id_pengajaran, id_matkul, id_dosen, semester, tahun) FROM stdin;
RPA002	MK002	DSN0002	Genap	2013
\.


--
-- Data for Name: riwayat_pkm; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.riwayat_pkm (id_riwayatpkm, id_pkm, id_dosen) FROM stdin;
RPKM005	PKM032	DSN0006
RPKM007	PKM035	DSN0005
RPKM008	PKM035	DSN0004
RPKM009	PKM035	DSN0003
RPKM010	PKM037	DSN0002
\.


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."user" (id_user, username, password, role) FROM stdin;
USR0002	alice.johnson@email.com	789012	Dosen
USR0003	robert.smith@email.com	345678	Dosen
USR0004	mary.white@email.com	901234	Dosen
USR0005	david.lee@email.com	567890	Dosen
USR0006	sarah.brown@email.com	234567	Dosen
USR0007	michael.clark@email.com	890123	Dosen
USR0008	jennifer.davis@email.com	456789	Dosen
USR0009	daniel.evans@email.com	012345	Dosen
USR0010	laura.turner@email.com	678901	Dosen
USR0011	evelyn.anderson@email.com	123456	Dosen
USR0012	william.harris@email.com	789012	Dosen
ADM0001	admin	admin	Admin
USR0013	olivia.wilson@email.com	004120	Dosen
\.


--
-- Name: dosen dosen_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dosen
    ADD CONSTRAINT dosen_pkey PRIMARY KEY (id_dosen);


--
-- Name: mata_kuliah mata_kuliah_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mata_kuliah
    ADD CONSTRAINT mata_kuliah_pkey PRIMARY KEY (id_matkul);


--
-- Name: penelitian penelitian_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.penelitian
    ADD CONSTRAINT penelitian_pkey PRIMARY KEY (id_penelitian);


--
-- Name: pkm pkm_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pkm
    ADD CONSTRAINT pkm_pkey PRIMARY KEY (id_pkm);


--
-- Name: riwayat_pendidikan riwayat_pendidikan_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.riwayat_pendidikan
    ADD CONSTRAINT riwayat_pendidikan_pkey PRIMARY KEY (id_pendidikan);


--
-- Name: riwayat_penelitian riwayat_penelitian_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.riwayat_penelitian
    ADD CONSTRAINT riwayat_penelitian_pkey PRIMARY KEY (id_riwayatpenelitian);


--
-- Name: riwayat_pengajaran riwayat_pengajaran_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.riwayat_pengajaran
    ADD CONSTRAINT riwayat_pengajaran_pkey PRIMARY KEY (id_pengajaran);


--
-- Name: riwayat_pkm riwayat_pkm_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.riwayat_pkm
    ADD CONSTRAINT riwayat_pkm_pkey PRIMARY KEY (id_riwayatpkm);


--
-- Name: user user_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id_user);


--
-- Name: dosen delete_related_dosen_data_trigger; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER delete_related_dosen_data_trigger BEFORE DELETE ON public.dosen FOR EACH ROW EXECUTE FUNCTION public.delete_related_dosen_data();


--
-- Name: mata_kuliah mata_kuliah_id_trigger; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER mata_kuliah_id_trigger BEFORE INSERT ON public.mata_kuliah FOR EACH ROW EXECUTE FUNCTION public.generate_mata_kuliah_id();


--
-- Name: penelitian penelitian_id_trigger; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER penelitian_id_trigger BEFORE INSERT ON public.penelitian FOR EACH ROW EXECUTE FUNCTION public.generate_penelitian_id();


--
-- Name: pkm pkm_id_trigger; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER pkm_id_trigger BEFORE INSERT ON public.pkm FOR EACH ROW EXECUTE FUNCTION public.generate_pkm_id();


--
-- Name: riwayat_pendidikan riwayat_pendidikan_id_trigger; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER riwayat_pendidikan_id_trigger BEFORE INSERT ON public.riwayat_pendidikan FOR EACH ROW EXECUTE FUNCTION public.generate_riwayat_pendidikan_id();


--
-- Name: riwayat_penelitian riwayat_penelitian_id_trigger; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER riwayat_penelitian_id_trigger BEFORE INSERT ON public.riwayat_penelitian FOR EACH ROW EXECUTE FUNCTION public.generate_riwayat_penelitian_id();


--
-- Name: riwayat_pengajaran riwayat_pengajaran_id_trigger; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER riwayat_pengajaran_id_trigger BEFORE INSERT ON public.riwayat_pengajaran FOR EACH ROW EXECUTE FUNCTION public.generate_riwayat_pengajaran_id();


--
-- Name: riwayat_pkm riwayat_pkm_id_trigger; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER riwayat_pkm_id_trigger BEFORE INSERT ON public.riwayat_pkm FOR EACH ROW EXECUTE FUNCTION public.generate_riwayat_pkm_id();


--
-- Name: dosen trigger_delete_user; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER trigger_delete_user AFTER DELETE ON public.dosen FOR EACH ROW EXECUTE FUNCTION public.delete_user_on_dosen_delete();


--
-- Name: dosen trigger_generate_dosen_id_user; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER trigger_generate_dosen_id_user BEFORE INSERT ON public.dosen FOR EACH ROW EXECUTE FUNCTION public.generate_dosen_id_user();


--
-- Name: dosen fk_dosen_id_user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dosen
    ADD CONSTRAINT fk_dosen_id_user FOREIGN KEY (id_user) REFERENCES public."user"(id_user);


--
-- Name: riwayat_pendidikan fk_pendidikan_id_dosen; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.riwayat_pendidikan
    ADD CONSTRAINT fk_pendidikan_id_dosen FOREIGN KEY (id_dosen) REFERENCES public.dosen(id_dosen);


--
-- Name: riwayat_penelitian fk_penelitian_id_dosen; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.riwayat_penelitian
    ADD CONSTRAINT fk_penelitian_id_dosen FOREIGN KEY (id_dosen) REFERENCES public.dosen(id_dosen);


--
-- Name: riwayat_penelitian fk_penelitian_id_penelitian; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.riwayat_penelitian
    ADD CONSTRAINT fk_penelitian_id_penelitian FOREIGN KEY (id_penelitian) REFERENCES public.penelitian(id_penelitian);


--
-- Name: riwayat_pengajaran fk_pengajaran_id_dosen; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.riwayat_pengajaran
    ADD CONSTRAINT fk_pengajaran_id_dosen FOREIGN KEY (id_dosen) REFERENCES public.dosen(id_dosen);


--
-- Name: riwayat_pengajaran fk_pengajaran_id_matkul; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.riwayat_pengajaran
    ADD CONSTRAINT fk_pengajaran_id_matkul FOREIGN KEY (id_matkul) REFERENCES public.mata_kuliah(id_matkul);


--
-- Name: riwayat_pkm fk_riwayat_pkm_id_dosen; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.riwayat_pkm
    ADD CONSTRAINT fk_riwayat_pkm_id_dosen FOREIGN KEY (id_dosen) REFERENCES public.dosen(id_dosen);


--
-- Name: riwayat_pkm fk_riwayat_pkm_id_pkm; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.riwayat_pkm
    ADD CONSTRAINT fk_riwayat_pkm_id_pkm FOREIGN KEY (id_pkm) REFERENCES public.pkm(id_pkm);


--
-- PostgreSQL database dump complete
--

