import { createAllSelectBtn, createClearBtn } from "./accBtns.js";
import create1stRow from "./create1stRow.js";
import createAccordion from "./createAccordion.js";
import createTable from "./createTable.js";

export function createMainAccordion(entry1, entry2, value2) {

  // 아코디언 생성
  var [parentDiv, bodyDiv] = createAccordion(entry2);

  // 테이블 생성
  var [table, tbody] = createTable();

  // 첫 번째 행 생성
  var row = create1stRow(entry2, value2);

  // 테이블에 첫 번째 행 추가
  tbody.appendChild(row);
  table.appendChild(tbody);

  // "모두 추가" 버튼 생성
  var selectButton = createAllSelectBtn(entry2);

  // "행 모두 지우기" 버튼 생성
  var clearButton = createClearBtn(tbody, entry1, entry2);

  // 버튼과 테이블을 아코디언 내용 부분에 추가
  bodyDiv.appendChild(table);
  if (entry1 !== "packages") {
    bodyDiv.appendChild(selectButton);
    bodyDiv.appendChild(clearButton);
  }

  // accordion div를 찾는다
  var accordionDiv = document.getElementById("accordionPanels");
  accordionDiv.appendChild(parentDiv);

  return tbody;
}