// data.js

export const estimateDatainit = {
  categories: {
  },
  packageInit: {
    "묶음 옵션들": [],
    "할인율": 0,
    "가격": 0,
  },
};

export let estimateData = {};

export default async function dataInit() {

  const response = await fetch('/api/download-options');
  const responseData = await response.json();
  const data = responseData.data;

  console.log('data: ', data);
  estimateData = data;
}

// export const estimateData = {
//   categories: {
//     "category1": {
//       "required": true,
//       "option1": 10000,
//       "option2": 200,
//       "option3": 3000,
//     },
//     "category2": {
//       "required": false,
//       "option1": 100,
//       "option2": 2000,
//       "option3": 30000,
//       "option4": 10000,
//       "--------------------------": "",
//       "option5": 10000,
//       "option6": 10000,
//     },
//   },
//   packages: {
//     package1: {
//       "묶음 옵션들": ["option3", "option4", "option5"],
//       "할인율": 10,
//       "가격": 45000,
//     },
//     package2: {
//       "묶음 옵션들": ["option3", "option4", "option6"],
//       "할인율": 10,
//       "가격": 45000,
//     },
//     package3: {
//       "묶음 옵션들": ["option3", "option5", "option6"],
//       "할인율": 10,
//       "가격": 45000,
//     },
//     package4: {
//       "묶음 옵션들": ["option3", "option4", "option5", "option6"],
//       "할인율": 20,
//       "가격": 48000,
//     },
//   },
// }