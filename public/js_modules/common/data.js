// data.js

// export const estimateData = {
//   categories: {
//   },
//   packages: {
//   },
// };

export const estimateData = {
  categories: {
    "category1": {
      "required": true,
      "option1": 10000,
      "option2": 200,
      "option3": 3000,
    },
    "category2": {
      "required": false,
      "option1": 100,
      "option2": 2000,
      "option3": 30000,
      "option4": 10000,
      "--------------------------": "",
      "option5": 10000,
      "option6": 10000,
    },
  },
  packages: {
    package1: {
      "묶음 옵션들": ["option3", "option4", "option5"],
      "할인율": 10,
      "가격": 1530000,
    },
    package2: {
      "묶음 옵션들": ["option3", "option4", "option6"],
      "할인율": 10,
      "가격": 1485000,
    },
    package3: {
      "묶음 옵션들": ["option3", "option5", "option6"],
      "할인율": 10,
      "가격": 1485000,
    },
    package4: {
      "묶음 옵션들": ["option3", "option4", "option5", "option6"],
      "할인율": 20,
      "가격": 1720000,
    },
  },
}

// entry
export const categories = estimateData.categories; // {Ob, ...}
export const packages = estimateData.packages; // {Ob, ...}

// entry2
export const categoriesValues = Object.values(categories); // [Ob, ...]
export const categoriesEntries = Object.entries(categories); // [[key, value({})], ...]
export const packagesValues = Object.values(packages); // [Ob, ...]
export const packagesEntries = Object.entries(packages); // [[key, value({})], ...]

// setting_strings
export const tableTitle = ["옵션", "가격"];

// 결과 데이터를 담을 객체
export const optionsWithPrices = {};

export default function dataInit() {

  // console.log("categories: ", categories);
  // console.log("packages: ", packages);
  // console.log("categoriesValues: ", categoriesValues);
  // console.log("categoriesEntries: ", categoriesEntries);

  return estimateData;
}


// 가격 데이터와 옵션을 통합한 객체
// export const optionsWithPrices = {
//   "기본 3D 공간촬영 (20평 기준)": 500000,
//   "서버유지보수비": 80000,
//   "서버유지보수비 1년": 384000,
//   "UI 커스텀": 550000,
//   "트림 보정작업": 350000,
//   "태그": 9000,
//   "평수 추가": 10000,
//   "색감 보정작업": 350000,
//   "네비게이션": 350000,
//   // "--------------------------", //  구분선은 여기에 포함시키지 않음
//   "공간 사진촬영": 450000,
//   "공간 마케팅촬영": 700000,
//   "드론 항공촬영": 500000,
//   "인터뷰촬영": 500000,
// };

// export async function dataInit() {
//   await fetchOptionsData().then(() => {

//   });

// }
export async function fetchOptionsData() {
  try {
    const response = await fetch('/api/download-options');
    const responseData = await response.json();
    const optionsData = responseData.data;

    // // null 값을 0으로 변환
    // Object.keys(optionsData).forEach((key) => {
    //   if (optionsData[key] === null) {
    //     // optionsData[key] = 0;
    //     delete optionsData[key];  // 해당 키 삭제
    //   }
    // });

    console.log('optionsWithPrices before assignment:', optionsData);

    // 값 할당
    optionsWithPrices = optionsData;
    // 옵션 목록 생성
    options1 = Object.keys(optionsWithPrices).slice(0, 7);
    options2 = [
      ...Object.keys(optionsWithPrices).slice(7, 9), // 색감 보정작업
      "--------------------------", // 구분선 추가
      ...Object.keys(optionsWithPrices).slice(9), // 나머지 옵션
    ];
    return optionsData;
  } catch (err) {
    console.error('Failed to fetch options:', err);
  }
}