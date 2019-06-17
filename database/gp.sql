-- 新建数据库
create database gp default character set utf8 collate utf8_general_ci;

use gp;

-- 用户表
drop table if exists user;
create table user (
  user_id int PRIMARY KEY AUTO_INCREMENT,
  head VARCHAR(255), -- 头像
  nickname VARCHAR(255), -- 昵称
  sex VARCHAR(255),
  age int,
  password VARCHAR(255),
  photoNumber long, -- 手机号码
  email VARCHAR(255), -- email
  address VARCHAR(255), -- 住址
  type int DEFAULT 1 -- 0表示禁止登录,1表示用户，2顾问，3管理员
);

-- 留学申请表
drop table IF EXISTS abroad;
create table abroad(
  a_id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,
  school_id INT,
  college_id INT,
  major_id INT,
  certify VARCHAR(255), -- 最高学位及其其他证明，打包
  status INT DEFAULT 0, -- 0表示没审核，1表示通过，2表示没通过
  admission_notice VARCHAR(255), -- 录取通知书
  agree INT , -- 我是否去这个学校
  reason VARCHAR(255)   -- 没通过的原因
);

-- 签证表
drop table IF EXISTS visa;
create table visa(
  visa_id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,
  stuff VARCHAR(255), -- 签证材料
  post INT, -- 护照是否寄出
  receive INT, -- 护照有没有收到
  status INT , -- 0表示没审核， 1表示通过，2表示没通过
  visa VARCHAR(255) -- 签证的电子版
);

-- 顾问表
drop table IF EXISTS consultant;
create table consultant(
  consultant_id INT PRIMARY KEY AUTO_INCREMENT,
  name varchar(255), -- 真实姓名
  user_id INT,
  audit_info VARCHAR(255), -- 审核文件
  status INT DEFAULT 0 -- 0表示没审核， 1表示通过，2表示没通过
);


-- GPA 表
drop table IF EXISTS gpa;
create table gpa(
  gpa_id INT PRIMARY KEY AUTO_INCREMENT,
  gpa long
);

-- 学校表
drop table IF EXISTS school;
create table school (
  school_id int PRIMARY KEY AUTO_INCREMENT,
  school_name VARCHAR(255),
  school_location VARCHAR(255),
  school_url VARCHAR(255)
);

-- 学院表
drop table IF EXISTS college;
create table college(
  college_id INT PRIMARY KEY AUTO_INCREMENT,
  college_name VARCHAR(255)
);

-- 专业表
drop table IF EXISTS major;
create table major(
  major_id INT PRIMARY KEY AUTO_INCREMENT,
  major_name VARCHAR(255),
  rank int, -- 1,表示本科，2表示研究，4表示博士
  college_id int
);