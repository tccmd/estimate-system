import { minusButtonSVG } from "../..//components/SVGs.js";
import { createAutocompleteInput } from "../../components/AutoComplete.js";
import createButton from "./Btn.js";
import createSwitch from "./Switch.js";

export default function createIptGroup(key, value, entry2, entry1) {
  // 1. input-group 생성
  const inputGroup = document.createElement("div");
  inputGroup.classList.add("input-group", "mb-3");

  // 2. 옵션 input 생성
  const input1 = document.createElement(`${key === "묶음 옵션들" ? "div" : "input"}`);
  input1.classList.add("form-control");
  input1.id = "key";

  // 조건에 따라 input1 설정
  if (entry1 === "packages") {
    input1.readOnly = true;
    input1.classList.add('intput-readonly');
  }
  let infoIcon;
  if (key === "묶음 옵션들") {
    infoIcon = document.createElement('span');
    infoIcon.classList.add('px-2');
    infoIcon.textContent = 'ⓘ';
    infoIcon.role = 'button';
    infoIcon.setAttribute('data-bs-toggle', 'tooltip');
    infoIcon.setAttribute('data-bs-placement', 'top');
    infoIcon.setAttribute('data-bs-custom-class', 'custom-tooltip');
    infoIcon.setAttribute('data-bs-title', '","를 이용해서 옵션을 추가하세요.');

    input1.classList.add('d-flex', 'align-items-center');
    input1.textContent = key;
    input1.appendChild(infoIcon);
  }
  input1.value = key === "required" ? "필수 카테고리 여부" : (key || "example");

  // 3. 가격 input 생성 또는 추가 입력 설정
  let input2;
  if (key === "required") {
    input2 = document.createElement('div');
    input2.classList.add('form-control');
    input2.appendChild(createSwitch(`${entry2}SwitchId`, value));
  } else if (key === "묶음 옵션들") {
    input2 = createAutocompleteInput();
  } else if (key === "--------------------------") {
    input2 = createReadonlyInput();
    input1.classList.add("intput-readonly");
  } else {
    input2 = createPriceInput(key, value);
  }

  input2.id = "value";

  // 4. 삭제 버튼 생성
  let deleteButton;
  if (entry1 !== "packages") {
    deleteButton = createButton(minusButtonSVG, () => {
      inputGroup.remove(); // inputGroup(옵션 및 버튼) 삭제
    }, "옵션 삭제");
  }

  // 5. 요소 조립
  inputGroup.appendChild(input1);
  inputGroup.appendChild(input2);
  if (deleteButton) inputGroup.appendChild(deleteButton);

  return inputGroup;
}

// Readonly input 생성
function createReadonlyInput() {
  const input = document.createElement("input");
  input.classList.add("form-control", "intput-readonly");
  input.readOnly = true;
  return input;
}

// 가격 입력 필드 생성
function createPriceInput(key, value) {
  const input = document.createElement("input");
  input.classList.add("form-control");
  input.value = key === "할인율" ? `${value}%` : `${value}원`;
  input.addEventListener('input', function () {
    handlePriceInput(input, key);
  });
  return input;
}

// 가격 입력 시 처리
function handlePriceInput(input, key) {
  const cursorPosition = input.selectionStart; // 현재 커서 위치 저장
  const valueWithoutSymbol = input.value.replace(/[^\d]/g, ''); // 숫자만 남김
  input.value = key === "할인율" ? `${valueWithoutSymbol}%` : `${valueWithoutSymbol}원`;

  // 커서를 항상 뒤로 유지
  input.setSelectionRange(cursorPosition, cursorPosition);
}

// // 삭제 버튼 생성
// function createDeleteButton(inputGroup) {
//   const deleteButton = document.createElement("button");
//   deleteButton.classList.add("btn");
//   deleteButton.innerHTML = minusButtonSVG;
//   deleteButton.addEventListener("click", () => {
//     inputGroup.remove(); // inputGroup(옵션 및 버튼) 삭제
//   });
//   return deleteButton;
// }
