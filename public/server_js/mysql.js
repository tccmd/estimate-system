import mysql from 'mysql2/promise.js';
import dotenv from 'dotenv';

dotenv.config(); // .env 파일 로드

// DB 연결 생성
export const createConnection = async () => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
    });
    console.log('✅ DB 연결 성공!');
    return connection;
  } catch (error) {
    console.error('❌ DB 연결 실패:', error.message);
    throw error; // 연결 실패 시 에러를 호출한 쪽으로 전달
  }
};

// // Create connection to db
// const connection = await mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USERNAME,
//   database: process.env.DB_DATABASE,
// });

// SELECT query
// const SELECT

