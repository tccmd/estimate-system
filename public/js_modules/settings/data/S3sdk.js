// public/server_js/s3upload.js

import 'dotenv/config.js'
import { GetObjectCommand, ObjectCannedACL, S3Client } from "@aws-sdk/client-s3"
import { Upload } from '@aws-sdk/lib-storage'

// s3 sdk 설정
const Bucket = process.env.AWS_S3_BUCKET_NAME;
const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  }
});

export async function downloadJsonData() {
  // Read the object.
  const { Body } = await s3Client.send(
    new GetObjectCommand({
      Bucket: Bucket,
      Key: "public/estimate-data.json",
    }),
  );

  // console.log("Body: ", Body);
  // console.log("Body.transformToString(): ", await Body.transformToString());

  // Body를 문자열로 변환 후 JSON 파싱
  const jsonData = JSON.parse(await Body.transformToString());
  console.log("Parsed JSON Data: ", jsonData);

  return jsonData;
}

export async function uploadJsonData(data) {
  // 디버깅 로그 - 환경변수
  console.log('AWS_REGION:', process.env.AWS_REGION);
  console.log('AWS_ACCESS_KEY_ID:', process.env.AWS_ACCESS_KEY_ID);
  console.log('AWS_SECRET_ACCESS_KEY:', process.env.AWS_SECRET_ACCESS_KEY);
  console.log('S3 Bucket Name:', process.env.AWS_S3_BUCKET_NAME);

  // 받은 JSON 데이터를 문자열로 변환 (필수)
  const fileContent = JSON.stringify(data);

  // 업로드 파라미터 설정
  const uploadParams = {
    Bucket,
    Key: `public/estimate-data.json`,  // 파일 경로와 이름 지정
    Body: fileContent,  // JSON 데이터를 문자열로 파일의 Body에 넣음
    ContentType: 'application/json',  // JSON 파일로 처리
    ACL: ObjectCannedACL.public_read,  // 공개 읽기 권한 설정
  };
  // 디버깅 로그 - 업로드 파라미터
  console.log('s3upload_uploadParams: ', uploadParams);

  // 업로드 수행 try
  try {
    const upload = new Upload({
      client: s3Client,
      params: uploadParams,
    });

    // 업로드 함수 실행
    await upload.done();

    // 업로드 후, 파일의 URL 반환
    return `https://${Bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${uploadParams.Key}`;

  } catch (err) {
    // 업로드 실패 시 에러 처리
    console.error('Error uploading JSON data to S3:', err);
    throw new Error(`File upload failed: ${err.message || 'Unknown error'}`);
  }
}





// // 환경변수
// import 'dotenv/config.js'
// // @aws-sdk
// import { ObjectCannedACL, S3Client } from "@aws-sdk/client-s3"
// import { Upload } from '@aws-sdk/lib-storage'

// // s3 sdk setting
// const Bucket = process.env.AWS_S3_BUCKET_NAME;
// const s3 = new S3Client({
//   region: process.env.AWS_REGION,
//   credentials: {
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//   }
// });
// const FILE_KEY = process.env.AWS_S3_FILE_KEY; // e.g., 'data.json'

// export async function uploadFile(file) {
//   // 디버깅 로그 - 환경변수
//   console.log('AWS_REGION:', process.env.AWS_REGION);
//   console.log('AWS_ACCESS_KEY_ID:', process.env.AWS_ACCESS_KEY_ID);
//   console.log('AWS_SECRET_ACCESS_KEY:', process.env.AWS_SECRET_ACCESS_KEY);
//   console.log('S3 Bucket Name:', process.env.AWS_S3_BUCKET_NAME);
//   // 디버깅 로그 - 파일
//   console.log('file: ', file);

//   // S3 업로드 파라미터 설정 // fild: FileUpload의 스트림이 사용됨
//   const uploadParams = {
//     Bucket,
//     Key: `public/${file.filename}`,  // 파일이 저장될 S3 경로 (예: profile-images/파일명)
//     Body: file.createReadStream(),  // 파일 스트림
//     ContentType: file.mimetype,  // 파일의 MIME 타입
//     ACL: ObjectCannedACL.public_read,  // 공개 읽기 권한 설정
//   };

//   // 디버깅 로그 - 업로드 파라미터
//   console.log('s3upload_uploadParams: ', uploadParams);

//   // 업로드 시행
//   try {
//     // Upload 객체 생성 (s3 client, upload parameter)
//     const upload = new Upload({
//       client: s3,
//       params: uploadParams,
//     });

//     // 업로드 함수 실행
//     await upload.done();

//     // 업로드 후, 파일의 URL 반환
//     return `https://${Bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${uploadParams.Key}`;

//   } catch (err) {
//     // 업로드 시행 실패 시 에러 발행
//     console.error('Error uploading file to S3:', err);
//     throw new Error(`File upload failed: ${err.message || 'Unknown error'}`);
//   }
// }