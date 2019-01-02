CREATE DATABASE  IF NOT EXISTS `camera_shop` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `camera_shop`;
-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: localhost    Database: camera_shop
-- ------------------------------------------------------
-- Server version	5.7.21-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `donhang`
--

DROP TABLE IF EXISTS `donhang`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `donhang` (
  `madonhang` varchar(10) NOT NULL,
  `email` varchar(50) DEFAULT NULL,
  `ngay` datetime DEFAULT NULL,
  `thanhtien` int(11) DEFAULT NULL,
  `trangthai` tinyint(4) DEFAULT '0' COMMENT '0 (chua giao), 1 (dang giao), 2 (da giao)',
  `diachi` varchar(200) DEFAULT NULL,
  `hoten` varchar(30) DEFAULT NULL,
  `sdt` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`madonhang`),
  KEY `FK_donhang_taikhoan_idx` (`email`),
  CONSTRAINT `FK_donhang_taikhoan` FOREIGN KEY (`email`) REFERENCES `taikhoan` (`email`) ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `donhang`
--

LOCK TABLES `donhang` WRITE;
/*!40000 ALTER TABLE `donhang` DISABLE KEYS */;
/*!40000 ALTER TABLE `donhang` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `donhang_sub`
--

DROP TABLE IF EXISTS `donhang_sub`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `donhang_sub` (
  `madonhang` varchar(10) NOT NULL,
  `idsanpham` char(5) NOT NULL,
  `soluong` int(11) DEFAULT NULL,
  PRIMARY KEY (`madonhang`,`idsanpham`),
  KEY `FK_sub_sanpham_idx` (`idsanpham`),
  CONSTRAINT `FK_sub_donhang` FOREIGN KEY (`madonhang`) REFERENCES `donhang` (`madonhang`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_sub_sanpham` FOREIGN KEY (`idsanpham`) REFERENCES `sanpham` (`idsanpham`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `donhang_sub`
--

LOCK TABLES `donhang_sub` WRITE;
/*!40000 ALTER TABLE `donhang_sub` DISABLE KEYS */;
/*!40000 ALTER TABLE `donhang_sub` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `loaisanpham`
--

DROP TABLE IF EXISTS `loaisanpham`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `loaisanpham` (
  `loai` varchar(20) NOT NULL,
  `tenloai` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`loai`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `loaisanpham`
--

LOCK TABLES `loaisanpham` WRITE;
/*!40000 ALTER TABLE `loaisanpham` DISABLE KEYS */;
INSERT INTO `loaisanpham` VALUES ('360degree','360 độ'),('compact','Compact'),('dslr','DSLR'),('mirrorless','Không gương lật');
/*!40000 ALTER TABLE `loaisanpham` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sanpham`
--

DROP TABLE IF EXISTS `sanpham`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sanpham` (
  `idsanpham` char(5) NOT NULL,
  `gia` int(11) DEFAULT NULL,
  `luotxem` int(11) DEFAULT '0',
  `luotban` int(11) DEFAULT '0',
  `mota` varchar(3000) DEFAULT '<p>Không có mô tả<p>',
  `xuatxu` varchar(20) DEFAULT NULL,
  `loai` varchar(20) DEFAULT NULL,
  `nhasanxuat` varchar(20) DEFAULT NULL,
  `img` varchar(200) DEFAULT NULL,
  `tensanpham` varchar(100) DEFAULT NULL,
  `ngaytiepnhan` datetime DEFAULT NULL,
  `soluong` int(11) DEFAULT '30',
  PRIMARY KEY (`idsanpham`),
  KEY `FK_sanpham_loaisanpham_idx` (`loai`),
  KEY `FK_sanpham_thuonghieu_idx` (`nhasanxuat`),
  CONSTRAINT `FK_sanpham_loaisanpham` FOREIGN KEY (`loai`) REFERENCES `loaisanpham` (`loai`) ON UPDATE NO ACTION,
  CONSTRAINT `FK_sanpham_thuonghieu` FOREIGN KEY (`nhasanxuat`) REFERENCES `thuonghieu` (`nhasanxuat`) ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sanpham`
--

LOCK TABLES `sanpham` WRITE;
/*!40000 ALTER TABLE `sanpham` DISABLE KEYS */;
INSERT INTO `sanpham` VALUES ('c0001',13625000,36,0,'<p>Không có mô tả<p>','china','360degree','GoPro','360-GOPRO-gopro fusion.jpg','GoPro Fusion','2018-06-22 00:00:00',30),('c0002',8620000,33,2,'<p>Không có mô tả<p>','america','360degree','Kodak','360-KODAK-kodak pixpro orbit360 4k.jpg','Kodak Pixpro Orbit 360 4K','2018-06-18 00:00:00',28),('c0003',7620000,4,0,'<p>Đây là camera 360 độ<p>','america','360degree','Kodak','360-KODAK-kodak pixpro sp360 4k.jpg','Kodak Pixpro SP360 4K','2018-06-18 00:00:00',30),('c0004',2025000,1,1,'<p>Không có mô tả<p>','south-korea','360degree','LG','360-LG-lg 360 cam.jpg','LG G5 Friend 360','2018-06-12 00:00:00',30),('c0005',11280000,2,5,'<p>Không có mô tả<p>','japan','360degree','Nikon','360-NIKON-nikon keymission 360 4k.jpg','Nikon KeyMission 360','2018-06-13 00:00:00',25),('c0006',7710000,4,0,'<p>Không có mô tả<p>','japan','360degree','Ricoh','360-RICOH-ricoh theta v.jpg','Ricoh Theta V 4K','2018-06-17 00:00:00',30),('c0007',1135000,3,0,'<p>Không có mô tả<p>','south-korea','360degree','Samsung','360-SAMSUNG-samsung gear 360.jpg','Samsung Gear 360','2018-06-15 00:00:00',30),('c0008',11350000,17,0,'<p>Không có mô tả<p>','china','compact','Canon','compact-CANON-canon powershot d30.jpg','Canon PowerShot D30','2018-06-11 00:00:00',30),('c0009',7230000,1,0,'<p>Không có mô tả<p>','japan','compact','Canon','compact-CANON-canon powershot n2.jpg','Canon PowerShot N2','2018-06-11 00:00:00',30),('c0010',5890000,2,2,'<p>Không có mô tả<p>','japan','compact','Canon','compact-CANON-canon powershot sx420.jpg','Canon PowerShot SX420','2018-06-06 00:00:00',30),('c0011',6800000,1,0,'<p>Không có mô tả<p>','china','compact','Canon','compact-CANON-canon powershot sx530.jpg','Canon PowerShot SX530','2018-06-08 00:00:00',30),('c0012',5890000,16,0,'<p>Không có mô tả<p>','japan','compact','Canon','compact-CANON-canon powershot sx620.jpg','Canon PowerShot SX620','2018-06-02 00:00:00',30),('c0013',28180000,1,8,'<p>Không có mô tả<p>','america','compact','Fujifilm','compact-FUJIFILM-fujifilm x100f.jpg','Fujifilm X100F','2018-05-30 00:00:00',27),('c0014',20490000,0,0,'<p>Không có mô tả<p>','japan','compact','Fujifilm','compact-FUJIFILM-fujifilm x70.jpg','Fujifilm X70','2018-05-29 00:00:00',30),('c0015',2250000,0,0,'<p>Không có mô tả<p>','america','compact','Kodak','compact-KODAK-kodak pixpro fz151.jpg','Kodak Pixpro FZ151','2018-05-24 00:00:00',30),('c0016',2050000,0,0,'<p>Không có mô tả<p>','america','compact','Kodak','compact-KODAK-kodak pixpro fz51.jpg','Kodak Pixpro FZ51','2018-05-27 00:00:00',30),('c0017',2150000,1,0,'<p>Không có mô tả<p>','america','compact','Kodak','compact-KODAK-kodak pixpro wp1 sport.jpg','Kodak pixpro WP1 Sport','2018-05-27 00:00:00',30),('c0018',4030000,0,10,'<p>Không có mô tả<p>','south-korea','compact','Nikon','compact-NIKON-nikon coolpix a300.jpg','Nikon Coolpix A300','2018-05-22 00:00:00',30),('c0019',1910000,12,2,'<p>Không có mô tả<p>','japan','compact','Nikon','compact-NIKON-nikon coolpix l32.jpg','Nikon Coolpix L32','2018-05-23 00:00:00',28),('c0020',4420000,0,0,'<p>Không có mô tả<p>','japan','compact','Nikon','compact-NIKON-nikon coolpix w100.jpg','Nikon Coolpix W100','2018-05-18 00:00:00',30),('c0021',31790000,2,5,'<p>Không có mô tả<p>','japan','compact','Sony','compact-SONY-sony cybershot rx10 iii.jpg','Sony Cybershot RX10 III','2018-05-19 00:00:00',30),('c0022',38620000,0,0,'<p>Không có mô tả<p>','japan','compact','Sony','compact-SONY-sony cybershot rx10 iv.jpg','Sony Cybershot RX10 IV','2018-05-20 00:00:00',30),('c0023',2290000,0,0,'<p>Không có mô tả<p>','japan','compact','Sony','compact-SONY-sony cybershot wx220.jpg','Sony Cubershot WX220','2018-05-20 00:00:00',30),('c0024',8390000,59,3,'<p>Không có mô tả<p>','japan','dslr','Canon','dslr-CANON-canon eos 1300d Kit.jpg','Canon EOS 1300D','2018-06-21 00:00:00',27),('c0025',13190000,1,0,'<p>Không có mô tả<p>','china','dslr','Canon','dslr-CANON-canon eos 1500d.jpg','Canon EOS 1500D','2018-05-13 00:00:00',30),('c0026',36190000,0,0,'<p>Không có mô tả<p>','japan','dslr','Canon','dslr-CANON-canon eos 3000d.jpg','Canon EOS 3000D','2018-05-15 00:00:00',30),('c0027',65990000,1,0,'<p>Không có mô tả<p>','america','dslr','Canon','dslr-CANON-canon eos 5d mark iii.jpg','Canon EOS 5D Mark III','2018-05-16 00:00:00',30),('c0028',67990000,1,0,'<p>Không có mô tả<p>','america','dslr','Canon','dslr-CANON-canon eos 5d mark-iii-1.jpg','Canon EOS 5D Mark III-1','2018-05-24 00:00:00',30),('c0029',64990000,15,0,'<p>Không có mô tả<p>','china','dslr','Canon','dslr-CANON-canon eos 5d mark-iii-2.jpg','Canon EOS 5D Mark III-2','2018-06-03 00:00:00',30),('c0030',62990000,0,0,'<p>Không có mô tả<p>','china','dslr','Canon','dslr-CANON-canon eos 5d mark-iii-3.jpg','Canon EOS 5D Mark III-3','2018-06-02 00:00:00',30),('c0031',49950000,5,0,'<p>Không có mô tả<p>','japan','dslr','Canon','dslr-CANON-canon eos 6d.jpg','Canon EOS 6D','2018-05-03 00:00:00',30),('c0032',25750000,1,0,'<p>Không có mô tả<p>','japan','dslr','Canon','dslr-CANON-canon eos 70d.jpg','Canon EOS 70D','2018-05-02 00:00:00',30),('c0033',18500000,0,0,'<p>Không có mô tả<p>','america','dslr','Kodak','dslr-KODAK-kodak pixpro az365.jpg','Kodak Pixpro AZ365','2018-05-01 00:00:00',30),('c0034',16450000,0,0,'<p>Không có mô tả<p>','america','dslr','Kodak','dslr-KODAK-kodak pixpro az421.jpg','Kodak Pixpro AZ421','2018-05-08 00:00:00',30),('c0035',19500000,0,0,'<p>Không có mô tả<p>','america','dslr','Kodak','dslr-KODAK-kodak pixpro az525.jpg','Kodak Pixpro AZ525','2018-05-08 00:00:00',30),('c0036',23500000,0,0,'<p>Không có mô tả<p>','america','dslr','Kodak','dslr-KODAK-kodak pixpro az651.jpg','Kodak Pixpro AZ651','2018-06-13 00:00:00',30),('c0037',14490000,1,0,'<p>Không có mô tả<p>','south-korea','dslr','Nikon','dslr-NIKON-nikon d3400.jpg','Nikon D3400','2018-06-07 00:00:00',30),('c0038',17490000,0,0,'<p>Không có mô tả<p>','america','dslr','Nikon','dslr-NIKON-nikon d5500.jpg','Nikon D5500','2018-05-14 00:00:00',30),('c0039',19490000,0,0,'<p>Không có mô tả<p>','japan','dslr','Nikon','dslr-NIKON-nikon d7100.jpg','Nikon D7100','2018-05-27 00:00:00',30),('c0040',20490000,0,0,'<p>Không có mô tả<p>','japan','dslr','Nikon','dslr-NIKON-nikon d7500.jpg','Nikon D7500','2018-05-29 00:00:00',30),('c0041',24490000,0,0,'<p>Không có mô tả<p>','japan','dslr','Nikon','dslr-NIKON-nikon d850.jpg','Nikon D850','2018-05-25 00:00:00',30),('c0042',14390000,0,0,'<p>Không có mô tả<p>','japan','dslr','Sony','dslr-SONY-sony a58.jpg','Sony A58','2018-05-24 00:00:00',30),('c0043',16390000,0,0,'<p>Không có mô tả<p>','china','dslr','Sony','dslr-SONY-sony a68.jpg','Sony A68','2018-05-19 00:00:00',30),('c0044',16990000,1,0,'<p>Không có mô tả<p>','japan','dslr','Sony','dslr-SONY-sony a7s.JPG','Sony A7S','2018-05-22 00:00:00',30),('c0045',11990000,2,0,'<p>Không có mô tả<p>','japan','mirrorless','Canon','mirrorless-CANON-canon eos m100.jpg','Canon EOS M100','2018-05-28 00:00:00',30),('c0046',14990000,4,2,'<p>Không có mô tả<p>','japan','mirrorless','Canon','mirrorless-CANON-canon eos m6.jpg','Canon EOS M6','2018-06-17 00:00:00',28),('c0047',24990000,0,0,'<p>Không có mô tả<p>','japan','mirrorless','Fujifilm','mirrorless-FUJIFILM-fujifilm x-e3.jpg','Fujifilm X-E3','2018-06-08 00:00:00',30),('c0048',27990000,0,0,'<p>Không có mô tả<p>','japan','mirrorless','Fujifilm','mirrorless-FUJIFILM-fujifilm x-h1.jpg','Fujifilm X-H1','2018-06-14 00:00:00',30),('c0049',42990000,15,12,'<p>Không có mô tả<p>','japan','mirrorless','Fujifilm','mirrorless-FUJIFILM-fujifilm x-t2.jpg','Fujifilm X-T2','2018-06-20 00:00:00',18),('c0050',12490000,1,0,'<p>Không có mô tả<p>','japan','mirrorless','Panasonic','mirrorless-PANASONIC-panasonic g80.jpg','Panasonic G80','2018-06-08 00:00:00',30),('c0051',12290000,0,0,'<p>Không có mô tả<p>','japan','mirrorless','Panasonic','mirrorless-PANASONIC-panasonic lumix g7.jpg','Panasonic G7','2018-06-16 00:00:00',30),('c0052',43490000,0,0,'<p>Không có mô tả<p>','japan','mirrorless','Panasonic','mirrorless-PANASONIC-panasonic lumix gh5.jpg','Panasonic Lumix GH5','2018-05-03 00:00:00',30),('c0053',36490000,0,0,'<p>Không có mô tả<p>','china','mirrorless','Sony','mirrorless-SONY-sony a6500.jpg','Sony A6500','2018-05-11 00:00:00',30),('c0054',72490000,0,0,'<p>Không có mô tả<p>','america','mirrorless','Sony','mirrorless-SONY-sony a7r iii.jpg','Sony A7R III','2018-05-12 00:00:00',30),('c0055',89490000,2,0,'<p>Không có mô tả<p>','america','mirrorless','Sony','mirrorless-SONY-sony a9.jpeg','Sony A9','2018-06-17 00:00:00',30);
/*!40000 ALTER TABLE `sanpham` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) unsigned NOT NULL,
  `data` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
INSERT INTO `sessions` VALUES ('853apKzxJFmgtio5UX7pcBBptGTOUuX7',1530301742,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"isAdmin\":true,\"isLogged\":true,\"user\":{\"email\":\"admin@gmail.com\",\"matkhau\":\"f5bb0c8de146c67b44babbf4e6584cc0\",\"hoten\":\"admin\",\"sdt\":null,\"admin\":1},\"cart\":[]}'),('lUaTTIJrPTNdQWeF-WGCDz4XuUnkW_M7',1530333617,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"isAdmin\":false,\"isLogged\":false,\"user\":null,\"cart\":[]}'),('nWdOh5fLIit6ZfAXOHKiPVpKk3bE49wh',1530339776,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"isLogged\":false,\"user\":null,\"cart\":[],\"isAdmin\":false}'),('xb_whVP56a_gXrhrS7yE2YrqZOmB6bf5',1530273794,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"isLogged\":false,\"user\":null,\"cart\":[],\"isAdmin\":false}');
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `taikhoan`
--

DROP TABLE IF EXISTS `taikhoan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `taikhoan` (
  `email` varchar(50) NOT NULL,
  `matkhau` varchar(128) DEFAULT NULL,
  `hoten` varchar(50) DEFAULT NULL,
  `sdt` char(15) DEFAULT NULL,
  `admin` tinyint(4) DEFAULT '0',
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `taikhoan`
--

LOCK TABLES `taikhoan` WRITE;
/*!40000 ALTER TABLE `taikhoan` DISABLE KEYS */;
INSERT INTO `taikhoan` VALUES ('admin@gmail.com','f5bb0c8de146c67b44babbf4e6584cc0','admin',NULL,0),('vannghia@gmail.com','f5bb0c8de146c67b44babbf4e6584cc0','vannghia',NULL,0);
/*!40000 ALTER TABLE `taikhoan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `thuonghieu`
--

DROP TABLE IF EXISTS `thuonghieu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `thuonghieu` (
  `nhasanxuat` varchar(20) NOT NULL,
  `quocgia` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`nhasanxuat`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `thuonghieu`
--

LOCK TABLES `thuonghieu` WRITE;
/*!40000 ALTER TABLE `thuonghieu` DISABLE KEYS */;
INSERT INTO `thuonghieu` VALUES ('Canon','Nhật Bản'),('Fujifilm','Nhật Bản'),('GoPro','Mỹ'),('Kodak','Mỹ'),('LG','Hàn Quốc'),('Nikon','Nhật Bản'),('Panasonic','Nhật Bản'),('Ricoh','Mỹ'),('Samsung','Hàn Quốc'),('Sony','Nhật bản');
/*!40000 ALTER TABLE `thuonghieu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'camera_shop'
--

--
-- Dumping routines for database 'camera_shop'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-06-29 13:23:39
