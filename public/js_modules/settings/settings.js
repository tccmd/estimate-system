// public/js_modules/settings.js

import { estimateData } from "../common/data.js";
import { showToast } from "../components/Toast.js";
import createCategory from "./components/Category.js";
import createEnty1s from "./components/Entry1.js";
import createIptGroup from "./components/IptGroup.js";
import updateServerData from "./data/updateServerData.js";

// 모달 바디
export const modalBody = document.getElementById("settings-modal-body");

// settings 초기화
export default function settingsInit() {
  settingsModalBody();
}

// 모달 바디 UI 셋팅
function settingsModalBody() {

  console.log("estimateData:", estimateData);

  if (!estimateData || typeof estimateData !== "object") {
    console.error("Invalid estimateData: data is null or undefined");
    return;
  }

  // 1. 데이터 로그
  // console.log(estimateData);
  // 1. 중첩 데이터 반복문
  for (const [entry1, value1] of Object.entries(estimateData)) {

    // 2. 데이터 로그
    // console.log(`1. entry: ${entry1} : ${value1}`);
    // 2. entry1 엘리먼트 생성 - 카드
    const entry1Card = createEnty1s(entry1, value1);

    // 2. 중첩 데이터 반복문
    for (const [entry2, value2] of Object.entries(value1)) {

      // 3. 데이터 로그
      // console.log(`  2. entry2: ${entry2} : ${value2}`);
      const [category, accordionBody] = createCategory(entry2, entry1);
      entry1Card.appendChild(category);
      // 3. 옵션 생성
      for (const [key, value] of Object.entries(value2)) {

        // input-group을 modalBody에 추가
        accordionBody.appendChild(createIptGroup(key, value, entry2, entry1));

      }
    }
  }

  // submit()
  const settingsSubmitButton = document.getElementById('settings-submit-button');
  settingsSubmitButton.addEventListener('click', () => {
    updateServerData().then((res) => {
      console.log("res", res.status)
      if (res.status === 200) {
        // Toast 메시지 표시
        showToast({
          message2: "저장되었습니다. 곧 새로고침 됩니다.",
        });

        // Bootstrap 모달 닫기
        const modalElement = document.getElementById('staticBackdrop');
        const modalInstance = bootstrap.Modal.getInstance(modalElement);

        if (modalInstance) {
          modalInstance.hide(); // 모달 닫기
        }
      }
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    });
  });
}