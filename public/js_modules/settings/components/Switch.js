// 스위치 변수
let switchValues = {};

export default function createSwitch(id, value) {
  const swichElement = document.createElement('div');
  const input = document.createElement('input');

  swichElement.classList.add('form-check', 'form-switch');
  input.classList.add('form-check-input');
  input.type = 'checkbox';
  input.role = 'switch';
  input.id = id;
  if (value) input.checked = true;
  input.addEventListener('click', () => {
    switchValues[id] = input.checked;
    console.log(switchValues);
  });

  swichElement.appendChild(input);

  // modalBody.appendChild(swichElement);
  return swichElement;
}