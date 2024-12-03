import express from 'express';
import dotenv from 'dotenv';
import mysql from 'mysql2/promise';

// 환경 변수 로드
dotenv.config();
console.log('환경 변수 로드 확인');
console.log(process.env.DB_HOST); // DB_HOST 값을 출력
console.log(process.env.DB_DATABASE); // DB_DATABASE 값을 출력

const app = express();

// 포트 가져오기
const PORT = process.env.PORT || 8000;

// MySQL 연결 설정
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

// REST API 정의
app.get('/api/data', async (req, res) => {
  try {
    const [rows] = await pool.query(`SELECT * FROM ${process.env.DB_TABLENAME}`); // 원하는 데이터 가져오기
    res.json(rows); // 데이터를 JSON 형태로 반환
  } catch (error) {
    res.status(500).send('DB Error: ' + error.message);
  }
});

// 정적 파일 제공
app.use(express.static('public'));

// 서버 시작
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});