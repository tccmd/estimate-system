import { estimateDatainit } from "../../common/data.js";
import { addButtonSVG } from "../../components/SVGs.js";
import { showToast } from "../../components/Toast.js";
import { modalBody } from "../settings.js";
import createButton from "./Btn.js";
import createCategory from "./Category.js";
import createIptGroup from "./IptGroup.js";

export default function createEnty1s(entry1, value1) {
  const entry1Card = document.createElement('div');
  entry1Card.classList.add("card", "mb-3");

  const cardHeader = document.createElement('div');
  cardHeader.classList.add("card-header", "d-flex", "justify-content-between", "align-items-center");

  const cardHeaderText = document.createElement('span')
  cardHeaderText.textContent = entry1;

  const cardBody = document.createElement('div');
  cardBody.classList.add("card-body");

  cardHeader.appendChild(cardHeaderText);
  cardHeader.appendChild(createButton(addButtonSVG, () => {
    // 카테고리 생성 및 추가
    const [newCategory, accordionBody] = createCategory({}, entry1);
    cardBody.appendChild(newCategory);

    // entry1이 packages일 경우 기본 인풋 세팅
    if (entry1 === "packages") {
      for (const [key, value] of Object.entries(estimateDatainit.packageInit)) {
        accordionBody.appendChild(createIptGroup(key, value));
      }
    }

    // 새로 추가된 카테고리로 스크롤 이동
    newCategory.scrollIntoView({ behavior: "smooth", block: "center" });

    // Toast 메시지 표시
    showToast({
      message2: "새 카테고리가 추가되었습니다.",
    });
  }, entry1 === "categories" ? "카테고리 추가" : "묶음 추가"));
  entry1Card.appendChild(cardHeader);
  entry1Card.appendChild(cardBody);
  modalBody.appendChild(entry1Card);

  return cardBody;
}