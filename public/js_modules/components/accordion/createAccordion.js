export default function createAccordion(entry2, value2) {
  // 부모 요소 생성
  var parentDiv = document.createElement("div");
  parentDiv.className = "accordion-item"; // d-none';
  parentDiv.id = entry2;

  // 제목 헤더 생성
  var headerDiv = document.createElement("h2");
  headerDiv.className = "accordion-header";
  headerDiv.id = "panelsStayOpen-heading" + entry2;

  var button = document.createElement("button");
  button.className = "accordion-button";

  var button = document.createElement("button");
  button.className = "accordion-button";
  button.type = "button";
  button.setAttribute("data-bs-toggle", "collapse");
  button.setAttribute("data-bs-target", "#panelsStayOpen-collapse" + entry2);
  button.setAttribute("aria-expanded", "true");
  button.setAttribute("aria-controls", "panelsStayOpen-collapse" + entry2);

  if (value2) {
    button.innerText = value2["필수 카테고리 여부"] === true ? entry2 + " (필수 사항)" : entry2;
  } else {
    button.innerText = entry2;
  }


  headerDiv.appendChild(button);

  // 내용 영역 생성
  var collapseDiv = document.createElement("div");
  collapseDiv.id = "panelsStayOpen-collapse" + entry2;
  collapseDiv.className = "accordion-collapse collapse show";

  var bodyDiv = document.createElement("div");
  bodyDiv.className = "accordion-body";

  // 내용을 내용 영역에 추가
  collapseDiv.appendChild(bodyDiv);

  // 제목 헤더와 내용 영역을 부모에 추가
  parentDiv.appendChild(headerDiv);
  parentDiv.appendChild(collapseDiv);

  return [parentDiv, bodyDiv];
}