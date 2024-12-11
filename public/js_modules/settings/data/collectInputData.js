import { modalBody } from "../settings.js";

// 입력 데이터 수집 - 입력 필드의 데이터를 수집하고 JSON 객체로 변환
export default function collectInputData() {
  // id에 'title'을 포함하지 않는 요소만 선택
  const inputGroups = modalBody.querySelectorAll(".input-group:not([id*='title'])");
  const data = {};

  inputGroups.forEach((group) => {
    const [optionInput, priceInput] = group.querySelectorAll(".form-control");
    const option = optionInput.id;
    let price;
    if (optionInput.value === "필수 카테고리 여부") {
      const checkbox = priceInput.querySelector('.form-check-input')
      price = checkbox.checked;
    } else {
      price = priceInput.value; // parseFloat(priceInput.value); // 숫자로 변환
    }
    data[option] = price; // 옵션과 가격을 키-값으로 추가
  });

  // 디버깅 로그
  console.log(data);

  return data;
}