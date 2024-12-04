// public/index.js
import { initializeDate } from "./js_modules/dateModule.js";
import { fetchOptionsData } from "./js_modules/data.js";
import { createAccordionAsync } from "./js_modules/accordion.js";
import { initializeScreenshot } from "./js_modules/screenshot.js";
import { options1, options2 } from "./js_modules/data.js";
import { selectRequiredOptionsOnce } from "./js_modules/row.js";
import settingsInit from "./js_modules/settings.js";

// 페이지 로드 시 초기화 함수 호출
window.onload = function () {
  // fetchOptionsData();
  initialize();
};

// 초기화 함수
async function initialize() {
  try {
    // 현재 날짜 초기화
    initializeDate();

    // 데이터 로드 및 설정
    // await fetchOptionsData().then(() => {
    // 스크린샷
    // initializeScreenshot();
    // 아코디언1 생성 후 필수 옵션 모두 선택
    createAccordionAsync("Accordion1", "필수 사항", options1).then(() => {
      selectRequiredOptionsOnce("Accordion1")
    }); // 아코디언 생성 후 옵션 모두 선택
    createAccordionAsync("Accordion2", "선택 사항", options2);

    // 설정
    settingsInit();
    // });
  } catch (error) {
    console.error("Error during initialization:", error);
  }
}
