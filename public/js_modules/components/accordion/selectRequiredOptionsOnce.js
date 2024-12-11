// 필수 옵션을 한번씩 추가하는 함수
export default function selectRequiredOptionsOnce(accordionId) {
  const isReverse = true; // accordionId === 'Accordion1'; // 역순 여부 결정

  // 필수 옵션 목록 가져오기
  const selectElement = document.getElementById("selectOptions" + accordionId);
  if (!selectElement) {
    console.error(`Select element with id ${accordionId} not found`);
    return;
  }

  const requiredOptions = Array.from(selectElement.options)
    .filter(
      (option) =>
        option.value !== "none" &&
        option.value !== "서버유지보수비 1년" &&
        option.value !== ""
    ) // 구분선을 제외
    .map((option) => option.value);

  // 역순으로 정렬
  if (isReverse) {
    requiredOptions.reverse();
  }

  // 특정 이벤트를 발생시키기 위한 함수
  function triggerEvent(element, eventName) {
    const event = new CustomEvent(eventName, { bubbles: true });
    element.dispatchEvent(event);
  }

  // 이미 선택된 옵션을 저장하는 Set
  const selectedOptions = new Set();

  // 필수 옵션을 반복하면서 한 번씩 선택
  requiredOptions.forEach((optionValue) => {
    // selectElement를 한 번만 찾고, 그걸 사용합니다.
    if (!selectedOptions.has(optionValue)) {
      // 필수 옵션이 아직 선택되지 않았다면, 값을 수동으로 설정하고 이벤트 발생
      selectElement.value = optionValue; // 수동으로 값 설정
      triggerEvent(selectElement, "change"); // change 이벤트 발생
      selectedOptions.add(optionValue);
    }
  });
}
