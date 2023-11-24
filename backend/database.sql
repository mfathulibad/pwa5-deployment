/*
    Berikut merupakan query database web Lecturer Profile
*/


-- Membuat database 
CREATE DATABASE lectureProfile;

----------------------------------------------------------------------------------------------------------------
--                                                USER & DOSEN
----------------------------------------------------------------------------------------------------------------
-- Membuat tabel user
CREATE TABLE "user" (
    id_user VARCHAR(10) PRIMARY KEY NOT NULL,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(20) NOT NULL,
    role VARCHAR(20) NOT NULL
);

-- Membuat tabel dosen
CREATE TABLE dosen (
    id_dosen VARCHAR(10) PRIMARY KEY NOT NULL,
    nama VARCHAR(100) NOT NULL NOT NULL,
    email VARCHAR(100) NOT NULL,
    jabatan VARCHAR(100) NOT NULL,
    jurusan VARCHAR(100) NOT NULL,
);

-- Menambahkan kolom id user ke tabel dosen
ALTER TABLE dosen ADD COLUMN id_user VARCHAR(10) NOT NULL; 

-- Set foreign key id_user ke tabel dosen
ALTER TABLE dosen ADD CONSTRAINT fk_dosen_id_user FOREIGN KEY (id_user) REFERENCES "user" (id_user);

-- Membuat trigger untuk id dosen dan id user
CREATE OR REPLACE FUNCTION generate_dosen_id_user() RETURNS TRIGGER AS $$
DECLARE
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

$$ LANGUAGE plpgsql;
CREATE TRIGGER trigger_generate_dosen_id_user
BEFORE INSERT ON dosen
FOR EACH ROW
EXECUTE FUNCTION generate_dosen_id_user();

-- Memasukkan data dosen ke dalam tabel "user" 
INSERT INTO "user" (id_user, username, password, role)
VALUES ('ADM0001', 'admin', 'admin', 'Admin');

INSERT INTO dosen (id_dosen, nama, email, jabatan, jurusan) VALUES
    ('DSN0001', 'John Doe', 'john.doe@email.com', 'Profesor', 'Teknik'),
    ('DSN0002', 'Alice Johnson', 'alice.johnson@email.com', 'Asisten Prof.', 'Ekonomi'),
    ('DSN0003', 'Robert Smith', 'robert.smith@email.com', 'Lektor', 'Hukum'),
    ('DSN0004', 'Mary White', 'mary.white@email.com', 'Asisten Prof.', 'Kedokteran'),
    ('DSN0005', 'David Lee', 'david.lee@email.com', 'Profesor', 'Ilmu Komputer'),
    ('DSN0006', 'Sarah Brown', 'sarah.brown@email.com', 'Lektor', 'Fisika'),
    ('DSN0007', 'Michael Clark', 'michael.clark@email.com', 'Asisten Prof.', 'Kimia'),
    ('DSN0008', 'Jennifer Davis', 'jennifer.davis@email.com', 'Lektor', 'Sastra'),
    ('DSN0009', 'Daniel Evans', 'daniel.evans@email.com', 'Profesor', 'Biologi'),
    ('DSN0010', 'Laura Turner', 'laura.turner@email.com', 'Asisten Prof.', 'Matematika'),
    ('DSN0011', 'Evelyn Anderson', 'evelyn.anderson@email.com', 'Profesor', 'Kimia'),
    ('DSN0012', 'William Harris', 'william.harris@email.com', 'Asisten Prof.', 'Fisika'),
    ('DSN0013', 'Olivia Wilson', 'olivia.wilson@email.com', 'Lektor', 'Ekonomi'),
    ('DSN0014', 'James Martin', 'james.martin@email.com', 'Profesor', 'Sastra'),
    ('DSN0015', 'Sophia Moore', 'sophia.moore@email.com', 'Lektor', 'Sosiologi');



----------------------------------------------------------------------------------------------------------------
--                                       MATA KULIAH  & RIWAYAT PENGAJARAN
----------------------------------------------------------------------------------------------------------------
-- Membuat tabel mata kuliah
CREATE TABLE mata_kuliah (
    id_matkul VARCHAR(10) PRIMARY KEY NOT NULL,
    kode_matkul VARCHAR(20) NOT NULL,
    nama_matkul VARCHAR(255) NOT NULL,
    kode_kelas VARCHAR(10) NOT NULL,
    perguruan_tinggi VARCHAR(255) NOT NULL
);

-- Membuat tabel riwayat pengajaran
CREATE TABLE riwayat_pengajaran (
    id_pengajaran VARCHAR(10) PRIMARY KEY NOT NULL,
    semester VARCHAR(15) NOT NULL,
    tahun VARCHAR(10) NOT NULL
);

-- Memasukkan data mata kuliah ke dalam tabel "mata_kuliah"  
INSERT INTO mata_kuliah (id_matkul, kode_matkul, nama_matkul, kode_kelas, perguruan_tinggi)
VALUES
    ('MK001', '21MK001', 'Statistika dan Probabilitas', '1ATI3', 'Politeknik Negeri Bandung'),
    ('MK002', '21MK002', 'Pemrograman Dasar', '1ATI4', 'Politeknik Negeri Bandung'),
    ('MK003', '21MK003', 'Basis Data', '1BTI3', 'Politeknik Negeri Bandung'),
    ('MK004', '21MK004', 'Sistem Operasi', '1BTI4', 'Politeknik Negeri Bandung'),
    ('MK005', '21MK005', 'Pengembangan Web', '2ATI3', 'Politeknik Negeri Bandung'),
    ('MK006', '21MK006', 'Kecerdasan Buatan', '2ATI4', 'Politeknik Negeri Bandung'),
    ('MK007', '21MK007', 'Jaringan Komputer', '2BTI3', 'Politeknik Negeri Bandung'),
    ('MK008', '21MK008', 'Desain Grafis', '2BTI4', 'Politeknik Negeri Bandung'),
    ('MK009', '21MK009', 'Pengembangan Aplikasi Mobile', '3ATI3', 'Politeknik Negeri Bandung'),
    ('MK010', '21MK010', 'Manajemen Proyek TI', '3ATI4', 'Politeknik Negeri Bandung'),
    ('MK011', '21MK011', 'Pemrograman Lanjut', '3BTI3', 'Politeknik Negeri Bandung'),
    ('MK012', '21MK012', 'Sistem Informasi', '3BTI4', 'Politeknik Negeri Bandung'),
    ('MK013', '21MK013', 'Analisis dan Desain Sistem', '4ATI3', 'Politeknik Negeri Bandung'),
    ('MK014', '21MK014', 'Pengantar Keamanan Informasi', '4ATI4', 'Politeknik Negeri Bandung'),
    ('MK015', '21MK015', 'Manajemen Database', '4BTI3', 'Politeknik Negeri Bandung');

-- Insert data ke dalam tabel riwayat_pengajaran
    
INSERT INTO riwayat_pengajaran (id_pengajaran, semester, tahun)
VALUES
    ('RPG001', 'Ganjil', 2021),
    ('RPG002', 'Genap', 2021),
    ('RPG003', 'Ganjil', 2018),
    ('RPG004', 'Ganjil', 2017),
    ('RPG005', 'Genap', 2018),
    ('RPG006', 'Genap', 2017),
    ('RPG007', 'Ganjil', 2015),
    ('RPG008', 'Genap', 2015),
    ('RPG009', 'Ganjil', 2012),
    ('RPG010', 'Genap', 2012),
    ('RPG011', 'Ganjil', 2011),
    ('RPG012', 'Genap', 2011),
    ('RPG013', 'Ganjil', 2016),
    ('RPG014', 'Genap', 2016),
    ('RPG015', 'Ganjil', 2014);

-- Menambahkan kolom id dosen ke tabel riwayat pengajaran
ALTER TABLE riwayat_pengajaran ADD COLUMN id_dosen VARCHAR(10) NOT NULL;

-- Set foreign key id dosen ke tabel riwayat pengajaran
ALTER TABLE riwayat_pengajaran ADD CONSTRAINT fk_pengajaran_id_dosen FOREIGN KEY (id_dosen) REFERENCES dosen (id_dosen);

-- Menambahkan kolom id matkul ke tabel riwayat pengajaran
ALTER TABLE riwayat_pengajaran ADD COLUMN id_matkul VARCHAR(10) NOT NULL;

-- Set foreign key id matkul ke tabel riwayat pengajaran
ALTER TABLE riwayat_pengajaran ADD CONSTRAINT fk_pengajaran_id_matkul FOREIGN KEY (id_matkul) REFERENCES mata_kuliah (id_matkul);

--SET ID_MATKUL SESUAI DENGAN ID_PENGAJARAN*
    
UPDATE riwayat_pengajaran
SET id_matkul = CASE
    WHEN id_pengajaran = 'RPG001' THEN 'MK001'
    WHEN id_pengajaran = 'RPG002' THEN 'MK002'
    WHEN id_pengajaran = 'RPG003' THEN 'MK003'
    WHEN id_pengajaran = 'RPG004' THEN 'MK004'
    WHEN id_pengajaran = 'RPG005' THEN 'MK005'
    WHEN id_pengajaran = 'RPG006' THEN 'MK006'
    WHEN id_pengajaran = 'RPG007' THEN 'MK007'
    WHEN id_pengajaran = 'RPG008' THEN 'MK008'
    WHEN id_pengajaran = 'RPG009' THEN 'MK009'
    WHEN id_pengajaran = 'RPG010' THEN 'MK010'
    WHEN id_pengajaran = 'RPG011' THEN 'MK011'
    WHEN id_pengajaran = 'RPG012' THEN 'MK012'
    WHEN id_pengajaran = 'RPG013' THEN 'MK013'
    WHEN id_pengajaran = 'RPG014' THEN 'MK014'
    WHEN id_pengajaran = 'RPG015' THEN 'MK015'
    ELSE NULL
END;


--SET ID_DOSEN SESUAI DENGAN ID_PENGAJARAN*

UPDATE riwayat_pengajaran
SET id_dosen = CASE
    WHEN id_pengajaran = 'RPG001' THEN 'DSN0001'
    WHEN id_pengajaran = 'RPG002' THEN 'DSN0002'
    WHEN id_pengajaran = 'RPG003' THEN 'DSN0003'
    WHEN id_pengajaran = 'RPG004' THEN 'DSN0004'
    WHEN id_pengajaran = 'RPG005' THEN 'DSN0005'
    WHEN id_pengajaran = 'RPG006' THEN 'DSN0006'
    WHEN id_pengajaran = 'RPG007' THEN 'DSN0007'
    WHEN id_pengajaran = 'RPG008' THEN 'DSN0008'
    WHEN id_pengajaran = 'RPG009' THEN 'DSN0009'
    WHEN id_pengajaran = 'RPG010' THEN 'DSN0010'
    WHEN id_pengajaran = 'RPG011' THEN 'DSN0011'
    WHEN id_pengajaran = 'RPG012' THEN 'DSN0012'
    WHEN id_pengajaran = 'RPG013' THEN 'DSN0013'
    WHEN id_pengajaran = 'RPG014' THEN 'DSN0014'
    WHEN id_pengajaran = 'RPG015' THEN 'DSN0015'
    ELSE NULL
END;

-- Membuat trigger untuk id mata kuliah
CREATE OR REPLACE FUNCTION generate_mata_kuliah_id() RETURNS TRIGGER AS $$
DECLARE
    new_id VARCHAR(5);
BEGIN
    SELECT 'MK' || LPAD(CAST((COALESCE(MAX(SUBSTRING(id_matkul FROM 3)::INT), 0) + 1) AS TEXT), 3, '0') INTO new_id FROM mata_kuliah;
    NEW.id_matkul := new_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER mata_kuliah_id_trigger
BEFORE INSERT ON mata_kuliah
FOR EACH ROW
EXECUTE FUNCTION generate_mata_kuliah_id();

-- Membuat trigger untuk id riwayat pengajaran
CREATE OR REPLACE FUNCTION generate_riwayat_pengajaran_id() RETURNS TRIGGER AS $$
DECLARE
    new_id VARCHAR(6);
BEGIN
    SELECT 'RPG' || LPAD(CAST((COALESCE(MAX(SUBSTRING(id_pengajaran FROM 4)::INT), 0) + 1) AS TEXT), 3, '0') INTO new_id FROM riwayat_pengajaran;
    NEW.id_pengajaran := new_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER riwayat_pengajaran_id_trigger
BEFORE INSERT ON riwayat_pengajaran
FOR EACH ROW
EXECUTE FUNCTION generate_riwayat_pengajaran_id();



----------------------------------------------------------------------------------------------------------------
--                                       PENELITIAN  & RIWAYAT PENELITIAN
----------------------------------------------------------------------------------------------------------------
-- Membuat tabel penelitian
CREATE TABLE penelitian (
    id_penelitian VARCHAR(10) PRIMARY KEY NOT NULL,
    judul VARCHAR(200) NOT NULL,
    tanggal_publikasi DATE NOT NULL,
    bidang VARCHAR(100) NOT NULL,
    author VARCHAR(100) NOT NULL,
    link_penelitian VARCHAR(200) NOT NULL
);

-- Membuat tabel riwayat penelitian
CREATE TABLE riwayat_penelitian (
    id_riwayatPenelitian VARCHAR(10) PRIMARY KEY NOT NULL
);

-- Menambahkan kolom id dosen ke tabel riwayat penelitian
ALTER TABLE riwayat_penelitian ADD COLUMN id_dosen VARCHAR(10) NOT NULL;

-- Set foreign key id dosen ke tabel riwayat penelitian
ALTER TABLE riwayat_penelitian ADD CONSTRAINT fk_penelitian_id_dosen FOREIGN KEY (id_dosen) REFERENCES dosen (id_dosen);

-- Menambahkan kolom id penelitian ke tabel riwayat pengajaran
ALTER TABLE riwayat_penelitian ADD COLUMN id_penelitian VARCHAR(10) NOT NULL;

-- Set foreign key id penelitian ke tabel riwayat penelitian
ALTER TABLE riwayat_penelitian ADD CONSTRAINT fk_penelitian_id_penelitian FOREIGN KEY (id_penelitian) REFERENCES penelitian (id_penelitian);

-- Memasukkan data mata kuliah ke dalam tabel "penelitian" 
INSERT INTO penelitian (id_penelitian, judul, tanggal_publikasi, bidang, author, link_penelitian)
VALUES
    ('PEN001', 'Pengaruh Perubahan Iklim Terhadap Kesehatan Masyarakat', '2023-01-15', 'Kesehatan', 'Dr. Ahmad', 'https://contohlinkpenelitian1.com'),
    ('PEN002', 'Penerapan Teknologi Blockchain dalam Keuangan', '2023-02-20', 'Teknologi', 'Prof. Budi', 'https://contohlinkpenelitian2.com'),
    ('PEN003', 'Dampak Pendidikan Online Terhadap Prestasi Belajar Siswa', '2023-03-10', 'Pendidikan', 'Dr. Citra', 'https://contohlinkpenelitian3.com'),
    ('PEN004', 'Inovasi dalam Industri Otomotif', '2023-04-05', 'Industri', 'Prof. David', 'https://contohlinkpenelitian4.com'),
    ('PEN005', 'Pengembangan Vaksin Baru untuk Penyakit Menular', '2023-05-12', 'Kesehatan', 'Dr. Eka', 'https://contohlinkpenelitian5.com'),
    ('PEN006', 'Peran Teknologi IoT dalam Pertanian Modern', '2023-06-08', 'Teknologi', 'Prof. Fajar', 'https://contohlinkpenelitian6.com'),
    ('PEN007', 'Pengaruh Musik Terhadap Konsentrasi Belajar', '2023-07-17', 'Pendidikan', 'Dr. Gita', 'https://contohlinkpenelitian7.com'),
    ('PEN008', 'Inovasi dalam Industri Energi Terbarukan', '2023-08-29', 'Industri', 'Prof. Hasan', 'https://contohlinkpenelitian8.com'),
    ('PEN009', 'Pengembangan Obat Baru untuk Kanker', '2023-09-14', 'Kesehatan', 'Dr. Indah', 'https://contohlinkpenelitian9.com'),
    ('PEN010', 'Penerapan Teknologi 5G dalam Telekomunikasi', '2023-10-01', 'Teknologi', 'Prof. Joko', 'https://contohlinkpenelitian10.com'),
    ('PEN011', 'Pengaruh Pembelajaran Online Terhadap Prestasi Akademik', '2023-11-11', 'Pendidikan', 'Dr. Kartika', 'https://contohlinkpenelitian11.com'),
    ('PEN012', 'Tantangan dan Peluang dalam Industri Teknologi', '2023-12-05', 'Industri', 'Prof. Lina', 'https://contohlinkpenelitian12.com'),
    ('PEN013', 'Pengembangan Vaksin Baru untuk Penyakit Virus', '2024-01-20', 'Kesehatan', 'Dr. Mira', 'https://contohlinkpenelitian13.com'),
    ('PEN014', 'Peran Teknologi AI dalam Bisnis Modern', '2024-02-15', 'Teknologi', 'Prof. Nanda', 'https://contohlinkpenelitian14.com'),
    ('PEN015', 'Pengaruh Kualitas Pendidikan Terhadap Perekonomian Negara', '2024-03-10', 'Pendidikan', 'Dr. Oktavia', 'https://contohlinkpenelitian15.com');

-- Memasukkan relasi antara data penelitian dan dosen
INSERT INTO riwayat_penelitian (id_riwayatpenelitian, id_penelitian, id_dosen)
VALUES
    ('RWL001', 'PEN001', 'DSN0001'),
    ('RWL002', 'PEN001', 'DSN0002'),
    ('RWL003', 'PEN001', 'DSN0003'),
    ('RWL004', 'PEN002', 'DSN0004'),
    ('RWL005', 'PEN002', 'DSN0005'),
    ('RWL006', 'PEN003', 'DSN0006'),
    ('RWL007', 'PEN003', 'DSN0007'),
    ('RWL008', 'PEN004', 'DSN0008'),
    ('RWL009', 'PEN004', 'DSN0009'),
    ('RWL010', 'PEN005', 'DSN0010'),
    ('RWL011', 'PEN005', 'DSN0011'),
    ('RWL012', 'PEN006', 'DSN0012'),
    ('RWL013', 'PEN006', 'DSN0013'),
    ('RWL014', 'PEN007', 'DSN0014'),
    ('RWL015', 'PEN007', 'DSN0015'),
	('RWL016', 'PEN008', 'DSN0009'),
    ('RWL017', 'PEN008', 'DSN0010'),
    ('RWL018', 'PEN009', 'DSN0011'),
    ('RWL019', 'PEN009', 'DSN0012'),
    ('RWL020', 'PEN010', 'DSN0013'),
    ('RWL021', 'PEN010', 'DSN0014'),
    ('RWL022', 'PEN011', 'DSN0015'),
	('RWL023', 'PEN012', 'DSN0009'),
    ('RWL024', 'PEN012', 'DSN0010'),
    ('RWL025', 'PEN013', 'DSN0011'),
    ('RWL026', 'PEN013', 'DSN0012'),
    ('RWL027', 'PEN014', 'DSN0013'),
    ('RWL028', 'PEN015', 'DSN0014'),
    ('RWL029', 'PEN015', 'DSN0015');

-- Membuat trigger untuk id penelitian
CREATE OR REPLACE FUNCTION generate_penelitian_id() RETURNS TRIGGER AS $$
DECLARE
    new_id VARCHAR(8);
BEGIN
    SELECT 'PEN' || LPAD(CAST((COALESCE(MAX(SUBSTRING(id_penelitian FROM 4)::INT), 0) + 1) AS TEXT), 4, '0') INTO new_id FROM penelitian;
    NEW.id_penelitian := new_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER penelitian_id_trigger
BEFORE INSERT ON penelitian
FOR EACH ROW
EXECUTE FUNCTION generate_penelitian_id();

-- Membuat trigger untuk id riwayat penelitian
CREATE OR REPLACE FUNCTION generate_riwayatpenelitian_id() RETURNS TRIGGER AS $$
DECLARE
    new_id VARCHAR(12);
BEGIN
    SELECT 'RWL' || LPAD(CAST((COALESCE(MAX(SUBSTRING(id_riwayatpenelitian FROM 6)::INT), 0) + 1) AS TEXT), 6, '0') INTO new_id FROM riwayat_penelitian;
    NEW.id_riwayatpenelitian := new_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER riwayatpenelitian_id_trigger
BEFORE INSERT ON riwayat_penelitian
FOR EACH ROW
EXECUTE FUNCTION generate_riwayatpenelitian_id();



----------------------------------------------------------------------------------------------------------------
--                                           RIWAYAT PENDIDIKAN
----------------------------------------------------------------------------------------------------------------
-- Membuat tabel mata kuliah
CREATE TABLE riwayat_pendidikan (
    id_pendidikan VARCHAR(10) PRIMARY KEY NOT NULL,
    jenjang_pendidikan VARCHAR(100) NOT NULL,
    nama_institusi VARCHAR(100) NOT NULL,
    tahun_lulus INT NOT NULL
);

-- Menambahkan kolom id dosen ke tabel riwayat pendidikan
ALTER TABLE riwayat_pendidikan ADD COLUMN id_dosen VARCHAR(10) NOT NULL;

-- Set foreign key id dosen ke tabel riwayat pendidikan
ALTER TABLE riwayat_pendidikan ADD CONSTRAINT fk_pendidikan_id_dosen FOREIGN KEY (id_dosen) REFERENCES dosen (id_dosen);

-- Membuat trigger untuk id riwayat pendidikan
CREATE OR REPLACE FUNCTION generate_riwayatpendidikan_id() RETURNS TRIGGER AS $$
DECLARE
    new_id VARCHAR(8);
BEGIN
    SELECT 'RWP' || LPAD(CAST((COALESCE(MAX(SUBSTRING(id_pendidikan FROM 4)::INT), 0) + 1) AS TEXT), 4, '0') INTO new_id FROM riwayat_pendidikan;
    NEW.id_pendidikan := new_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER riwayatpendidikan_id_trigger
BEFORE INSERT ON riwayat_pendidikan
FOR EACH ROW
EXECUTE FUNCTION generate_riwayatpendidikan_id();


----------------------------------------------------------------------------------------------------------------
--                                            PKM  & RIWAYAT PKM
----------------------------------------------------------------------------------------------------------------
-- Membuat tabel pkm
CREATE TABLE pkm(
    id_pkm VARCHAR(10) PRIMARY KEY NOT NULL,
    judul_pkm VARCHAR(200) NOT NULL,
    bidang_pkm VARCHAR(50) NOT NULL,
    tahun_pkm INT NOT NULL,
    link_pkm VARCHAR(100) NOT NULL,
    kontributor VARCHAR(100) NOT NULL
);

-- Membuat tabel riwayat pkm
CREATE TABLE riwayat_pkm (
    id_riwayatPkm VARCHAR(10) PRIMARY KEY NOT NULL
);

-- Menambahkan kolom id dosen ke tabel riwayat riwayat pkm
ALTER TABLE riwayat_pkm ADD COLUMN id_dosen VARCHAR(10) NOT NULL;

-- Set foreign key id dosen ke tabel riwayat pkm
ALTER TABLE riwayat_pkm ADD CONSTRAINT fk_pkm_id_dosen FOREIGN KEY (id_dosen) REFERENCES dosen (id_dosen);

-- Menambahkan kolom id pkm ke tabel riwayat pkm
ALTER TABLE riwayat_pkm ADD COLUMN id_pkm VARCHAR(10) NOT NULL;

-- Set foreign key id pkm ke tabel riwayat pkm
ALTER TABLE riwayat_pkm ADD CONSTRAINT fk_pkm_id_pkm FOREIGN KEY (id_pkm) REFERENCES pkm (id_pkm);

-- Memasukkan data pkm ke dalam tabel "pkm" 
INSERT INTO pkm (id_pkm, judul_pkm, bidang_pkm, tahun_pkm, link_pkm, kontributor)
VALUES
    ('PKM001', 'Pengembangan Aplikasi E-Learning', 'Teknologi Pendidikan', 2023, 'http://link-pkm-1.com', 'Kontributor 1'),
    ('PKM002', 'Pengelolaan Limbah Plastik', 'Lingkungan Hidup', 2023, 'http://link-pkm-2.com', 'Kontributor 2'),
    ('PKM003', 'Pengembangan Aplikasi Pencarian Lokasi', 'Teknologi Informasi', 2022, 'http://link-pkm-3.com', 'Kontributor 3'),
    ('PKM004', 'Pemberdayaan Wanita Melalui Pelatihan Kewirausahaan', 'Kewirausahaan', 2022, 'http://link-pkm-4.com', 'Kontributor 4'),
    ('PKM005', 'Pengembangan Sistem Energi Terbarukan', 'Teknologi Energi', 2022, 'http://link-pkm-5.com', 'Kontributor 5'),
    ('PKM006', 'Pengembangan Aplikasi Kesehatan Mobile', 'Kesehatan', 2023, 'http://link-pkm-6.com', 'Kontributor 6'),
    ('PKM007', 'Pengelolaan Sumber Daya Air', 'Lingkungan Hidup', 2022, 'http://link-pkm-7.com', 'Kontributor 7'),
    ('PKM008', 'Pengembangan Sistem Keamanan Komputer', 'Keamanan Informasi', 2023, 'http://link-pkm-8.com', 'Kontributor 8'),
    ('PKM009', 'Pemberdayaan Petani Melalui Agribisnis', 'Pertanian', 2022, 'http://link-pkm-9.com', 'Kontributor 9'),
    ('PKM010', 'Pengembangan Aplikasi E-commerce', 'E-commerce', 2023, 'http://link-pkm-10.com', 'Kontributor 10'),
    ('PKM011', 'Pengelolaan Limbah B3', 'Lingkungan Hidup', 2022, 'http://link-pkm-11.com', 'Kontributor 11'),
    ('PKM012', 'Pengembangan Sistem Pendidikan Online', 'Pendidikan', 2023, 'http://link-pkm-12.com', 'Kontributor 12'),
    ('PKM013', 'Pengembangan Sistem Transportasi Publik', 'Transportasi', 2022, 'http://link-pkm-13.com', 'Kontributor 13'),
    ('PKM014', 'Pengembangan Aplikasi AR/VR', 'Teknologi', 2023, 'http://link-pkm-14.com', 'Kontributor 14'),
    ('PKM015', 'Pengembangan Teknologi Pertanian', 'Pertanian', 2022, 'http://link-pkm-15.com', 'Kontributor 15');

-- Memasukkan relasi antara data pkm dan dosen
INSERT INTO riwayat_pkm (id_riwayatPKM, id_pkm, id_dosen)
VALUES
    ('RWK001', 'PKM001', 'DSN0001'),
    ('RWK002', 'PKM001', 'DSN0002'),
    ('RWK003', 'PKM001', 'DSN0003'),
    ('RWK004', 'PKM002', 'DSN0004'),
    ('RWK005', 'PKM002', 'DSN0005'),
    ('RWK006', 'PKM003', 'DSN0006'),
    ('RWK007', 'PKM003', 'DSN0007'),
    ('RWK008', 'PKM004', 'DSN0008'),
    ('RWK009', 'PKM004', 'DSN0009'),
    ('RWK010', 'PKM005', 'DSN0010'),
    ('RWK011', 'PKM005', 'DSN0011'),
    ('RWK012', 'PKM006', 'DSN0012'),
    ('RWK013', 'PKM006', 'DSN0013'),
    ('RWK014', 'PKM007', 'DSN0014'),
    ('RWK015', 'PKM007', 'DSN0015'),
    ('RWK016', 'PKM008', 'DSN0009'),
    ('RWK017', 'PKM008', 'DSN0010'),
    ('RWK018', 'PKM009', 'DSN0011'),
    ('RWK019', 'PKM009', 'DSN0012'),
    ('RWK020', 'PKM010', 'DSN0013'),
    ('RWK021', 'PKM010', 'DSN0014'),
    ('RWK022', 'PKM011', 'DSN0015'),
    ('RWK023', 'PKM012', 'DSN0009'),
    ('RWK024', 'PKM012', 'DSN0010'),
    ('RWK025', 'PKM013', 'DSN0011'),
    ('RWK026', 'PKM013', 'DSN0012'),
    ('RWK027', 'PKM014', 'DSN0013'),
    ('RWK028', 'PKM015', 'DSN0014'),
    ('RWK029', 'PKM015', 'DSN0015');


-- Fungsi untuk menghasilkan ID PKM
CREATE OR REPLACE FUNCTION generate_pkm_id() RETURNS TRIGGER AS $$
DECLARE
    new_id VARCHAR(8);
BEGIN
    SELECT 'PKM' || LPAD(CAST((COALESCE(MAX(SUBSTRING(id_pkm FROM 4)::INT), 0) + 1) AS TEXT), 4, '0') INTO new_id FROM pkm;
    NEW.id_pkm := new_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER pkm_id_trigger
BEFORE INSERT ON pkm
FOR EACH ROW
EXECUTE FUNCTION generate_pkm_id();

-- Fungsi untuk menghasilkan ID riwayat PKM
CREATE OR REPLACE FUNCTION generate_riwayatpkm_id() RETURNS TRIGGER AS $$
DECLARE
    new_id VARCHAR(12);
BEGIN
    SELECT 'RWK' || LPAD(CAST((COALESCE(MAX(SUBSTRING(id_riwayatpkm FROM 6)::INT), 0) + 1) AS TEXT), 6, '0') INTO new_id FROM riwayat_pkm;
    NEW.id_riwayatpkm := new_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER riwayatpkm_id_trigger
BEFORE INSERT ON riwayat_pkm
FOR EACH ROW
EXECUTE FUNCTION generate_riwayatpkm_id();

--------------------
-- Trigger
--------------------

-- trigger untuk menghapus data yang berhubungan dengan dosen
CREATE OR REPLACE FUNCTION delete_related_dosen_data()
RETURNS TRIGGER AS $$
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
$$ LANGUAGE plpgsql;

CREATE TRIGGER delete_related_dosen_data_trigger
BEFORE DELETE ON dosen
FOR EACH ROW
EXECUTE FUNCTION delete_related_dosen_data();