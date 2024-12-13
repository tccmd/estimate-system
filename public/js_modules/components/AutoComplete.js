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

export function createAutoComleteIpt() {

  let currentFocus = -1;

  const searchContainer = document.createElement('div');
  searchContainer.style.position = 'relative';

  const searchInput = document.createElement('input');
  searchInput.classList.add('form-control');
  searchInput.placeholder = '검색어를 입력하세요';
  searchContainer.appendChild(searchInput);

  // 입력 이벤트
  searchInput.addEventListener('input', function () {
    const query = this.value.toLowerCase();
    closeSuggestions(); // 기존 추천 검색어 목록 닫기

    const filteredSuggestions = suggestions.filter(item =>
      item.toLowerCase().includes(query)
    );

    if (filteredSuggestions.length > 0) {
      showSuggestions(filteredSuggestions);
    }
  });

  // 클릭으로 전체 추천 목록 표시
  searchInput.addEventListener('focus', function () {
    if (searchInput.value.trim() === '') {
      showSuggestions(suggestions);
    }
  });

  // 블러로 추천 목록 닫기
  searchInput.addEventListener('blur', function () {
    setTimeout(() => closeSuggestions(), 100); // 클릭 처리 후 닫기
  });

  // 추천 목록 표시 함수
  function showSuggestions(items) {
    const suggestionList = document.createElement('ul');
    suggestionList.classList.add('list-group', 'autocomplete-items', 'border');
    suggestionList.style.position = 'absolute'; // 다른 요소 위에 표시
    suggestionList.style.top = `${searchInput.offsetHeight}px`; // 입력 필드 바로 아래
    suggestionList.style.left = '0';
    suggestionList.style.right = '0';
    suggestionList.style.zIndex = '1000'; // 높은 z-index
    suggestionList.style.maxHeight = `${(searchInput.offsetHeight * 3)}px`; // 최대 높이
    suggestionList.style.overflowY = 'auto'; // 스크롤 가능

    items.forEach(item => {
      const div = document.createElement('li');
      div.classList.add('list-group-item');
      div.innerHTML = item;

      div.addEventListener('click', () => {
        searchInput.value = item; // 선택한 검색어를 입력창에 채움
        closeSuggestions(); // 추천 목록 닫음
      });

      suggestionList.appendChild(div);
    });

    searchContainer.appendChild(suggestionList); // 추천 목록 표시
  }

  // 추천 목록 닫기
  function closeSuggestions() {
    const items = document.querySelector('.autocomplete-items');
    if (items) {
      items.parentNode.removeChild(items);
    }
    currentFocus = -1;
  }

  // 키보드 내비게이션
  searchInput.addEventListener('keydown', function (e) {
    const suggestionList = document.querySelector('.autocomplete-items');
    if (!suggestionList) return;

    const items = suggestionList.querySelectorAll('li');
    if (e.key === 'ArrowDown') {
      currentFocus++;
      if (currentFocus >= items.length) currentFocus = 0;
      addActive(items);
    } else if (e.key === 'ArrowUp') {
      currentFocus--;
      if (currentFocus < 0) currentFocus = items.length - 1;
      addActive(items);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (currentFocus > -1 && items[currentFocus]) {
        items[currentFocus].click();
      }
    }
  });

  function addActive(items) {
    removeActive(items);
    if (currentFocus >= 0 && items[currentFocus]) {
      items[currentFocus].classList.add('active');
      items[currentFocus].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  }

  function removeActive(items) {
    items.forEach(item => item.classList.remove('active'));
  }

  return searchContainer;
}