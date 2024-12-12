import { minusButtonSVG } from "../..//components/SVGs.js";
import collectInputData from "../data/collectInputData.js";
import createSwitch from "./Switch.js";

export default function createIptGroup(key, value, entry2) {
  // console.log(`    3. Key: ${key} : ${value3}`);
  // 1. input-group 생성
  const inputGroup = document.createElement("div");
  inputGroup.classList.add("input-group", "mb-3"); // 추가 여백을 위한 mb-3

  // 2. 옵션 input 생성
  const input1 = document.createElement("input");
  input1.classList.add("form-control");
  input1.id = "key";
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
    // } else if (Object.keys(estimateDatainit.packageInit).some(k => key.includes(k))) {
    // key가 estimateDatainit.packageInit의 키 중 하나를 포함하는지 확인
  } else if (key === "묶음 옵션들") {
    input2 = createAutoComleteInpt();
  } else {
    input2 = document.createElement("input");
    input2.classList.add("form-control");
    input2.value = key === "할인율" ? `${value}%` : value; // 가격 값 설정
  }
  input2.id = "value";
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


var suggestions = [
  'JavaScript',
  'Java',
  'Python',
  'HTML',
  'CSS',
  'React',
  'Vue',
  'Node.js',
  'Bootstrap',
  'Sass',
  'TypeScript',
  'Angular'
];

export function OutoCompletIpt() {

}

export function createAutoComleteInpt() {
  // input 생성
  const searchContainer = document.createElement('div');
  searchContainer.id = 'search-container';
  const searchInput = document.createElement('input');
  searchInput.type = 'text';
  searchInput.classList.add('form-control');
  searchInput.placeholder = '검색어를 입력하세요';
  searchContainer.appendChild(searchInput);

  // 포커스가 있을 때
  searchInput.addEventListener('focus', () => {
    console.log('Input has focus');
    // 여기에 포커스가 있을 때 실행할 조건을 넣으면 됩니다.
    var data = collectInputData();
    console.log(data)
  });


  // 자동완성 기능
  searchInput.addEventListener('input', function () {
    const query = this.value.toLowerCase();
    closeSuggestions(); // 기존 추천 검색어 목록을 닫습니다.

    if (!query) return; // 입력이 없으면 추천 검색어를 표시하지 않습니다.

    const filteredSuggestions = suggestions.filter(item =>
      item.toLowerCase().includes(query)
    );

    if (filteredSuggestions.length === 0) return; // 결과가 없으면 종료

    // 추천 검색어 목록을 만듭니다.
    const suggestionList = document.createElement('div');
    suggestionList.classList.add('autocomplete-items');
    suggestionList.style.position = 'absolute';
    suggestionList.style.border = '1px solid #d4d4d4';
    suggestionList.style.maxHeight = '200px';
    suggestionList.style.overflowY = 'auto';
    suggestionList.style.backgroundColor = 'white';
    suggestionList.style.zIndex = '99';

    filteredSuggestions.forEach(item => {
      const div = document.createElement('div');
      div.innerHTML = item;
      div.style.padding = '10px';
      div.style.cursor = 'pointer';
      div.addEventListener('click', () => {
        searchInput.value = item; // 선택한 검색어를 입력창에 채웁니다.
        closeSuggestions(); // 추천 목록을 닫습니다.
      });
      suggestionList.appendChild(div);
    });

    searchContainer.appendChild(suggestionList); // 추천 검색어를 표시합니다.
  });

  return searchContainer;
}

function closeSuggestions() {
  const items = document.querySelector('.autocomplete-items');
  if (items) {
    items.parentNode.removeChild(items);
  }
}