export default function createButton(inner, onClick) {
  const Btn = document.createElement('button');
  Btn.type = 'button';
  Btn.classList.add('btn', 'z-2');
  Btn.innerHTML = inner;
  Btn.onclick = onClick;

  return Btn;
}