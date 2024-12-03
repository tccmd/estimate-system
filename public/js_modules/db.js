const mysql = require("mysql2");
const dotenv = require('dotenv');

export function db() {
  dotenv.config();
  console.log('db 함수 실행');
  console.log(process.env)
  console.log('DB_DATABASE', process.env.DB_DATABASE)
}

// // RDS 연결 설정
// const connection = mysql.createConnection({
//   host: , // RDS 엔드포인트
//   user: "your-username", // RDS 사용자 이름
//   password: "your-password", // RDS 비밀번호
//   database: "your-database-name", // RDS 데이터베이스 이름
//   port: 3306, // 포트 (기본값: 3306)
// });

// // 연결 시도
// connection.connect((err) => {
//   if (err) {
//     console.error("Database connection failed:", err.stack);
//     return;
//   }
//   console.log("Connected to RDS database!");
// });

// // 쿼리 실행 예제
// connection.query("SELECT * FROM your_table", (error, results) => {
//   if (error) throw error;
//   console.log(results);
// });

// // 연결 종료
// connection.end();
