const { exec } = require("child_process");
const readline = require("readline");
const chalk = require("chalk");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

/** ELECTRON APP **/
const options = process.argv[2];
if (options === "--gui") {
  try {
    exec("npm run watch");
    exec("npm run start--gui");
    console.log("Desktop app is starting ⚡");
  } catch (error) {
    console.log(error);
  }
  return;
}

/* INITIALISATION **/

//Initialize the tray of game
const launch = async () => {
  console.log(chalk.yellow("Launching✨..."));
  rl.question(
    "Enter the number of ailumettes of the pyramid base : ",
    function (base) {
      if (parseInt(base) % 2 === 0) {
        console.log(chalk.red("Error: the number must be odd"));
        return launch();
      } else if (parseInt(base) < 5) {
        console.log(chalk.red("Error: not enough ailumettes"));
        return launch();
      } else if (
        parseInt(base) < 0 ||
        isNaN(parseInt(base)) ||
        parseInt(base) === undefined
      ) {
        console.log(
          chalk.red("Error: invalid input (positive number expected)")
        );
        return launch();
      }
      const tray = initPyramid(base);
      displayTray(tray);
      PlayerTurn(tray);
    }
  );
};

const initPyramid = (base) => {
  base = parseInt(base);
  const tab = new Array(base);
  for (let index = 0; index < tab.length; index++) {
    tab[index] = new Array(base);
  }
  let sommet = 1;
  for (let i = (base - 1) / 2; i < tab.length; i++) {
    let diff = (tab[i].length - sommet) / 2;
    for (let j = 0; j < tab.length; j++) {
      tab[i][j] = " ";
      for (let ail = 0; ail < sommet; ail++) {
        tab[i][diff + ail] = "|";
      }
    }
    sommet += 2;
  }
  return tab;
};

const displayTray = (tray) => {
  process.stdout.write("*".repeat(tray.length + 2) + "\n");
  for (let i = 0; i < tray.length; i++) {
    if (tray[i][i]) {
      for (let j = 0; j < tray.length; j++) {
        if (j === 0) {
          process.stdout.write("*");
        }
        process.stdout.write(tray[i][j]);
      }
      process.stdout.write("*\n");
    }
  }
  process.stdout.write("*".repeat(tray.length + 2));
  process.stdout.write("\n");
};

/**PLAYER FUNCTIONS**/

//Player turn
const PlayerTurn = (tray) => {
  const ailumettes = [];
  let adjust = (tray.length - 5) / 2;
  for (let x = 0; x < tray.length; x++) {
    if (tray[x][x]) {
      for (let y = 0; y < tray.length; y++) {
        if (tray[x][y] === "|") {
          ailumettes.push({ x, y });
        }
      }
    }
  }
  if (ailumettes.length > 0) {
    console.log(chalk.blue("Your turn"));
    rl.question("Line: ", function (line) {
      line = parseInt(line);
      // Line input verification
      const nbrLines = tray.length - 2 - adjust;
      if (line > nbrLines) {
        console.log(chalk.red("Error: this line is out of range"));
        return PlayerTurn(tray);
      } else if (line === 0) {
        console.log(chalk.red("Error: this line is out of range"));
        return PlayerTurn(tray);
      } else if (line < 0 || isNaN(line) || line === undefined) {
        console.log(chalk.red("invalid input (positive number expected)"));
        return PlayerTurn(tray);
      }
      line = line + 1 + adjust;
      rl.question("Matches : ", function (matches) {
        matches = parseInt(matches);
        // Matches input verification
        if (matches > 3) {
          console.log(
            chalk.red("Error: you must choose a maximum of 3 matches")
          );
          return PlayerTurn(tray);
        } else if (matches === 0) {
          console.log(
            chalk.red("Error: you have to remove at least one match")
          );
          return PlayerTurn(tray);
        } else if (matches < 0 || isNaN(matches) || matches === undefined) {
          console.log(
            chalk.red("Error: invalid input (positive number expected)")
          );
          return PlayerTurn(tray);
        }
        const ailInLine = ailumettes.filter((e) => e.x === line);
        const yAilumettes = [];
        for (let i = 0; i < ailInLine.length; i++) {
          yAilumettes.push(ailInLine[i].y);
        }
        const next = deleteAilumettes(tray, line, yAilumettes, matches);
        if (next) {
          console.log(
            `Player removed ${matches} match(es) from line ${line - 1 - adjust}`
          );
          displayTray(tray);
          AITurn(next);
        } else {
          displayTray(tray);
          return PlayerTurn(tray);
        }
      });
    });
  } else {
    console.log(chalk.yellow("I lost.. snif.. but I’ll get you next time!! "));
    rl.question("Restart the game ? (N/Y) \n", (answer) => {
      answer = answer.toUpperCase();
      if (answer === "Y") {
        launch();
      } else if (answer === "N") {
        console.log(chalk.cyan("*****Goodbye😎***** \n"));
        rl.close();
      } else {
        PlayerTurn(tray);
      }
    });
  }
};

//AI's turn
const AITurn = (tray) => {
  const ailumettes = [];
  let numberOfLines = [];
  let adjust = (tray.length - 5) / 2;
  for (let x = 0; x < tray.length; x++) {
    if (tray[x][x]) {
      numberOfLines.push(1);
      for (let y = 0; y < tray.length; y++) {
        if (tray[x][y] === "|") {
          ailumettes.push({ x, y });
        }
      }
    }
  }
  if (ailumettes.length > 0) {
    // console.log(tray);

    //get number of matches per line group by line
    const matchesPerLines = {};
    let counter = 1;
    for (let i = 0; i < ailumettes.length; i++) {
      const xAilumette = ailumettes[i].x;
      if (i >= 1) {
        if (ailumettes[i].x !== ailumettes[i - 1].x) {
          counter = 1;
        }
      }
      matchesPerLines[xAilumette] = counter++;
    }
    // console.log(matchesPerLines);
    //get number of lines
    // console.log("numberOfLines :" + numberOfLines);
    //get a random line
    let line = Math.floor(Math.random() * Math.floor(numberOfLines.length)) + 1;
    line = line + 1 + adjust;
    //get
    const ailInLine = ailumettes.filter((e) => e.x === line);
    const yAilumettes = [];
    for (let i = 0; i < ailInLine.length; i++) {
      yAilumettes.push(ailInLine[i].y);
    }
    //get a random number of matches
    let matches = Math.floor(Math.random() * Math.floor(3)) + 1;
    // console.log("matches :" + matches);

    const next = deleteAilumettes(tray, line, yAilumettes, matches);
    if (next) {
      console.log(chalk.yellow("AI’s turn..."));
      console.log(
        `AI’s removed ${matches} match(es) from line ${line - 1 - adjust}`
      );
      displayTray(tray);
      PlayerTurn(next);
    } else {
      return AITurn(tray);
    }
  } else {
    console.log(chalk.red("You lost, too bad.."));
    rl.question("Restart the game ? (N/Y) \n", (answer) => {
      answer = answer.toUpperCase();
      if (answer === "Y") {
        launch();
      } else if (answer === "N") {
        console.log(chalk.cyan("*****Goodbye😎***** \n"));
        rl.close();
      } else {
        AITurn(tray);
      }
    });
  }
};

const deleteAilumettes = (tray, x, yAilumettes, matches) => {
  if (yAilumettes.length < matches) {
    return false;
  }
  // console.log("yAilumettes :" + yAilumettes);
  let adjust = (tray.length - 5) / 2;
  // x = x + adjust;
  for (let i = 0; i < matches; i++) {
    // console.log("matche :" + i);
    // console.log("element" + tray[x][yAilumettes[i]]);
    tray[x][yAilumettes[i]] = " ";
  }
  // console.log(tray);
  return tray;
};

/**GAME RUN PROCESS**/
console.log(chalk.cyan("******* Welcome to the Ailumettes' Game ! ******\n"));
launch();
