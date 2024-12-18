import collectInputData from "../settings/data/collectInputData.js";

// 추천 검색어 목록
var SUGGESTIONS = [
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
let currentFocus = -1;

// 자동완성 입력창을 생성하는 메인 함수
export function createAutocompleteInput() {

  const container = createSearchContainer();
  const inputField = createInputField();
  container.appendChild(inputField);

  inputField.addEventListener('input', handleInputEvent);
  inputField.addEventListener('focus', handleFocusEvent);
  inputField.addEventListener('blur', handleBlurEvent);
  inputField.addEventListener('keydown', handleKeyboardNavigation);

  function handleInputEvent() {
    var query = this.value.toLowerCase().trim();

    // 마지막 콤마 이후의 문자열만 추출
    const lastCommaIndex = query.lastIndexOf(','); // 마지막 콤마 위치
    if (lastCommaIndex !== -1) {
      query = query.slice(lastCommaIndex + 1).trim(); // 콤마 이후의 문자열로 query 설정
    }
    // console.log("Processed query:", query);

    closeSuggestionList();

    const filteredSuggestions = SUGGESTIONS.filter(item =>
      item.toLowerCase().includes(query)
    );

    if (filteredSuggestions.length > 0) {
      renderSuggestionList(filteredSuggestions);
    }
  }

  function handleFocusEvent() {
    SUGGESTIONS = collectInputData()[1];
    if (inputField.value.trim() === '') {
      renderSuggestionList(SUGGESTIONS);
    }
  }

  function handleBlurEvent() {
    setTimeout(closeSuggestionList, 100); // 약간의 지연 후 닫기
  }

  function renderSuggestionList(items) {
    const suggestionList = createSuggestionList(items);
    container.appendChild(suggestionList);
  }

  function handleKeyboardNavigation(e) {
    const suggestionList = document.querySelector('.autocomplete-suggestions');
    if (!suggestionList) return;

    const items = suggestionList.querySelectorAll('li');
    if (e.key === 'ArrowDown') {
      e.preventDefault(); // 기본 동작 방지
      currentFocus = (currentFocus + 1) % items.length;
      updateActiveSuggestion(items);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault(); // 기본 동작 방지
      currentFocus = (currentFocus - 1 + items.length) % items.length;
      updateActiveSuggestion(items);
    } else if (e.key === 'Enter') {
      e.preventDefault(); // 기본 동작 방지 (포커스된 항목 선택)
      if (currentFocus >= 0 && items[currentFocus]) {
        items[currentFocus].click();
      }
    }
  }

  return [container, inputField];
}

// 유틸리티 함수
function createSearchContainer() {
  const container = document.createElement('div');
  container.classList.add('form-control')
  container.style.position = 'relative';
  return container;
}

function createInputField() {
  const input = document.createElement('input');
  input.classList.add('form-control');
  input.placeholder = '검색어를 입력하세요';
  return input;
}

function createSuggestionList(items) {
  const suggestionList = document.createElement('ul');
  suggestionList.classList.add('list-group', 'autocomplete-suggestions', 'border');
  suggestionList.style.position = 'absolute';
  suggestionList.style.top = `${document.querySelector('input').offsetHeight}px`;
  suggestionList.style.left = '0';
  suggestionList.style.right = '0';
  suggestionList.style.zIndex = '1000';
  suggestionList.style.maxHeight = `${document.querySelector('input').offsetHeight * 3}px`;
  suggestionList.style.overflowY = 'auto';

  items.forEach(item => {
    const listItem = createSuggestionItem(item);
    suggestionList.appendChild(listItem);
  });

  return suggestionList;
}

function createSuggestionItem(item) {
  const listItem = document.createElement('li');
  listItem.classList.add('list-group-item');
  listItem.textContent = item;
  listItem.addEventListener('click', () => {
    addInputValue(item);
    // closeSuggestionList();
  });
  return listItem;
}

function addInputValue(value) {
  const input = event.target.closest('.form-control').querySelector('input');
  let inputValue = input.value.trim();

  // console.log("Original input value:", inputValue);

  // 마지막 콤마 위치를 찾고, 콤마 이전 값만 남기기
  const lastCommaIndex = inputValue.lastIndexOf(',');
  if (lastCommaIndex !== -1) {
    inputValue = inputValue.slice(0, lastCommaIndex).trim(); // 마지막 콤마 포함 이전 부분
  } else {
    inputValue = ''; // 콤마가 없으면 전체 제거
  }

  // console.log("Processed input value:", inputValue);

  // 새로운 값을 추가 (기존 값이 없으면 쉼표 없이 추가)
  input.value = inputValue
    ? `${inputValue}, ${value}`.trim()  // 기존 값 뒤에 추가
    : value;                          // 기존 값이 없으면 그대로 추가
}


function closeSuggestionList() {
  const suggestionList = document.querySelector('.autocomplete-suggestions');
  if (suggestionList) {
    suggestionList.parentNode.removeChild(suggestionList);
  }
}

function updateActiveSuggestion(items) {
  clearActiveSuggestions(items);
  if (items[currentFocus]) {
    items[currentFocus].classList.add('active');
    items[currentFocus].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}

function clearActiveSuggestions(items) {
  items.forEach(item => item.classList.remove('active'));
}
