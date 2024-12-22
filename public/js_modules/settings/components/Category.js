import { estimateDatainit } from "../../common/data.js";
import { addButtonSVG, minusButtonSVG } from "../../components/SVGs.js";
import { showToast } from "../../components/Toast.js";
import createButton from "./Btn.js";
import createIptGroup from "./IptGroup.js";

export default function createCategory(entry2, entry1) {

  const entry2Accordion = document.createElement('div');
  const accordionItem = document.createElement('div');
  const h2E = document.createElement('h2');

  const btnE = document.createElement('button');
  const accordionCollaps = document.createElement('div');

  const iptE = document.createElement('input');
  const accordionBody = document.createElement('div');

  entry2Accordion.classList.add('accordion', 'mb-3');
  accordionItem.classList.add('accordion-item');
  h2E.classList.add('accordion-header');
  btnE.classList.add('accordion-button', 'custom-accordion-icon');
  accordionCollaps.classList.add('accordion-collapse',
    'collapse', 'show');

  iptE.classList.add('form-control');
  iptE.style = "width: 10rem;"
  accordionBody.classList.add('accordion-body');

  entry2Accordion.id = `accordion-${entry2}`;
  const collapseId = `collapse-${entry2}`;
  // btnE.setAttribute('data-bs-toggle', 'collapse');
  // btnE.setAttribute('data-bs-target', `#${collapseId}`);
  // btnE.setAttribute('aria-expanded', "true");
  // btnE.setAttribute('aria-controls', "true");
  accordionCollaps.id = collapseId;
  accordionCollaps.setAttribute('data-bs-parent', `#${entry2Accordion.id}`);
  iptE.value = JSON.stringify(entry2) !== "{}" ? entry2 : "example";

  entry2Accordion.appendChild(accordionItem);
  accordionItem.appendChild(h2E);
  h2E.appendChild(btnE);
  btnE.appendChild(iptE);
  if (entry1 === "categories") {
    btnE.appendChild(createButton(addButtonSVG, () => {
      accordionBody.appendChild(createIptGroup("", "", entry2, entry1));
    }, "옵션 추가"));
  }
  btnE.appendChild(createButton(minusButtonSVG, () => {
    // entry2Accordion을 부모 요소에서 삭제
    entry2Accordion.remove();
    // 토스트 메시지 등 다른 작업을 여기에 추가할 수 있음
    showToast({
      message1: `${iptE.value ? iptE.value : iptE.placeholder}`,
      message2: "카테고리가 삭제되었습니다."
    });
  }, "카테고리 삭제"));
  accordionItem.appendChild(accordionCollaps);
  accordionCollaps.appendChild(accordionBody);

  return [entry2Accordion, accordionBody];
}