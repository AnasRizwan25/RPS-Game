let score = JSON.parse(localStorage.getItem('score')) || {
  win: 0,
  lose: 0,
  tie: 0
};

document.querySelector('.r-button').addEventListener('click', () => {
  gameMove('rock');
});

document.querySelector('.p-button').addEventListener('click', () => {
  gameMove('paper');
});

document.querySelector('.s-button').addEventListener('click', () => {
  gameMove('scissors');
});


document.body.addEventListener('keydown', (event) => {
  if (event.key === 'r') {
    gameMove('rock');
  }
  else if (event.key === 'p') {
    gameMove('paper');
  }
  else if (event.key === 's') {
    gameMove('scissors');
  }
});




// if (score === null) {
//   score = {
//     win :  0,
//     lose : 0,
//     tie : 0
//   }
// };

// if (!score) {
//   score = {
//     win :  0,
//     lose : 0,
//     tie : 0
//   }
// };
jsWLT();


function pickComputerMove() {
  let computerMove = '';
  const randomNumber = Math.random();
  if (randomNumber > 0 && randomNumber < 1 / 3) {
    computerMove = 'rock';
  }
  else if (randomNumber > 1 / 3 && randomNumber < 2 / 3) {
    computerMove = 'paper';
  }
  else if (randomNumber > 2 / 3 && randomNumber < 1) {
    computerMove = 'scissors';
  }

  return computerMove;
}

let isCheck = false;
let intervalID;

function autoPlay() {

  if (!isCheck) {

    intervalID = setInterval(() => {
      const computerMove = pickComputerMove();
      gameMove(computerMove);

    }, 1000)

    isCheck = true;
  }

  else {
    isCheck = false;
    clearInterval(intervalID);
  }

}

function stop() {

  let elementAuto = document.querySelector('.auto');

  if (elementAuto.innerText === 'Auto Save') {
    elementAuto.innerHTML = 'Stop Save';
  }

  else {
    elementAuto.innerHTML = 'Auto Save';
  }

}

function jsWLT() {

  document.querySelector('.js-wlt').
    innerHTML = `Wins: ${score.win}, Losses: ${score.lose}, Ties: ${score.tie}`;
}

function jsResult(a) {

  document.querySelector('.js-result').
    innerHTML = a;

}

function jsDecision(x, y) {

  document.querySelector('.js-decision').
    innerHTML = `You 
<img class="pic1" src="./images/${x}-emoji.png">
<img class="pic1" src="./images/${y}-emoji.png">
Computer`;

}

function gameMove(x) {
  let computerMove = pickComputerMove();
  let result = '';



  if (x === 'rock') {
    if (computerMove === 'scissors') {
      result = 'You win.';
    }
    else if (computerMove === 'paper') {
      result = 'You lose.';
    }
    else if (computerMove === 'rock') {
      result = 'Tie.';
    }
  }

  else if (x === 'paper') {
    if (computerMove === 'rock') {
      result = 'You win.';
    }
    else if (computerMove === 'scissors') {
      result = 'You lose.';
    }
    else if (computerMove === 'paper') {
      result = 'Tie.';
    }
  }

  else if (x === 'scissors') {
    if (computerMove === 'paper') {
      result = 'You win.';
    }
    else if (computerMove === 'rock') {
      result = 'You lose.';
    }
    else if (computerMove === 'scissors') {
      result = 'Tie.';
    }
  }

  if (result === 'You win.') {
    score.win++;
  }
  else if (result === 'You lose.') {
    score.lose++;
  }
  else if (result === 'Tie.') {
    score.tie++;
  }

  jsResult(result);
  jsWLT();
  jsDecision(x, computerMove);



  localStorage.setItem('score', JSON.stringify(score));
  //      
}

function res() {
  document.querySelector('.reset').
    addEventListener('click', () => {

      a.innerHTML = `
      <p>Are you sure you want to reset the score? <button class="yes">Yes</button> <button  class="no">No</button></p>
    `;
    const x = document.querySelector('.yes');
    const y = document.querySelector('.no');

    x.addEventListener('click', () => {
      score.win = 0;
      score.lose = 0;
      score.tie = 0;
      localStorage.removeItem('score');
      jsWLT();
      a.innerHTML = '';

    });
    y.addEventListener('click',() =>{
      a.innerHTML = '';
    
    });

    });
}

function auto() {
  document.querySelector('.auto1').
    addEventListener('click', () => {
      autoPlay();
      stop();
    }
    );
};


document.body.addEventListener('keydown', (event) => {
  if (event.key === ' ') {
    autoPlay();
    stop();
  }
});

let a = document.querySelector('.result');

document.body.addEventListener('keydown', (event) => {
  if (event.key === 'Backspace') {

    a.innerHTML = `
      <p>Are you sure you want to reset the score? <button class="yes">Yes</button> <button  class="no">No</button></p>
    `;
    const x = document.querySelector('.yes');
    const y = document.querySelector('.no');

    x.addEventListener('click', () => {
      score.win = 0;
      score.lose = 0;
      score.tie = 0;
      localStorage.removeItem('score');
      jsWLT();
      a.innerHTML = '';

    });
    
    y.addEventListener('click',() =>{
      a.innerHTML = '';
    
    });
  }
});

auto();
res();