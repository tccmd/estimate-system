import { updateTotal } from "../../common/priceUtils.js";

// 아코디언의 tbody 내부의 thead, tr[0] 행을 제외한 모든 행을 삭제하는 함수
export function clearAccordionTable(tbody, accordionId) {
  // 아코디언 내의 tbody 요소를 찾기
  // const tbody = document.querySelector(
  //   `#${accordionId} .accordion-body table tbody`
  // );

  if (!tbody) {
    console.error(`tbody not found for accordion with id: ${accordionId}`);
    return;
  }

  // tbody 내의 모든 행을 가져오기
  const rows = Array.from(tbody.rows);

  // 첫 번째 행(인덱스 0)과 thead는 제외하고 삭제
  for (let i = 1; i < rows.length; i++) {
    tbody.deleteRow(1); // 항상 첫 번째 행을 삭제
  }

  updateTotal();
}

// 아코디언을 지우는 함수
export function removeAccordion(accordionId) {
  // 아코디언의 부모 요소를 찾습니다
  const accordionElement = document.getElementById(accordionId);

  // 아코디언 요소가 존재하는지 확인
  if (accordionElement) {
    // 부모 요소에서 해당 아코디언 요소를 삭제
    accordionElement.parentElement.removeChild(accordionElement);
    updateTotal();
    console.log(`${accordionId}가 삭제되었습니다.`);
  } else {
    console.error(`ID가 ${accordionId}인 아코디언을 찾을 수 없습니다.`);
  }
}