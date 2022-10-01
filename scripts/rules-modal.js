let modalBackOverlay;

let modalContainer;

const initModalBackOverlay = () => {
  modalBackOverlay = document.createElement("div");
  modalBackOverlay.classList.add("rules-modal-back-overlay");
};

const initModalContainer = () => {
  modalContainer = document.createElement("div");
  modalContainer.classList.add("rules-modal-container");
};

const hideModal = () => {
  modalBackOverlay.remove();
  modalContainer.remove();
};

const createTitle = () => {
  const title = document.createElement("div");
  title.classList.add("rules-modal-title");

  const titleH2 = document.createElement("h2");
  titleH2.innerText = "RULES";
  title.appendChild(titleH2);

  const closeImg = document.createElement("img");
  closeImg.setAttribute("src", "images/icon-close.svg");
  closeImg.setAttribute("alt", "close");
  closeImg.addEventListener("click", hideModal);

  title.appendChild(closeImg);
  return title;
};

const createModalContent = () => {
  const imageRulesContainer = document.createElement("div");
  imageRulesContainer.classList.add("image-container");

  const rulesImg = document.createElement("img");
  rulesImg.setAttribute("src", "images/image-rules.svg");
  rulesImg.setAttribute("alt", "rules image");

  imageRulesContainer.appendChild(rulesImg);
  return imageRulesContainer;
};

const createModal = () => {
  initModalBackOverlay();
  initModalContainer();
  const modal = document.createElement("div");
  modal.classList.add("rules-modal");
  modal.appendChild(createTitle());
  modal.appendChild(createModalContent());
  modalContainer.appendChild(modal);
};

const showModal = () => {
  createModal();
  const body = document.getElementsByTagName("body")[0];
  body.appendChild(modalBackOverlay);
  body.appendChild(modalContainer);
};

const rulesBtn = document.getElementsByClassName("rules-button")[0];
rulesBtn.addEventListener("click", showModal);
