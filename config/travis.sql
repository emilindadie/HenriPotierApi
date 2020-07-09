# Create Testuser
CREATE USER 'dev'@'localhost' IDENTIFIED BY 'dev';
GRANT SELECT,INSERT,UPDATE,DELETE,CREATE,DROP ON *.* TO 'dev'@'localhost';
# Create DB
CREATE DATABASE IF NOT EXISTS `henripotier` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `demo`;
# Create Table

CREATE TABLE `card_entity` (
  `id` int(11) NOT NULL,
  `expiration` datetime NOT NULL,
  `cryptogramme` int(11) NOT NULL,
  `cardNumber` int(11) NOT NULL,
  `solde` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;