function getComputerChoice() {
  const randomNumber = Math.floor(Math.random() * 3);

  switch (randomNumber) {
    case 0:
      return "rock";
    case 1:
      return "paper";
    case 2:
      return "scissors";
    default:
      return "rock";
  }
}

function getHumanChoice() {
  return prompt("Rock, paper, or scissors?")
}

let humanScore = 0;
let computerScore = 0;
const score = document.querySelector("#score");

const btnContainer = document.querySelector("#btn-container");
btnContainer.addEventListener("click", (e) => {
  const id = e.target.id;

  if (id === "rock" || id === "paper" || id === "scissors") {
    playRound(e.target.id, getComputerChoice());
  }
});

function playRound(humanChoice, computerChoice) {
  const resultContainer = document.querySelector("#result-container");
  
  const oldResultText = resultContainer.lastChild;
  if (oldResultText) {
    resultContainer.removeChild(oldResultText);
  }

  humanChoice = humanChoice.toLowerCase();
  const newResultText = document.createElement("p");

  if (humanChoice === computerChoice) {
    newResultText.textContent = `You tied! Both you and the computer chose ${humanChoice}`;
  } else {
    let hasWon = false;

    if (
      humanChoice === "rock" && computerChoice === "scissors" || 
      humanChoice === "paper" && computerChoice === "rock" ||
      humanChoice === "scissors" && computerChoice === "paper"
    ) {
      hasWon = true;
    }
    
    if (hasWon) {
      newResultText.textContent = `You won! ${humanChoice} beats ${computerChoice}`;
      humanScore++;
    } else {
      newResultText.textContent = `You lost! ${computerChoice} beats ${humanChoice}`;
      computerScore++;
    }
  }
  
  resultContainer.appendChild(newResultText);
  score.textContent = `Human: ${humanScore} - Computer: ${computerScore}`;

  if (humanScore >= 5 || computerScore >= 5) {
    score.textContent = `${humanScore >= 5 ? "Human" : "Computer"} Win! ${score.textContent}`;
    endGame();
  }
}

function endGame() {
  const buttons = document.querySelectorAll("div#btn-container > button");
  buttons.forEach((button) => {
    button.setAttribute("disabled", "true");
  });

  const resetButton = document.createElement("button");
  resetButton.textContent = "Reset"
  resetButton.setAttribute("id", "reset-btn");
  resetButton.addEventListener("click", resetGame);
  btnContainer.appendChild(resetButton);
}

function resetGame() {
  // Reset scores
  humanScore = 0;
  computerScore = 0;

  // Re-enable buttons
  const buttons = document.querySelectorAll("div#btn-container > button");
  buttons.forEach((button) => {
    button.removeAttribute("disabled");
  });

  // Clear result text
  const resultContainer = document.querySelector("#result-container");
  const oldResultText = resultContainer.lastChild;
  if (oldResultText) {
    resultContainer.removeChild(oldResultText);
  }

  // Clear score text
  const score = document.querySelector("#score");
  score.textContent = "";

  // Remove reset button
  const resetButton = document.querySelector("#reset-btn");
  if (!resetButton) {
    return;
  }
  resetButton.remove();
}

function playGame() {
  for (let i = 0; i < 5; i++) {
    const humanSelection = getHumanChoice();
    const computerSelection = getComputerChoice();
    
    playRound(humanSelection, computerSelection);
  }

  if (humanScore > computerScore) {
    console.log(`Congratulations! You won ${humanScore} out of 5 times.`);
  } else if (humanScore < computerScore) {
    console.log(`Too bad! The computer won ${computerScore} out of 5 times.`);
  } else {
    console.log(`You and the computer tied with a score of ${humanScore}!`);
  }
}