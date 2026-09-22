let gamSeq = []; 
let userSeq = []; 
let btns = ["pink", "orange", "skyblue", "blue"]; 
let started = false; 
let level = 0; 

let h2 = document.querySelector("h2");
let startBtn = document.querySelector("#start-btn"); // FIXED: Added missing variable declaration

function startGame() {
    if (started == false) { 
        console.log("game is started"); 
        started = true; 
        
        // Hide the start button if it exists in your HTML
        if(startBtn) startBtn.style.display = "none"; 
        
        levelUp(); 
    } 
}

// Event listeners to start the game
if(startBtn) {
    startBtn.addEventListener("click", startGame);
}
h2.addEventListener("click", startGame);
document.addEventListener("keypress", startGame); 

function btnFlash(btn){ 
    btn.classList.add("flash"); 
    setTimeout(function (){ 
        btn.classList.remove("flash"); 
    }, 250);
} 

function userFlash(btn){ 
    btn.classList.add("userflash"); 
    setTimeout(function (){ 
        btn.classList.remove("userflash"); 
    }, 250);
} 

function levelUp(){ 
    userSeq = []; 
    level++; 
    h2.innerText = `LEVEL ${level}`; 
    
    let randIdx = Math.floor(Math.random() * 4); 
    let randColor = btns[randIdx]; 
    let randbtn = document.querySelector(`.${randColor}`); 
    
    gamSeq.push(randColor);
    console.log(gamSeq);
    
    btnFlash(randbtn); 
}

function checkAns(idx){
    if(userSeq[idx] === gamSeq[idx]){
        if(userSeq.length == gamSeq.length) {
           setTimeout(levelUp, 1000);
        }
    } else {
        h2.innerText = `GAME OVER! YOUR SCORE WAS ${level}. TAP HERE TO RESTART.`;
        if(startBtn) {
            startBtn.innerText = "RESTART GAME";
            startBtn.style.display = "inline-block";
        }
        reset(); 
    }
}

function btnPress(){
    if (!started) return; 

    let btn = this;
    userFlash(btn);

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length - 1);
}

let allbtns = document.querySelectorAll(".btn");
for(let btn of allbtns){
    btn.addEventListener("click", btnPress);
}

function reset(){
    started = false;
    gamSeq = []; 
    userSeq = [];
    level = 0;
}
