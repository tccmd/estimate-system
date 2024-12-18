import { clearAccordionTable, removeAccordion } from "./accBtnFunctions.js";
import selectRequiredOptionsOnce from "./selectRequiredOptionsOnce.js";

export function createAllSelectBtn(entry1, entry2) {
  if (entry1 !== "packages") {
    var selectButton = document.createElement("button");
    selectButton.type = "button";
    selectButton.className = "btn btn-outline-primary me-2";
    selectButton.addEventListener("click", () => selectRequiredOptionsOnce(entry2));
    selectButton.innerText = "모두 추가";

    return selectButton;
  }
}

export function createClearBtn(tbody, entry1, entry2) {
  var clearButton = document.createElement("button");
  clearButton.type = "button";
  clearButton.className = "btn btn-danger";

  if (entry1 !== "packages") {
    clearButton.addEventListener("click", () => clearAccordionTable(tbody, entry2));
  } else {
    clearButton.addEventListener("click", () => removeAccordion(entry2));
  }
  clearButton.innerText = "모두 지우기";

  return clearButton;
}