// public/index.js

import initializeDate from "./js_modules/common/dateModule.js";
import dataInit, { estimateData } from "./js_modules/common/data.js";
import settingsInit, { modalBody } from "./js_modules/settings/settings.js";
import menuInit from "./js_modules/components/Menu.js";
import { createMainAccordion } from "./js_modules/components/accordion/MainAccordion.js";
import createToast from "./js_modules/components/toast.js";

// 페이지 로드 시 데이터 함수, 초기화 함수 호출
window.onload = function () {
  dataInit();
  initialize();

  const data = {};

  const entries1 = document.querySelectorAll('.modal-body .card');
  entries1.forEach((entry1, index) => {
    // console.log(entry1.textContent);
    const entry1data = entry1.textContent.trim();
    data[entry1data] = {};

    const entries2 = entry1.querySelectorAll('.accordion .accordion-item');
    entries2.forEach((entry2) => {
      // console.log(entry2);
      const entries2KeyE = entry2.querySelector('h2 > button > input');
      // console.log(entries2KeyE.value);
      const entries2Key = entries2KeyE.value;
      data[entry1data][entries2Key] = {};
      const entries2ValueGroup = entry2.querySelectorAll('.input-group');
      // console.log(entries2ValueGroup);
      entries2ValueGroup.forEach((NL) => {
        const inputs = NL.querySelectorAll('.form-control');
        // console.log(inputs);
        const key = inputs[0].value ? inputs[0].value : "";
        let value;
        // console.log('key: ', inputs[0].value);
        // console.log('value: ', inputs[1]);
        if (inputs[1].value) {
          // console.log('value: ', inputs[1].value);
          value = inputs[1].value
        } else if (inputs[1].tagName === "DIV") {
          const switchInput = inputs[1].querySelector('div > input');
          // console.log(switchInput.checked);
          value = switchInput.checked;
        } else {
          // console.log(inputs[1].placeholder);
          value = inputs[1].placeholder;
        }

        data[entry1data][entries2Key][key] = value;
        // console.log('---');
      })
      // const inputs = entries2ValueGroup.querySelectorAll('.form-control');
      // inputs.forEach((input) => {
      //   console.log(input);
      //   console.log('---');
      // });

      // entries2ValueE.forEach((input) => {
      //   if (input.id === "key") {
      //     if (input.value) {
      //       data[entry1data][entries2Key][input.value] = "";
      //     } else {
      //       data[entry1data][entries2Key][""] = "";
      //     }
      //   }
      //   if (input.id === "value") {

      //   }

      //   if (input.value) {
      //     console.log(input.value);
      //   } else if (input.tagName === "DIV") {
      //     const switchInput = input.querySelector('div > input');
      //     console.log(switchInput.checked);
      //   } else {
      //     console.log(input.placeholder);
      //   }

      // });
      // const entry2data = entry2.value;
      // if (entry2data) {
      //   data[entry1data][entry2data] = {};
      // } else {
      //   data[entry1data]["wer"] = {};
      // }

    })
  });


  // const entry1 = document.querySelectorAll('.modal-body .card-header');
  // entry1.forEach((e) => {
  //   console.log(e.textContent);
  //   data[e.textContent] = "";

  //   const entry2 = document.querySelectorAll('.card-body .accordion > div > h2 > button > input');
  //   entry2.forEach((e) => {
  //     console.log(e.placeholder);
  //     data[e.textContent] = e.placeholder;
  //   });
  // });

  // const switchKey = document.querySelectorAll();
  console.log(data);
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

      }
    }
  }
}