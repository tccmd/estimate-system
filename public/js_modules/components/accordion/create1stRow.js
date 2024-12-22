import addRow from "../Row.js";

export default function create1stRow(entry2, value2) {
  var row = document.createElement("tr");

  var selectCell = document.createElement("td");
  var select = document.createElement("select");
  select.id = "selectOptions" + entry2;
  select.onchange = function () {
    addRow(select.id, value2);
  };

  var options = Object.keys(value2);

  // "필수 카테고리 여부" 값 제거
  options = options.filter(option => option !== "필수 카테고리 여부");

  var optgroup = document.createElement("optgroup");
  optgroup.label = entry2;

  options.forEach(function (optionText) {
    var option = document.createElement("option");

    // 구분선 처리
    if (optionText === "--------------------------") {
      option.value = ""; // 비활성화된 옵션
      option.text = optionText;
      option.disabled = true; // 비활성화
      option.style.color = "gray"; // 시각적으로 구분선처럼 보이게
    } else {
      option.value = optionText;
      option.text = optionText;
    }

    optgroup.appendChild(option);
  });

  select.appendChild(optgroup);
  selectCell.appendChild(select);
  row.appendChild(selectCell);

  // 나머지 빈 열들 추가
  for (var i = 0; i < 4; i++) {
    row.appendChild(document.createElement("td"));
  }

  return row;
}