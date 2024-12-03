// export default function settingsInit() {
//   settingsModalBody();
// }

// function settingsModalBody() {
//   const modalBody = document.getElementById("settings-modal-body");

//   // 반복문으로 여러 개의 input-group 생성
//   const numberOfGroups = 17; // 생성할 그룹 수
//   for (let i = 0; i < numberOfGroups; i++) {
//     // 1. input-group 생성
//     const inputGroup = document.createElement("div");
//     inputGroup.classList.add("input-group", "mb-3"); // 추가 여백을 위한 mb-3

//     // 2. 첫 번째 input 생성
//     const input1 = document.createElement("input");
//     input1.classList.add("form-control");

//     // 3. 두 번째 input 생성
//     const input2 = document.createElement("input");
//     input2.classList.add("form-control");

//     // 첫 번째 input-group일 때만 특별 설정
//     if (i === 0) {
//       input1.setAttribute("placeholder", "옵션");
//       input2.setAttribute("placeholder", "가격");
//       input1.disabled = true; // 비활성화
//       input2.disabled = true; // 비활성화
//       input1.classList.add("center-placeholder");
//       input2.classList.add("center-placeholder");
//     } else {
//       // 나머지 input-group의 기본 설정
//       input1.setAttribute("placeholder", `Placeholder ${i}`);
//       input2.setAttribute("placeholder", `Another Input ${i}`);
//     }

//     // 4. 요소 조립
//     inputGroup.appendChild(input1);
//     inputGroup.appendChild(input2);

//     // 5. input-group을 modalBody에 추가
//     modalBody.appendChild(inputGroup);
//   }
// }

import { optionsWithPrices } from "./data.js";

export default function settingsInit() {
  settingsModalBody();
}

function settingsModalBody() {
  const modalBody = document.getElementById("settings-modal-body");

  const options = Object.keys(optionsWithPrices); // 옵션 목록
  const prices = Object.values(optionsWithPrices); // 가격 목록

  // 반복문으로 여러 개의 input-group 생성
  options.forEach((option, index) => {
    // 1. input-group 생성
    const inputGroup = document.createElement("div");
    inputGroup.classList.add("input-group", "mb-3"); // 추가 여백을 위한 mb-3

    // 2. 옵션 input 생성
    const input1 = document.createElement("input");
    input1.classList.add("form-control");
    input1.value = option; // 옵션 값 설정

    // 3. 가격 input 생성
    const input2 = document.createElement("input");
    input2.classList.add("form-control");
    input2.value = prices[index]; // 가격 값 설정
    input2.type = "number"; // 숫자 입력만 허용

    // 첫 번째 input-group일 때만 특별 설정
    if (index === 0) {
      input1.disabled = true; // 비활성화
      input2.disabled = true; // 비활성화
    }

    // 4. 요소 조립
    inputGroup.appendChild(input1);
    inputGroup.appendChild(input2);

    // 5. input-group을 modalBody에 추가
    modalBody.appendChild(inputGroup);
  });
}
