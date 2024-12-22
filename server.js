// server.js

import express from 'express';
import dotenv from 'dotenv';
import { downloadJsonData, uploadJsonData } from './S3sdk.js';

// 환경 변수 로드
dotenv.config();

// 서버 세팅
const app = express();
const PORT = process.env.PORT || 8000;
// JSON 파싱 미들웨어 (POST 요청의 body에 있는 JSON 데이터 파싱)
app.use(express.json());

// 정적 파일 제공
app.use(express.static('public'));

// GET 요청 처리
app.get('/api/download-options', async (req, res) => {
  // S3에서 파일 가져오기
  try {
    const data = await downloadJsonData();

    // 업로드 성공 시 클라이언트로 URL 응답
    res.status(200).json({
      message: 'Data downloaded successfully to S3!',
      data: data, // 업로드된 파일 URL
    });
  } catch (err) {
    console.error("Error retrieving file from S3:", err);
    res.status(500).json({ error: "Failed to retrieve file" });
  }
});

// POST 요청 처리 (파일 업로드 없이 JSON 데이터 처리)
app.post('/api/update-options', async (req, res) => {
  try {
    // 클라이언트 데이터 - json
    const data = req.body; // 클라이언트에서 보내는 JSON 데이터
    console.log('Received data:', data);

    // S3에 파일 업로드
    const fileUrl = await uploadJsonData(data);
    console.log('File uploaded successfully:', fileUrl);

    // 업로드 성공 시 클라이언트로 URL 응답
    res.status(200).json({
      message: 'Data uploaded successfully to S3!',
      fileUrl: fileUrl, // 업로드된 파일 URL
    });
  } catch (error) {
    console.error('Error uploading data to S3:', error);
    res.status(500).json({ message: 'Failed to upload data to S3', error: error.message });
  }
});

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

export default app;