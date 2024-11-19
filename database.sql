-- --------------------------------------------------------
-- Hôte:                         127.0.0.1
-- Version du serveur:           8.3.0 - MySQL Community Server - GPL
-- SE du serveur:                Win64
-- HeidiSQL Version:             12.8.0.6908
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Listage de la structure de la base pour blog
CREATE DATABASE IF NOT EXISTS `blog` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `blog`;

-- Listage de la structure de table blog. articles
CREATE TABLE IF NOT EXISTS `articles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `description` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `published_date` bigint NOT NULL,
  `author` int NOT NULL DEFAULT (0),
  `published` enum('Y','N') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'N',
  `allow_comment` enum('Y','N') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'N',
  `update_date` bigint DEFAULT NULL,
  `img` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `content` json NOT NULL,
  `category_id` int NOT NULL,
  `note` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `imdbid` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `type` enum('movie','serie') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `source` json DEFAULT NULL,
  `folderId` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `article_author` (`author`),
  KEY `FK_articles_categories` (`category_id`),
  KEY `imdbid` (`imdbid`),
  CONSTRAINT `article_author` FOREIGN KEY (`author`) REFERENCES `users` (`id`),
  CONSTRAINT `FK_articles_categories` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=98 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Les données exportées n'étaient pas sélectionnées.

-- Listage de la structure de table blog. bans
CREATE TABLE IF NOT EXISTS `bans` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type` enum('IP','Account') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `IP` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `user` int DEFAULT NULL,
  `date_ban` bigint NOT NULL,
  `reason` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `end_date` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `banned_user` (`user`),
  CONSTRAINT `banned_user` FOREIGN KEY (`user`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=cp1251;

-- Les données exportées n'étaient pas sélectionnées.

-- Listage de la structure de table blog. categories
CREATE TABLE IF NOT EXISTS `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `icon` varchar(255) CHARACTER SET cp1251 COLLATE cp1251_general_ci DEFAULT NULL,
  `iconColor` varchar(255) CHARACTER SET cp1251 COLLATE cp1251_general_ci DEFAULT NULL,
  `published` enum('Y','N') NOT NULL DEFAULT 'N',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=86 DEFAULT CHARSET=cp1251;

-- Les données exportées n'étaient pas sélectionnées.

-- Listage de la structure de table blog. categories_articles
CREATE TABLE IF NOT EXISTS `categories_articles` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `subcategorie_id` int NOT NULL,
  `article_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Colonne 3` (`id`),
  KEY `article` (`article_id`),
  KEY `subcategorie_article` (`subcategorie_id`),
  CONSTRAINT `article` FOREIGN KEY (`article_id`) REFERENCES `articles` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `subcategorie_article` FOREIGN KEY (`subcategorie_id`) REFERENCES `subcategories` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=cp1251;

-- Les données exportées n'étaient pas sélectionnées.

-- Listage de la structure de table blog. comments
CREATE TABLE IF NOT EXISTS `comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `author_id` int NOT NULL,
  `article_id` int NOT NULL,
  `date_published` bigint NOT NULL,
  `published` enum('Y','N') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'Y',
  `content` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `perspective_socre` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '0',
  `moderator_score` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '0',
  `online` enum('Y','N') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `article_comment` (`article_id`),
  KEY `comment_author` (`author_id`),
  CONSTRAINT `article_comment` FOREIGN KEY (`article_id`) REFERENCES `articles` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `author` FOREIGN KEY (`author_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Les données exportées n'étaient pas sélectionnées.

-- Listage de la structure de table blog. config
CREATE TABLE IF NOT EXISTS `config` (
  `id` int NOT NULL AUTO_INCREMENT,
  `FacebookToken` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `FacebookTokenUpdateDate` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Les données exportées n'étaient pas sélectionnées.

-- Listage de la structure de table blog. logins
CREATE TABLE IF NOT EXISTS `logins` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `ip` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `token` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `Date_log` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userID` (`user_id`),
  CONSTRAINT `logged_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=cp1251;

-- Les données exportées n'étaient pas sélectionnées.

-- Listage de la structure de table blog. movies
CREATE TABLE IF NOT EXISTS `movies` (
  `imdb_id` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `json` json NOT NULL,
  `created` bigint NOT NULL,
  `last_update` bigint DEFAULT NULL,
  PRIMARY KEY (`imdb_id`),
  UNIQUE KEY `imdb_id` (`imdb_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Les données exportées n'étaient pas sélectionnées.

-- Listage de la structure de table blog. permissions
CREATE TABLE IF NOT EXISTS `permissions` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `rank_id` int NOT NULL,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `ID` (`ID`),
  KEY `rank_link` (`rank_id`),
  CONSTRAINT `rank_link` FOREIGN KEY (`rank_id`) REFERENCES `rank` (`ID`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=cp1251;

-- Les données exportées n'étaient pas sélectionnées.

-- Listage de la structure de table blog. rank
CREATE TABLE IF NOT EXISTS `rank` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `ID` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=cp1251;

-- Les données exportées n'étaient pas sélectionnées.

-- Listage de la structure de table blog. snapchat
CREATE TABLE IF NOT EXISTS `snapchat` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `type` enum('img','video') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'img',
  `content` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `list` enum('public','black') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'public',
  `published` enum('Y','N') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'Y',
  `published_date` bigint NOT NULL,
  `author` int DEFAULT NULL,
  `social_network` enum('Y','N') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'Y',
  `facebook_url` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `thumbnailPath` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `FK__users` (`author`) USING BTREE,
  CONSTRAINT `snap_author` FOREIGN KEY (`author`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=424 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Les données exportées n'étaient pas sélectionnées.

-- Listage de la structure de table blog. subcategories
CREATE TABLE IF NOT EXISTS `subcategories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `categorie_id` int NOT NULL,
  `color` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_subcategories_categories` (`categorie_id`),
  CONSTRAINT `FK_subcategories_categories` FOREIGN KEY (`categorie_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=cp1251;

-- Les données exportées n'étaient pas sélectionnées.

-- Listage de la structure de table blog. users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `last_password_modify` bigint NOT NULL DEFAULT (0),
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `rank_id` int DEFAULT '1',
  `verify_email_code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `last_ip` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `register_ip` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `last_connexion` bigint DEFAULT NULL,
  `register_date` bigint DEFAULT NULL,
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `otp` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `otp_time` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `rank_link_user` (`rank_id`) USING BTREE,
  KEY `ID` (`id`) USING BTREE,
  CONSTRAINT `rank_link_user` FOREIGN KEY (`rank_id`) REFERENCES `rank` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=cp1251;

-- Les données exportées n'étaient pas sélectionnées.

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
