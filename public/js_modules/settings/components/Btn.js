export default function createButton(inner, onClick, tooltipText) {
  const Btn = document.createElement('button');
  Btn.type = 'button';
  Btn.classList.add('btn', 'z-2');
  Btn.innerHTML = inner;
  Btn.onclick = onClick;

  Btn.setAttribute('data-bs-toggle', 'tooltip');
  Btn.setAttribute('data-bs-placement', 'top');
  Btn.setAttribute('data-bs-custom-class', 'custom-tooltip');
  Btn.setAttribute('data-bs-title', tooltipText ? tooltipText : "");

  return Btn;
}