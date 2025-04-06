let humanScore = 0;
let computerScore = 0;

const btnContainer = document.querySelector("#btn-container");
btnContainer.addEventListener("click", (e) => {
  const humanChoice = e.target.id;

  if (
    humanChoice === "rock" || 
    humanChoice === "paper" || 
    humanChoice === "scissors"
  ) {
    playRound(humanChoice, getComputerChoice());
  }
});

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

function playRound(humanChoice, computerChoice) {
  humanChoice = humanChoice.toLowerCase();

  let result;
  if (humanChoice === computerChoice) {
    result = `You tied! Both you and the computer chose ${humanChoice}`;
  } else if (checkHumanWin(humanChoice, computerChoice)) {
    result = `You won! ${humanChoice} beats ${computerChoice}`;
    humanScore++;
  } else {
    result = `You lost! ${humanChoice} loses to ${computerChoice}`;
    computerScore++;
  }
  
  displayRoundResult(result);
  score.textContent = `Human: ${humanScore} - Computer: ${computerScore}`;

  if (humanScore >= 5 || computerScore >= 5) {
    score.textContent = 
      `${humanScore >= 5 ? "You" : "Computer"} Win! ${score.textContent}`;
    endGame();
  }
}

function checkHumanWin(humanChoice, computerChoice) {
  return humanChoice === "rock" && computerChoice === "scissors" || 
    humanChoice === "paper" && computerChoice === "rock" ||
    humanChoice === "scissors" && computerChoice === "paper";
}

function displayRoundResult(result) {
  const resultContainer = document.querySelector("#result-container");
  
  const oldResultText = resultContainer.lastChild;
  if (oldResultText) {
    resultContainer.removeChild(oldResultText);
  }
  
  if (!result) {
    return;
  }
  
  const newResultText = document.createElement("p");
  newResultText.textContent = result;
  resultContainer.appendChild(newResultText);
}

function endGame() {
  // Disable all buttons
  const buttons = document.querySelectorAll("div#btn-container > button");
  buttons.forEach((button) => {
    button.setAttribute("disabled", "true");
  });

  // Add button to reset game
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

  // Clear result text
  displayRoundResult();

  // Clear score text
  const score = document.querySelector("#score");
  score.textContent = "";
  
  // Re-enable buttons
  const buttons = document.querySelectorAll("div#btn-container > button");
  buttons.forEach((button) => {
    button.removeAttribute("disabled");
  });

  // Remove reset button
  const resetButton = document.querySelector("#reset-btn");
  if (!resetButton) {
    return;
  }
  resetButton.remove();
}