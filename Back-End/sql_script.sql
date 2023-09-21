CREATE DATABASE IF NOT EXISTS oasys;

USE oasys;
-- DROP DATABASE IF EXISTS oasys;

DROP TABLE IF EXISTS `Member`;

CREATE TABLE `Member` (
    `member_id` BIGINT NOT NULL AUTO_INCREMENT,
    `member_faceId` VARCHAR(15) NULL,
    `member_nickName` VARCHAR(255) NULL,
    `member_gender` VARCHAR(6) NULL,
    `member_phone` VARCHAR(11) NOT NULL,
    `member_role` VARCHAR(6) NULL DEFAULT '0',
    `member_createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `member_updatedAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `member_age` INT NULL,
    `member_isDeleted` TINYINT(1) NULL DEFAULT '0',
    PRIMARY KEY (`member_id`)
);

CREATE INDEX `idx_faceId` ON Member (`member_faceId`);

-- TellerType 테이블 생성
CREATE TABLE IF NOT EXISTS `TellerType` (
    `tellerType_id` BIGINT NOT NULL PRIMARY KEY,
    `tellerType_name` VARCHAR(255) NULL
);

-- Category 테이블 생성
CREATE TABLE IF NOT EXISTS `Category` (
    `cate_id` BIGINT NOT NULL PRIMARY KEY,
    `cate_generalTypeName` VARCHAR(255) NULL,
    `cate_simpleTypeName` VARCHAR(255) NULL,
    `cate_tellerType_id` BIGINT NOT NULL,
    FOREIGN KEY (`cate_tellerType_id`) REFERENCES `TellerType` (`tellerType_id`)
);
