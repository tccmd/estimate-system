import { minusButtonSVG } from "../..//components/SVGs.js";
import createSwitch from "./Switch.js";

export default function createIptGroup(key, value, entry2) {
  // console.log(`    3. Key: ${key} : ${value3}`);
  // 1. input-group 생성
  const inputGroup = document.createElement("div");
  inputGroup.classList.add("input-group", "mb-3"); // 추가 여백을 위한 mb-3

  // 2. 옵션 input 생성
  const input1 = document.createElement("input");
  input1.classList.add("form-control");
  input1.id = key;
  if (key === "required") {
    input1.value = "필수 카테고리 여부"; // required 옵션 값 설정
  }
  // else if (key === "packageArray") {
  //   input1.value = "묶음 옵션들"
  // } else if (key === "discount") {
  //   input1.value = "할인율"
  // }
  else {
    input1.value = key; // 옵션 값 설정
  }

  // 삭제 버튼 생성
  const deleteButton = document.createElement("button");
  deleteButton.classList.add("btn"); //, "btn-outline-secondary"); // 아이콘 클래스 추가

  // SVG 코드
  deleteButton.innerHTML = minusButtonSVG;
  // 삭제 버튼 클릭 시 해당 input과 버튼을 삭제
  deleteButton.addEventListener("click", () => {
    inputGroup.remove(); // inputGroup(옵션 및 버튼) 삭제
  });

  // 3. 가격 input 생성
  let input2;
  if (key === "required") {
    input2 = document.createElement("div");
    input2.classList.add("form-control");
    input2.value = "";
    input2.appendChild(createSwitch(`${entry2}SwitchId`, value));
  } else {
    input2 = document.createElement("input");
    input2.classList.add("form-control");
    input2.value = key === "할인율" ? `${value}%` : value; // 가격 값 설정
  }
  // input2.type = "number"; // 숫자 입력만 허용

  input2.addEventListener('input', function () {
    if (key === "할인율") {
      const cursorPosition = input2.selectionStart; // 현재 커서 위치 저장
      const valueWithoutPercent = input2.value.replace('%', ''); // % 제거된 값
      input2.value = valueWithoutPercent + '%'; // 항상 % 추가

      // 커서를 % 앞에 유지
      input2.setSelectionRange(cursorPosition, cursorPosition);
    }
  });

  // 4. 요소 조립
  inputGroup.appendChild(input1);
  inputGroup.appendChild(input2);
  inputGroup.appendChild(deleteButton);

  return inputGroup;
}