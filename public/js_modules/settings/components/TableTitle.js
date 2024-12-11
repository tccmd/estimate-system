export default function createTableTitle() {

  // 1. input-group 생성
  const inputGroup = document.createElement("div");
  inputGroup.classList.add("input-group", "mb-3"); // 추가 여백을 위한 mb-3
  inputGroup.id = "title"

  // 2. 옵션 제목 input 생성
  const input1 = document.createElement("input");
  input1.classList.add("form-control");
  input1.value = tableTitle[0]; // 제목 설정 1
  input1.disabled = true;

  // 3. 가격 제목 input 생성
  const input2 = document.createElement("input");
  input2.classList.add("form-control");
  input2.value = tableTitle[0]; // 제목 설정 2
  input2.disabled = true;

  // 4. 요소 조립
  inputGroup.appendChild(input1);
  inputGroup.appendChild(input2);

  // 5. input-group을 modalBody에 추가
  modalBody.appendChild(inputGroup);
}