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

const btnContainer = document.querySelector("#btn-container");
btnContainer.addEventListener("click", (e) => {
  playRound(e.target.id, getComputerChoice());
});