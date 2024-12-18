let defaultMessage = "기본 메시지";  // 기본 메시지
let defaultHeader = "견적서 설정";     // 기본 헤더
const maxLangth = 15;

export default function createToast() {
  // Toast container 생성
  const toastContainer = document.createElement("div");
  toastContainer.className = "toast-container position-fixed bottom-0 end-0 p-3";

  // Toast 본체 생성
  const toast = document.createElement("div");
  toast.id = "liveToast";
  toast.className = `toast`;
  toast.setAttribute("role", "alert");
  toast.setAttribute("aria-live", "assertive");
  toast.setAttribute("aria-atomic", "true");

  // Toast header 생성
  const toastHeader = document.createElement("div");
  toastHeader.className = "toast-header";

  const strong = document.createElement("strong");
  strong.className = "me-auto";
  strong.textContent = defaultHeader;

  const small = document.createElement("small");
  small.textContent = "Just now";

  const closeButton = document.createElement("button");
  closeButton.type = "button";
  closeButton.className = "btn-close";
  closeButton.setAttribute("data-bs-dismiss", "toast");
  closeButton.setAttribute("aria-label", "Close");

  // Header에 추가
  toastHeader.appendChild(strong);
  toastHeader.appendChild(small);
  toastHeader.appendChild(closeButton);

  // Toast body 생성
  const toastBody = document.createElement("div");
  toastBody.className = "toast-body";
  toastBody.textContent = defaultMessage;

  // Toast 본체에 header와 body 추가
  toast.appendChild(toastHeader);
  toast.appendChild(toastBody);

  // Container에 toast 추가
  toastContainer.appendChild(toast);

  // Body에 추가
  document.body.appendChild(toastContainer);
}

export function showToast({ message1, message2, header }) {
  // 기존 Toast 요소 가져오기
  const toast = document.getElementById("liveToast");

  if (!toast) {
    console.error("Toast element not found!");
    return;
  }

  // Toast 헤더와 메시지 업데이트
  const headerElement = toast.querySelector(".toast-header strong");
  const bodyElement = toast.querySelector(".toast-body");

  // header와 message를 전달된 값으로 업데이트, 없으면 기본값 유지
  headerElement.textContent = header || defaultHeader;  // 헤더 텍스트 변경
  if (message1) {
    let slicedText = (message1 || "").length > maxLangth ? message1.slice(0, maxLangth) + "..." : message1;
    bodyElement.textContent = slicedText + " " + message2;
  } else {
    bodyElement.textContent = message2;
  }

  // Bootstrap Toast 인스턴스 활성화 및 표시
  const toastInstance = new bootstrap.Toast(toast);
  toastInstance.show();
}
