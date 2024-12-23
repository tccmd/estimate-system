// 입력 데이터 수집
export default function collectInputData() {

  // 초기 데이터 객체 생성
  const data = {};
  const keys = [];

  // 카드 영역을 선택
  const cards = document.querySelectorAll('.modal-body .card');
  cards.forEach((card) => {
    // 카드 헤더의 텍스트 내용을 키로 설정
    const cardKey = card.querySelector('.card-header').textContent.trim();
    data[cardKey] = {};
    // console.log(cardKey);

    // 카드 내부의 아코디언 항목 선택
    const accordionItems = card.querySelectorAll('.accordion .accordion-item');
    accordionItems.forEach((item) => {
      // 아코디언 항목의 키 값 (input value 사용)
      const itemKeyElement = item.querySelector('h2 > button > input');
      const itemKey = itemKeyElement.value;
      data[cardKey][itemKey] = {};

      // input-group 내 입력 필드 처리
      const inputGroups = item.querySelectorAll('.input-group');
      inputGroups.forEach((group) => {
        const inputs = group.querySelectorAll('.form-control');

        // 첫 번째 입력값을 키로 설정
        const key = inputs[0].value || "";

        // 두 번째 입력값 처리 (value, switch, placeholder 등 확인)
        let value;
        if (inputs[1].value) {
          value = inputs[1].value;
        } else if (inputs[1].tagName === "DIV") {
          const switchInput = inputs[1].querySelector('div > input');
          value = switchInput.checked;
          if (switchInput.type === "text") {
            // console.log(`${key}: ${switchInput}, ${switchInput.value}`)
            const valueArray = switchInput.value.split(',').map(item => item.trim());
            //console.log(valueArray);
            value = valueArray;
          }
        } else {
          value = inputs[1].placeholder;
        }
        // if (inputs[2]) console.log(inputs[2]);

        // 데이터를 구성
        data[cardKey][itemKey][key] = value;
        // 키 모음 구성
        if (cardKey === "categories" && key !== "필수 카테고리 여부" && key !== "--------------------------") {
          keys.push(key);
        }
      });
    });
  });

  // 최종 데이터 출력
  console.log(data);
  console.log(keys);

  return [data, keys];
}