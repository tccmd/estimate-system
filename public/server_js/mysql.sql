USE etc;

CREATE TABLE estimate_data (
  id INT(11) NOT NULL AUTO_INCREMENT COMMENT 'id',
  option_name VARCHAR(300) NOT NULL COMMENT '옵션 이름',
  option_price INT(11) COMMENT '옵션 가격',
  created_datetime DATETIME NOT NULL COMMENT '작성시간',
  updated_datetime DATETIME DEFAULT NULL COMMENT '수정시간',
  deleted_yn CHAR(1) NOT NULL DEFAULT 'N' COMMENT '삭제 여부',
  PRIMARY KEY (id)
);

INSERT INTO estimate_data (option_name, option_price, created_datetime, updated_datetime, deleted_yn) 
VALUES 
('옵션A', 1000, NOW(), NULL, 'N'),
('옵션B', 2000, NOW(), NULL, 'N'),
('옵션C', NULL, NOW(), NULL, 'Y');

SELECT id, option_name, option_price
FROM estimate_data
WHERE deleted_yn = 'N'
ORDER BY created_datetime DESC;
