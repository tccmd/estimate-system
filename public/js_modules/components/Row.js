import {
  numberWithCommas,
  updateProduct,
  updateTotal,
} from "../common/priceUtils.js";

// 행을 추가하는 함수
export default function addRow(selectId, value) {
  var selectedOption = document.getElementById(selectId).value;
  var currentRow = document.getElementById(selectId).closest("tr");

  if (selectedOption !== "none") {
    var newRow = document.createElement("tr");

    var cell1 = document.createElement("td");
    cell1.textContent = selectedOption;
    newRow.appendChild(cell1);

    cell1.addEventListener("click", function () {
      deleteRow(newRow);
    });

    var cell2 = document.createElement("td");
    var quantityInput = document.createElement("input");
    quantityInput.type = "text";
    quantityInput.value = 1;
    quantityInput.className = "amount";
    quantityInput.addEventListener("input", function () {
      updateProduct(newRow);
    });
    cell2.appendChild(quantityInput);
    newRow.appendChild(cell2);

    var cell3 = document.createElement("td");
    var unitPrice = value[selectedOption];
    cell3.textContent = numberWithCommas(unitPrice);
    cell3.className = "unit-price";
    newRow.appendChild(cell3);

    var cell4 = document.createElement("td");
    cell4.className = "result";
    newRow.appendChild(cell4);

    var cell5 = document.createElement("td");
    var textInput = document.createElement("input");
    textInput.type = "text";
    textInput.className = "notes-input";
    cell5.appendChild(textInput);
    newRow.appendChild(cell5);

    currentRow.parentNode.insertBefore(newRow, currentRow.nextSibling);

    updateProduct(newRow);
  }
}

// 행을 삭제하는 함수
function deleteRow(row) {
  if (row.parentNode) {
    row.parentNode.removeChild(row);
  }

  updateTotal();
}