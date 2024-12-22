import screenshot from "../screenShot/screenShot.js";
import createButton from "../settings/components/Btn.js";
import { imageButtonSVG, menuButtonSVG, settingButtonSVG } from "./SVGs.js";

export default function menuInit() {

  // UI 균형을 위한 요소 추가
  addElementToHeader();

  // 드롭다운 아이콘 버튼 추가
  addDropdownToHeader();
}

// UI 균형을 위한 요소 추가
function addElementToHeader() {
  const someElement = document.createElement('div');
  someElement.style.width = '48px';
  someElement.style.height = '38px';
  someElement.style.flexShrink = '0'; // 크기 고정

  const headerBody = document.getElementById('header-body');
  headerBody.insertBefore(someElement, headerBody.querySelector('h3'));
}

// 드롭다운 아이콘 버튼 추가
function addDropdownToHeader() {
  const dropdownE = document.createElement('div');
  dropdownE.classList.add('dropdown');

  const menuButton = createButton(menuButtonSVG, () => { });
  menuButton.setAttribute('data-bs-toggle', "dropdown");
  menuButton.setAttribute('aria-expanded', "false");
  menuButton.classList.add('text-bg-dark', 'border-0');

  const ulE = document.createElement('ul');
  ulE.classList.add('dropdown-menu');

  const list = {
    setting: {
      svg: settingButtonSVG,
      text: '설정',
      id: "settings-button",
      "data-bs-toggle": "modal",
      "data-bs-target": "#staticBackdrop",
    },
    screenshot: {
      svg: imageButtonSVG,
      text: '이미지로 저장',
      id: "screenshot-button"
    },
  }

  const dropdownHeader = document.createElement('li');
  const h6E = document.createElement('h6');
  h6E.classList.add('dropdown-header');
  h6E.textContent = '견적서 메뉴';
  dropdownHeader.appendChild(h6E);
  ulE.appendChild(dropdownHeader);

  // list 반복
  Object.entries(list).forEach(([key, value]) => {

    const liE = document.createElement('li');
    const aE = document.createElement('a');
    aE.classList.add('dropdown-item');
    aE.href = '#';
    if (value.id) {
      aE.id = value.id;
    }
    if (value["data-bs-target"] && value["data-bs-toggle"]) {
      aE.setAttribute('data-bs-target', value["data-bs-target"]);
      aE.setAttribute('data-bs-toggle', value["data-bs-toggle"]);
    }

    aE.onclick = () => {
      if (key === "screenshot") {
        screenshot();
      }
    };
    liE.appendChild(aE);

    // 아이콘(SVG) 추가
    if (value.svg) {
      const icon = document.createElement('span'); // 아이콘을 담을 컨테이너
      icon.innerHTML = value.svg; // SVG를 추가
      icon.classList.add('pe-3')
      aE.appendChild(icon);
    }

    // 텍스트 추가
    const textNode = document.createTextNode(value.text); // 텍스트 노드 생성
    aE.appendChild(textNode);

    // li를 ul에 추가
    ulE.appendChild(liE);

    if (key === 'setting') {
      const divider = document.createElement('li');
      const hrE = document.createElement('hr');
      hrE.classList.add('dropdown-divider')
      divider.appendChild(hrE);
      ulE.appendChild(divider);
    }
  });

  dropdownE.appendChild(menuButton);
  dropdownE.appendChild(ulE);
  document.getElementById('header-body').appendChild(dropdownE);
}