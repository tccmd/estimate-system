// server.js

import express from 'express';
import dotenv from 'dotenv';

// 환경 변수 로드
dotenv.config();

// 서버 세팅
const app = express();
const PORT = process.env.PORT || 8000;
// 정적 파일 제공
app.use(express.static('public'));

// 서버 시작
app.listen(PORT, () => {
  console.log("process.env.NODE_ENV: ", process.env.NODE_ENV);
  if (process.env.NODE_ENV !== 'production') {
    console.log(`Server running on http://localhost:${PORT}`);
  } else {
    console.log(`
      Production server Started...
      `);
  }
});