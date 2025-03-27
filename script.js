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
  humanChoice = humanChoice.toLowerCase();

  if (humanChoice === computerChoice) {
    console.log(`You tied! Both you and the computer chose ${humanChoice}`);
  } else {
    let hasWon = false;

    if (
      humanChoice === "rock" && computerChoice === "scissors" || 
      humanChoice === "paper" && computerChoice === "rock" ||
      humanChoice === "scissors" && computerChoice === "paper"
    ) {
      hasWon = true;
    }

    let message;

    if (hasWon) {
      message = `You won! ${humanChoice} beats ${computerChoice}`;
      humanScore++;
    } else {
      message = `You lost! ${computerChoice} beats ${humanChoice}`;
      computerScore++;
    }
    
    console.log(message);
  }
}

const humanSelection = getHumanChoice();
const computerSelection = getComputerChoice();

playRound(humanSelection, computerSelection);