import { optionsWithPrices } from "./data.js";
const modalBody = document.getElementById("settings-modal-body");

export default function settingsInit() {
  settingsModalBody();
}

function settingsModalBody() {
  const options = Object.keys(optionsWithPrices); // 옵션 목록
  const prices = Object.values(optionsWithPrices); // 가격 목록
  const title = {
    "옵션": "가격"
  }
  const categories = {
    1: "필수 사항",
    2: "선택 사항",
    3: "묶음 처리",
  }

  // 카테고리 엘리먼트 생성
  createCategoty(categories[1]);

  // Title 엘리먼트 생성
  createTitle(title);

  // 반복문으로 여러 개의 input-group 생성
  options.forEach((option, index) => {
    // 1. input-group 생성
    const inputGroup = document.createElement("div");
    inputGroup.classList.add("input-group", "mb-3"); // 추가 여백을 위한 mb-3

    // 2. 옵션 input 생성
    const input1 = document.createElement("input");
    input1.classList.add("form-control");
    input1.value = option; // 옵션 값 설정

    // 삭제 버튼 생성
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("btn", "btn-outline-secondary"); // 아이콘 클래스 추가

    // SVG 코드
    deleteButton.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z"></path>
      </svg>
      `;
    // // 삭제 버튼 클릭 시 해당 input과 버튼을 삭제
    deleteButton.addEventListener("click", () => {
      inputGroup.remove(); // inputGroup(옵션 및 버튼) 삭제
    });

    // 3. 가격 input 생성
    const input2 = document.createElement("input");
    input2.classList.add("form-control");
    input2.value = prices[index]; // 가격 값 설정
    // input2.type = "number"; // 숫자 입력만 허용

    // 4. 요소 조립
    inputGroup.appendChild(input1);
    inputGroup.appendChild(input2);
    inputGroup.appendChild(deleteButton);

    // 5. input-group을 modalBody에 추가
    modalBody.appendChild(inputGroup);
  });

  // submit()
  const settingsSubmitButton = document.getElementById('settings-submit-button');
  settingsSubmitButton.addEventListener('click', () => {
    updateServerData();
    window.location.reload();
  });
  collectInputData();
}

const createCategoty = (category) => {
  const categoryElement = document.createElement("div");
  categoryElement.classList.add("alert", "alert-secondary");
  categoryElement.setAttribute("role", "alert");
  categoryElement.textContent = category;

  modalBody.appendChild(categoryElement);
}

const createTitle = (titleObject) => {

  // console.log("titleObject: ", titleObject)
  // console.log("Object.keys(titleObject)[0]: ", Object.keys(titleObject)[0])
  // 모든 키와 값 출력
  // for (const key in titleObject) {
  //   console.log(`Key: ${key}, Value: ${titleObject[key]}`);
  // }

  // 1. input-group 생성
  const inputGroup = document.createElement("div");
  inputGroup.classList.add("input-group", "mb-3"); // 추가 여백을 위한 mb-3
  inputGroup.id = "title"

  // 2. 옵션 제목 input 생성
  const input1 = document.createElement("input");
  input1.classList.add("form-control");
  input1.value = Object.keys(titleObject)[0]; // 옵션 값 설정
  input1.disabled = true;

  // 3. 가격 제목 input 생성
  const input2 = document.createElement("input");
  input2.classList.add("form-control");
  input2.value = Object.values(titleObject)[0]; // 가격 값 설정
  input2.disabled = true;

  // 4. 요소 조립
  inputGroup.appendChild(input1);
  inputGroup.appendChild(input2);

  // 5. input-group을 modalBody에 추가
  modalBody.appendChild(inputGroup);
}

// 입력 데이터 수집 - 입력 필드의 데이터를 수집하고 JSON 객체로 변환
function collectInputData() {
  // id에 'title'을 포함하지 않는 요소만 선택
  const inputGroups = modalBody.querySelectorAll(".input-group:not([id*='title'])");
  const data = {};

  inputGroups.forEach((group) => {
    const [optionInput, priceInput] = group.querySelectorAll(".form-control");
    const option = optionInput.value;
    const price = parseFloat(priceInput.value); // 숫자로 변환
    data[option] = price; // 옵션과 가격을 키-값으로 추가
  });

  // 디버깅 로그
  // console.log(data);

  return data;
}

async function updateServerData() {
  const data = collectInputData();

  try {
    const response = await fetch('/api/update-options', {
      method: 'POST', // POST 또는 PUT 요청
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const result = await response.json();
      console.log('Data uploaded successfully:', result.fileUrl);
    } else {
      console.error('Failed to update data:', await response.json());
    }
  } catch (error) {
    console.error('Error updating data:', error);
  }
}
