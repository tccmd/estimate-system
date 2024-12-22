import { estimateData } from "../../common/data.js";
import { numberWithCommas, updateTotal } from "../../common/priceUtils.js";
import createMainAccordion from "./MainAccordion.js";

export default function observeAccordionRows(entry1, entry2, parentDiv, tbody) {
  const observer = new MutationObserver((mutationsList) => {
    mutationsList.forEach((mutation) => {
      if (mutation.type === "childList") {
        handleAddedRows(mutation);
        handleRemovedRows(mutation);
        updateTotal();
      }
    });
  });

  observer.observe(tbody, { childList: true });
  console.log("Accordion row observation started for:", entry2);

  function handleAddedRows(mutation) {
    mutation.addedNodes.forEach((node) => {
      if (node.nodeName === "TR" && !node.hasAttribute("data-moved")) {
        // console.log('행 추가');
        processAddedRow(node);
      }
    });
  }

  function processAddedRow(node) {
    // console.log(`${entry2}에 새로운 행이 추가되었습니다:`, node);

    const rowData = getRowData(node);
    console.log(`${entry2}에 새로운 행이 추가되었습니다:`, rowData[0]);

    const allRows = tbody.querySelectorAll("tr");

    // const firstCellValues = getFirstCellValues(allRows);
    // console.log(`아코디언: ${entry2}, 첫 번째 셀 값들:`, firstCellValues);

    processPackages(allRows);
  }

  function processPackages(allRows) {
    const packageMatchCounts = calculatePackageMatches(allRows);

    packageMatchCounts.sort(
      (a, b) => b.matchingRows.length - a.matchingRows.length
    );

    // console.log("packageMatchCounts", packageMatchCounts);

    for (const bestMatchPackage of packageMatchCounts) {
      if (bestMatchPackage.matchingRows.length >= bestMatchPackage.packageData["묶음 옵션들"].length) {
        // console.log("bestMatchPackage", bestMatchPackage);
        console.log(
          `${entry2}에 ${JSON.stringify(bestMatchPackage.packageData["묶음 옵션들"])}이 가장 많이 포함된 행이 있습니다. ${bestMatchPackage.key}`
        );

        const newAccordionTbody = createMainAccordion(
          "packages",
          bestMatchPackage.key,
          {}
        )[1];

        moveRowsToNewAccordion(
          bestMatchPackage.matchingRows,
          newAccordionTbody,
          bestMatchPackage.packageData["할인율"].replace(/\D/g, '') // 숫자가 아닌 문자를 모두 제거
        );

        removeInvalidAccordions();
        break;
      }
    }
  }

  function calculatePackageMatches(allRows) {
    // const tmp = Object.entries(estimateData.packages).map(([key, packageData]) => {
    //   return Array.from(allRows).filter((row) => {
    //     const firstCellValue = getFirstCellValue(row);
    //     return packageData["묶음 옵션들"].includes(firstCellValue);
    //   })
    // });
    // console.log("tmp", tmp)
    return Object.entries(estimateData.packages).map(([key, packageData]) => {
      const matchingRows = Array.from(allRows).filter((row) => {
        const firstCellValue = getFirstCellValue(row);
        return packageData["묶음 옵션들"].includes(firstCellValue);
      });
      return { key, packageData, matchingRows };
    });
  }

  function handleRemovedRows(mutation) {
    // if (!mutation.removedNodes || mutation.removedNodes.length === 0) return;

    mutation.removedNodes.forEach((node) => {
      // console.log('행 삭제')
      if (node.nodeName === "TR") {
        console.log("행이 삭제되었습니다:", node);
        processRemovedRow(node);
      }
    });
  }

  function processRemovedRow(node) {
    // if (!node.isConnected) {
    //   console.warn("이미 DOM에서 제거된 노드입니다:", node);
    //   return;
    // }

    const rowData = getRowData(node);
    console.log(`${entry2}에서 행이 삭제되었습니다:`, rowData[0]);

    const allRows = tbody.querySelectorAll("tr");
    processPackages(allRows);
    removeInvalidAccordions();
  }

  function removeInvalidAccordions() {
    if (entry1 === "packages") {
      if ((!tbody || tbody.children.length === 0)) {
        console.log(tbody);
        console.log(`아코디언 ${entry2}의 tbody가 비어 있습니다. 삭제 처리.`);
        parentDiv.remove();
        return;
      }

      const firstCellValues = Array.from(tbody.children).map((row) =>
        row.children[0].innerText.trim()
      );

      const currentPackageKey = Object.keys(estimateData.packages).find(
        (pkg) => pkg === parentDiv.id
      );

      if (currentPackageKey) {
        const currentPackageData = estimateData.packages[currentPackageKey];
        if (!isPackageIncluded(firstCellValues, currentPackageData["묶음 옵션들"])) {
          console.log(`패키지가 성립되지 않는 아코디언을 삭제합니다: ${parentDiv.id}`);
          parentDiv.remove();
        }
      } else {
        console.warn(`패키지 데이터를 찾을 수 없습니다: ${parentDiv.id}`);
        parentDiv.remove();
      }
    } else {
      //   console.log(`${entry1}은 지워지지 않았습니다.`)
    }
  }

  function getRowData(row) {
    return Array.from(row.querySelectorAll("td"), (cell) => cell.textContent.trim());
  }

  function getFirstCellValues(rows) {
    const rowArray = Array.from(rows); // NodeList → 배열 변환
    const filteredRows = entry1 === "categories" ? rowArray.slice(1) : rowArray;
    return filteredRows.map(getFirstCellValue);
  }

  function getFirstCellValue(row) {
    const firstCell = row.querySelector("td");
    return firstCell ? firstCell.textContent.trim() : "";
  }

  function isPackageIncluded(firstCellValues, packageArray) {
    return packageArray.every((option) => firstCellValues.includes(option));
  }

  function moveRowsToNewAccordion(selectedRows, newAccordionTbody, discountRate) {
    selectedRows.forEach((row) => {
      row.setAttribute("data-moved", "true");
      applyDiscount(row, discountRate);
      newAccordionTbody.appendChild(row);
    });
  }

  function applyDiscount(row, discountRate) {
    const originalValue = parseFloat(row.cells[2].textContent.replace(/,/g, "")) || 0;
    const discountedValue = originalValue * (1 - discountRate * 0.01);
    row.cells[3].textContent = numberWithCommas(discountedValue);
  }
}
