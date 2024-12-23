// public/index.js

import initializeDate from "./js_modules/common/dateModule.js";
import dataInit, { estimateData } from "./js_modules/common/data.js";
import settingsInit from "./js_modules/settings/settings.js";
import menuInit from "./js_modules/components/Menu.js";
import createMainAccordion from "./js_modules/components/accordion/MainAccordion.js";
import selectRequiredOptionsOnce from "./js_modules/components/accordion/selectRequiredOptionsOnce.js";
import createToast from "./js_modules/components/Toast.js";
import screenshot from "./js_modules/screenShot/screenShot.js";

// 페이지 로드 시 데이터 함수, 초기화 함수 호출
window.onload = function () {
  dataInit().then(() => {
    initialize();
  });
};

// 초기화 함수
async function initialize() {
  // 현재 날짜 초기화
  initializeDate();

  // 메뉴 버튼 초기화
  menuInit();
  // 설정 화면 초기화
  settingsInit();
  // 토스트 초기화
  createToast();
  // 아코디언
  // 1. 중첩 데이터 반복문
  for (const [entry1, value1] of Object.entries(estimateData)) {
    // 2. 데이터 로그
    // console.log(`1. entry: ${entry1} : ${value1}`);

    // 2. 중첩 데이터 반복문
    for (const [entry2, value2] of Object.entries(value1)) {
      // 3. 데이터 로그
      // console.log(`  2. entry2: ${entry2} : ${value2}`);
      if (entry1 !== "packages") createMainAccordion(entry1, entry2, value2);

      // 3. 옵션 생성
      for (const [key, value] of Object.entries(value2)) {
        if (value === true) {
          selectRequiredOptionsOnce(entry2);
        }
      }
    }
  }

  // 툴팁 활성화
  const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
  const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
}