export default function createTable() {
  // 테이블 생성
  var table = document.createElement("table");
  table.className = "table table-hover table-bordered package-table";
  table.id = "quoteTable";

  // 테이블 헤더 생성
  var thead = document.createElement("thead");
  var headerRow = document.createElement("tr");
  var headerTitles = ["구분", "수량", "단가", "합계", "비고"];

  for (var i = 0; i < headerTitles.length; i++) {
    var th = document.createElement("th");
    th.innerText = headerTitles[i];
    headerRow.appendChild(th);
  }

  thead.appendChild(headerRow);
  table.appendChild(thead);

  // 테이블 바디 생성
  var tbody = document.createElement("tbody");
  table.appendChild(tbody);

  return [table, tbody];
}