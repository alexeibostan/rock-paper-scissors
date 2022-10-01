const ELEMENTS_NAME = ["scissors", "paper", "rock"];

const winnerMap = {
  scissors: { paper: true, rock: false },
  paper: { scissors: false, rock: true },
  rock: { scissors: true, paper: false },
};

const COMPUTER_SELECTION_TIME = 2; // seconds

let score = 0;

const randomIntFromInterval = (min, max) => {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const getIsPlayerWinner = (playerElement, computerElement) => {
  if (playerElement === computerElement) {
    return null;
  }
  return winnerMap[playerElement][computerElement];
};

const removeAll = (node) => {
  while (node.firstChild) {
    node.removeChild(node.lastChild);
  }
};

const updateScore = (number) => {
  const displayScore = document.getElementsByClassName("game-score")[0];
  score = score + number;
  displayScore.innerText = score;
};

const createElement = (type) => {
  const borderContainer = document.createElement("div");
  borderContainer.classList.add("center-element", "circle-border", type);

  const roundCircle = document.createElement("div");
  roundCircle.classList.add("center-element", "circle-element");

  const iconImage = document.createElement("img");
  iconImage.setAttribute("src", `images/icon-${type}.svg`);
  iconImage.setAttribute("alt", type);

  roundCircle.appendChild(iconImage);
  borderContainer.appendChild(roundCircle);
  return borderContainer;
};

const createSelection = (titleText) => {
  const selection = document.createElement("div");
  selection.classList.add("show-selection");
  const title = document.createElement("h4");
  title.innerText = titleText;
  selection.appendChild(title);
  return selection;
};

const createPlaceholderSelection = (titleText) => {
  const selection = createSelection(titleText);
  const placeholder = document.createElement("div");
  placeholder.classList.add("placeholder-element");
  selection.appendChild(placeholder);
  return selection;
};

const createElementSelection = (titleText, elementType) => {
  const selection = createSelection(titleText);
  selection.appendChild(createElement(elementType));
  return selection;
};

const createWinnerSection = (isWinner) => {
  const winnerSection = document.createElement("div");
  winnerSection.classList.add("center-element", "winner-container");

  const result = document.createElement("h3");
  if (isWinner !== null) {
    result.innerText = isWinner ? "YOU WIN" : "YOU LOSE";
  }
  const playAgainButton = document.createElement("button");
  playAgainButton.innerText = "PLAY AGAIN";
  playAgainButton.addEventListener("click", showFirstStep);
  winnerSection.appendChild(result);
  winnerSection.appendChild(playAgainButton);
  return winnerSection;
};

const replacePlaceholder = (placeholderSelection, computerElementName) => {
  const placeholder = placeholderSelection.getElementsByClassName(
    "placeholder-element"
  )[0];
  placeholder.remove();
  const computerElement = createElement(computerElementName);
  computerElement.classList.add("animate-selection", "bounce-5");
  placeholderSelection.appendChild(computerElement);
};

const showWinner = (container, computerSection, isWinner) => {
  isWinner !== null && updateScore(isWinner ? +1 : -1);
  const winnerSection = createWinnerSection(isWinner);
  container.insertBefore(winnerSection, computerSection);
};

const showPlayerAndComputerSelection = (playerElementName) => {
  const main = document.getElementsByTagName("main")[0];
  removeAll(main);
  const elementsContainer = document.createElement("div");
  elementsContainer.classList.add("game-container");

  const mySelection = createElementSelection("YOU PIKED", playerElementName);
  elementsContainer.appendChild(mySelection);

  const computerSection = createPlaceholderSelection("THE HOUSE PIKED");
  elementsContainer.appendChild(computerSection);
  const randomIndex = randomIntFromInterval(0, 2);
  const computerElementName = ELEMENTS_NAME[randomIndex];
  const isWinner = getIsPlayerWinner(playerElementName, computerElementName);
  setTimeout(
    () => replacePlaceholder(computerSection, computerElementName),
    COMPUTER_SELECTION_TIME * 1000
  );
  setTimeout(
    () => showWinner(elementsContainer, computerSection, isWinner),
    (COMPUTER_SELECTION_TIME + 2) * 1000
  );
  main.appendChild(elementsContainer);
};

const showFirstStep = () => {
  const main = document.getElementsByTagName("main")[0];
  removeAll(main);
  const elementsContainer = document.createElement("div");
  elementsContainer.classList.add("select-element-container");

  const triangleBg = document.createElement("div");
  triangleBg.classList.add("triangle-bg");

  ELEMENTS_NAME.forEach((name) => {
    const element = createElement(name);
    element.addEventListener("click", () =>
      showPlayerAndComputerSelection(name)
    );
    triangleBg.appendChild(element);
  });

  elementsContainer.appendChild(triangleBg);
  main.appendChild(elementsContainer);
};

showFirstStep();
