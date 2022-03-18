let head = document.querySelector("#headButton");
let tail = document.querySelector("#tailButton");
let tossResult = document.querySelector("#tossResult")
let tossResultDisplay = document.querySelector("#tossContainerResultText");
let tossResultContainer = document.querySelector("#tossContainerResult");
let batorbowl = document.querySelector("#bat_or_bowl");
let scoreContainer = document.querySelector("#scoreCardContainer")
let batButton = document.querySelector("#batButton");
let runButtons = document.querySelector("#runButtons");
let bowlButton = document.querySelector("#bowlButton");
let balls = document.querySelectorAll(".balls");
let playerScore = document.querySelector("#playerScore");
let cpuScore = document.querySelector("#cpuScore")
let playerRunPerBall = document.querySelectorAll(".playerRuns")
let cpuRunsPerBall = document.querySelectorAll(".cpuRuns")
let cpurunsTable = document.querySelector("#cpurunsTable");
let runsTable = document.querySelector("#runsTable");
let resultParagraph = document.querySelector("#resultParagraph");
let playerChoice = document.querySelector("#playerChoice");
let cpuChoice = document.querySelector("#cpuChoice");
let displayChoice = document.querySelector("#displayChoice");
let choiceContainer = document.querySelectorAll(".choiceContainer");
let resetButton = document.querySelector("#resetButton");

let playerBallCount = 1;
let cpuBallCount = 1;
let playertotalRuns = 0;
let cpuTotalRun = 0;
let isPlayerFirstBat = false;
let isTossWon = false;
let isBatting = false;
let isPlayerOUT = false;
let isCPUOUT = false;
let rand = 0;

//Head Button Event
head.addEventListener('click', function () {
    toss();
    afterToss()
    head.disabled = true;
    tail.disabled = true;
    console.log("Head was selected");
})

//Tail Button Event
tail.addEventListener('click', function () {
    toss();
    afterToss()
    head.disabled = true;
    tail.disabled = true;
    console.log("Tail was selected");
})

//Bat Button Event
batButton.addEventListener('click', function () {
    batButton.disabled = true;
    bowlButton.disabled = true;
    isBatting = true;
    isPlayerFirstBat = true;
    runButtons.hidden = false;
    console.log("Bat was selected");
})

//Bowl Button Event
bowlButton.addEventListener('click', function () {
    batButton.disabled = true;
    bowlButton.disabled = true;
    isBatting = false;
    isPlayerFirstBat = false
    runButtons.hidden = false;
    console.log("Bowl was selected");
})

//Runs Value Button Event
for (let i of balls) {
    i.addEventListener("click", function () {
        let currentValue = parseInt(i.innerHTML)//Current Ball value selected
        let currentValueCPUValue = randomBall();//Random value generated between 1 to 6
        cpuChoice.innerHTML = currentValueCPUValue;
        playerChoice.innerHTML = currentValue;
        runs(currentValue, currentValueCPUValue)//Main Function which determine the player/cpu value and update the score
        console.log("CPU Selected " + currentValueCPUValue);
        console.log("Player Selected " + currentValue);
    })
}


function runs(currentValue, currentValueCPUValue) {
    if ((isBatting) && (isPlayerOUT == false) && (playerBallCount <= 6)) {//Condition is true only when the player is batting and player is not out and player ball count is less than 6 
        if ((isPlayerFirstBat == false) && (playertotalRuns > cpuTotalRun)) {//Condition is always checked to see if player is first batting and the player runs is higher than Cpu total runs
            isBatting = false;
            result(playertotalRuns, cpuTotalRun);
        }
        else {
            if (playerBallCount == 6) {//isBatting is turned to false if Player Ball Count is equal to 6
                isBatting = false;
            }

            if ((currentValue === currentValueCPUValue) || (playerBallCount > 6)) {//Checks if the player is out
                isPlayerOUT = true;
                isBatting = false
                playerBallCount = 10 + playerBallCount;
                updatePlayerScore(playerBallCount, currentValue);
            }

            else {//Update the total runs of the Player
                playertotalRuns = playertotalRuns + currentValue;
                updatePlayerScore(playerBallCount, currentValue);
                playerBallCount += 1;

            }
        }
    }
    else if ((isBatting == false) && (isCPUOUT == false) && (cpuBallCount <= 6)) {//Condition is executed only when isBatting is false(player is not batting) and CPU is not out and Cpu ball count is less than 6
        if ((isPlayerFirstBat == true) && (cpuTotalRun > playertotalRuns)) {//check if the CPU reaches the Targeted run if CPU is batting secound
            result(playertotalRuns, cpuTotalRun);
            isBatting = true;
        }
        else {
            if (cpuBallCount == 6) {
                isBatting = true;
            }

            if ((currentValue === currentValueCPUValue) || (cpuBallCount > 6)) {//Check if CPU is out
                isCPUOUT = true;
                cpuBallCount = 10 + cpuBallCount
                isBatting = true;
                updateCPUScore(cpuBallCount, currentValueCPUValue);
            }
            else {//Update CPU value
                cpuTotalRun = cpuTotalRun + currentValueCPUValue
                updateCPUScore(cpuBallCount, currentValueCPUValue);
                cpuBallCount += 1;
            }
        }
    }

    else {//Update the result
        result(playertotalRuns, cpuTotalRun);
    }
}

function result(playertotalRuns, cpuTotalRun) {
    if (playertotalRuns > cpuTotalRun) {
        for (let i of choiceContainer) {//To remove the current run display(makes it blank)
            i.innerHTML = "";
        }
        console.log("player wins")
        resultParagraph.classList.add("green")//Add green color to win text
        resultParagraph.innerHTML = "WIN"
        resetButton.hidden = false;
    }
    else {
        for (let i of choiceContainer) {//To remove the current run display(makes it blank)
            i.innerHTML = "";
        }
        console.log("cpu wins")
        resultParagraph.classList.add("red")//Add red color to lose text
        resultParagraph.innerHTML = "LOSE"
        resetButton.hidden = false;
    }
}

function updatePlayerScore(playerBallCount, currentValue) {
    playerScore.innerHTML = playertotalRuns;
    updateplayerRuns(playerBallCount, currentValue)
}

function updateCPUScore(cpuBallCount, currentValueCPUValue) {
    cpuScore.innerHTML = cpuTotalRun;
    updateCpuRuns(cpuBallCount, currentValueCPUValue)
}

function updateplayerRuns(playerBallCount, currentValue) {
    let t = (parseInt((playerBallCount - 1)) - 10);
    switch (playerBallCount) {
        case 1:
            playerRunPerBall[0].innerHTML = currentValue;
            break;
        case 2:
            playerRunPerBall[1].innerHTML = currentValue;
            break;
        case 3:
            playerRunPerBall[2].innerHTML = currentValue;
            break;
        case 4:
            playerRunPerBall[3].innerHTML = currentValue;
            break;
        case 5:
            playerRunPerBall[4].innerHTML = currentValue;
            break;
        case 6:
            playerRunPerBall[5].innerHTML = currentValue;
            break;
        default:
            playerRunPerBall[t].innerHTML = "W";
            break;
    }
}

function updateCpuRuns(cpuBallCount, currentValueCPUValue) {
    let t = (parseInt((cpuBallCount - 1)) - 10);
    switch (cpuBallCount) {
        case 1:
            cpuRunsPerBall[0].innerHTML = currentValueCPUValue;
            break;
        case 2:
            cpuRunsPerBall[1].innerHTML = currentValueCPUValue;
            break;
        case 3:
            cpuRunsPerBall[2].innerHTML = currentValueCPUValue;
            break;
        case 4:
            cpuRunsPerBall[3].innerHTML = currentValueCPUValue;
            break;
        case 5:
            cpuRunsPerBall[4].innerHTML = currentValueCPUValue;
            break;
        case 6:
            cpuRunsPerBall[5].innerHTML = currentValueCPUValue;
            break;
        default:
            cpuRunsPerBall[t].innerHTML = "W";
            break;
    }
}


function randomBall() {
    return Math.floor(Math.random() * 6) + 1;
}




function toss() {
    let tossRandom = Math.floor(Math.random() * 2);
    if (tossRandom === 1) {
        isTossWon = true;
        rand = 1;
        tossResult.innerHTML = "You WON the Toss"
        tossResult.classList.add("green")

    }
    else {
        isTossWon = false;
        rand = 0;
        tossResult.innerHTML = "You LOSE the Toss"
        tossResult.classList.add("red")

    }
}

function afterToss() {
    if (isTossWon) {
        tossResultDisplay.innerHTML = "Choose BAT or BOWL";
        tossResultContainer.hidden = false;
        batorbowl.hidden = false;
        scoreContainer.hidden = false;
        cpurunsTable.hidden = false;
        runsTable.hidden = false;
        displayChoice.hidden = false;
    }
    else {
        tossResultContainer.hidden = false;
        scoreContainer.hidden = false;
        runButtons.hidden = false;
        displayChoice.hidden = false;
        cpurunsTable.hidden = false;
        runsTable.hidden = false;
        if (Math.floor(Math.random() * 2) === 0) {
            tossResultDisplay.innerHTML = "CPU chose to Bowl";
            isBatting = true;
            isPlayerFirstBat = true;

        }
        else {
            tossResultDisplay.innerHTML = "CPU choose to BAT";
            isBatting = false;
            isPlayerFirstBat = false;
        }

    }
}

