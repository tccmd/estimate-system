import { estimateData } from "../../common/data.js";
import { numberWithCommas, updateTotal } from "../../common/priceUtils.js";
import createMainAccordion from "./MainAccordion.js";

export default function observeAccordionRows(entry1, entry2, parentDiv) {

  // for (const packageKey in estimateData.packages) {
  //   const packageData = estimateData.packages[packageKey];
  //   console.log(`Package Name: ${packageKey}`);
  //   console.log(`묶음 옵션들: ${packageData["묶음 옵션들"]}`);
  //   console.log(`할인율: ${packageData["할인율"]}`);
  //   console.log(`가격: ${packageData["가격"]}`);
  // }

  // 아코디언의 tbody 요소를 가져옵니다
  const accordionElement = document.getElementById(accordionId);
  if (!accordionElement) {
    console.error("Accordion element not found:", accordionId);
    return;
  }

  const tbody = accordionElement.querySelector("tbody");
  if (!tbody) {
    console.error("Tbody element not found in accordion:", accordionId);
    return;
  }

  // MutationObserver 콜백 함수
  const callback = (mutationsList) => {
    mutationsList.forEach((mutation) => {
      if (mutation.type === "childList") {
        handleAddedRows(mutation);
        handleRemovedRows(mutation);
        updateTotal();
      }
    });
  };

  // 행이 추가되었을 때 처리하는 함수
  function handleAddedRows(mutation) {
    if (mutation.addedNodes.length > 0) {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeName === "TR" && !node.hasAttribute("data-moved")) {
          processAddedRow(node);
        }
      });
    }
  }

  // 추가된 행을 처리하는 함수
  function processAddedRow(node) {
    const rowData = getRowData(node);
    console.log(`${accordionId}에 새로운 행이 추가되었습니다:`, rowData[0]);

    const allRows = tbody.querySelectorAll("tr");
    const firstCellValues = getFirstCellValues(allRows);
    // 디버깅 로그
    console.log(
      `아코디언: ${accordionId}, 첫 번째 셀 값들 (첫 행 제외):`,
      firstCellValues
    );

    // 패키지 처리
    processPackages(allRows);
  }

  // 패키지 처리 함수
  function processPackages(allRows) {
    let packageMatchCounts = calculatePackageMatches(allRows);

    // 일치하는 행의 개수 기준으로 패키지 정렬 (내림차순)
    packageMatchCounts.sort(
      (a, b) => b.matchingRows.length - a.matchingRows.length
    );

    // 패키지 처리 (가장 많이 일치하는 패키지부터 시작)
    for (let i = 0; i < packageMatchCounts.length; i++) {
      const bestMatchPackage = packageMatchCounts[i];
      if (bestMatchPackage.matchingRows.length > 0) {
        console.log(
          `${accordionId}에 ${bestMatchPackage.packageData}이 가장 많이 포함된 행이 있습니다.`
        );
        const newAccordionTbody = createMainAccordion(
          "packages",
          bestMatchPackage.key,
          {}
        );

        moveRowsToNewAccordion(
          bestMatchPackage.matchingRows,
          newAccordionTbody,
          bestMatchPackage.packageData["할인율"]
        );

        removeInvalidAccordions(); // 패키지가 성립되지 않는 아코디언 삭제

        // 아코디언이 하나 생성되면 패키지 처리를 중단
        break;
      }
    }
  }

  // 패키지와 일치하는 행의 개수를 계산하는 함수
  function calculatePackageMatches(allRows) {
    return Object.entries(estimateData.packages).map(([key, packageData]) => {
      const matchingRows = Array.from(allRows).filter((row) => {
        const firstCellValue = getFirstCellValue(row);
        return packageData["묶음 옵션들"].includes(firstCellValue);
      });
      return { key, packageData, matchingRows };
    });
  }

  // 행이 삭제되었을 때 처리하는 함수
  function handleRemovedRows(mutation) {
    if (mutation.removedNodes.length > 0) {
      mutation.removedNodes.forEach((node) => {
        if (node.nodeName === "TR") {
          console.log("행이 삭제되었습니다:", node);
          processRemovedRow(node);
        }
      });
    }
  }

  // 삭제된 행을 처리하는 함수
  function processRemovedRow(node) {
    const rowData = getRowData(node);
    console.log(`${accordionId}에서 행이 삭제되었습니다:`, rowData[0]);

    // 삭제된 행에 맞는 패키지 처리
    const allRows = tbody.querySelectorAll("tr");
    const firstCellValues = getFirstCellValues(allRows);
    processPackages(allRows);
    removeInvalidAccordions(); // 삭제 후 성립되지 않는 아코디언 삭제
  }

  // 아코디언 삭제 함수
  function removeInvalidAccordions() {
    // 모든 아코디언 요소를 선택
    const allAccordions = document.querySelectorAll(".accordion-item");

    allAccordions.forEach((accordion) => {
      const tbody = accordion.querySelector("tbody");

      if (tbody && tbody.children.length > 0) {
        const firstCellValues = Array.from(tbody.children).map(
          (row) => row.children[0].innerText.trim()
        );

        // 패키지 배열 가져오기
        const currentPackageKey = Object.keys(estimateData.packages).find(
          (pkg) => pkg === accordion.id
        );

        if (currentPackageKey) {
          const currentPackageData = estimateData.packages[currentPackageKey];

          // 패키지 포함 여부 확인
          const isValid = isPackageIncluded(
            firstCellValues,
            currentPackageData["묶음 옵션들"]
          );

          if (!isValid) {
            console.log(
              `패키지가 성립되지 않는 아코디언을 삭제합니다: ${accordion.id}`
            );
            if (entry1 !== "categories") accordion.remove();
          }
        } else {
          console.warn(`패키지 데이터를 찾을 수 없습니다: ${accordion.id}`);
          accordion.remove(); // 데이터가 없으면 삭제
        }
      } else {
        console.log(`아코디언 ${accordion.id}의 tbody가 비어 있습니다. 삭제 처리.`);
        accordion.remove();
      }
    });
  }

  // 행의 데이터를 가져오는 함수
  function getRowData(row) {
    const cells = row.querySelectorAll("td");
    return Array.from(cells).map((cell) => cell.textContent.trim());
  }

  // 모든 행의 첫 번째 셀 값을 가져오는 함수
  function getFirstCellValues(rows) {
    return Array.from(rows)
      .slice(1)
      .map((row) => getFirstCellValue(row));
  }

  // 특정 행의 첫 번째 셀 값을 가져오는 함수
  function getFirstCellValue(row) {
    const firstCell = row.querySelector("td");
    return firstCell ? firstCell.textContent.trim() : "";
  }

  // MutationObserver 설정
  const observer = new MutationObserver(callback);
  observer.observe(tbody, { childList: true });

  console.log("Accordion row observation started for:", accordionId);
}

// 패키지 확인 함수
function isPackageIncluded(firstCellValues, packageArray) {
  return packageArray.every((option) => firstCellValues.includes(option));
}

// 행을 새 아코디언으로 이동시키는 함수
function moveRowsToNewAccordion(selectedRows, newAccordionTbody, discountRate) {
  console.log("moveRowsToNewAccordion 실행됨", selectedRows);
  selectedRows.forEach((row) => {
    row.setAttribute("data-moved", "true");
    applyDiscount(row, discountRate);
    newAccordionTbody.appendChild(row);
  });
}

// 할인율을 적용하는 함수
function applyDiscount(row, discountRate) {
  const originalValue =
    parseFloat(row.cells[2].textContent.replace(/,/g, "")) || 0;
  const discountedValue = originalValue * (1 - discountRate * 0.01);
  row.cells[3].textContent = numberWithCommas(discountedValue);
}
