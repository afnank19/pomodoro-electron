// --text: #120b0c;
// --background: #faf4f5;
// --primary: #ba4965;
// --secondary: #de8da1;
// --accent: #de607f; pink colour scheme


let count = 10;
let currentWorkTime = 10;
let currentBreakTime = 5;
let timerInterval;
let Break = false;
let increment = 5;

document.getElementById("timer").innerHTML = count.toString()+" Minutes Left";

function incrementTime() {
  count = count + increment;
  currentWorkTime = count;
  document.getElementById("timer").innerHTML = count.toString()+" Minutes Left";
}
function decrementTime() {
  count = count - increment;
  if (count <= 0) {
    count += increment;
  }
  currentWorkTime = count;
  document.getElementById("timer").innerHTML = count.toString()+" Minutes Left";
}
function incrementBreakTime(){
  currentBreakTime += increment;
}
function deccrementBreakTime(){
  currentBreakTime -= increment;
}

function setTimer() {
  if (!Break) {
    document.getElementById("state").innerText = "Time to work";
    document.getElementById("timer").innerHTML = count.toString()+" Minutes Left";
  } else {
    document.getElementById("state").innerText = "Break";
    document.getElementById("timer").innerHTML = count.toString()+" Minutes Left";
  }

  if (count <= 0 && !Break) {
    timeSwitchCall(currentBreakTime);
    Break = true;
  } else if (Break == true && count <= 0) {
    timeSwitchCall(currentWorkTime);
    Break = false;
  }
  count--;
}
function timeSwitchCall(timerLength) {
  clearInterval(timerInterval);
  count = timerLength; //break timer;
  toggleTimer(true);
}

let toggle = true;

//special permission to start timer if called with switcher
function toggleTimer(switcher){
  if(toggle || switcher){
    timerInterval = setInterval(setTimer, 1000);
    document.getElementById("start-btn").innerText = "Stop";
    toggle = false;
  }
  else{
    clearInterval(timerInterval);
    document.getElementById("start-btn").innerText = "Start";
    toggle = true;
  }
}

function resetTimer(){
  clearInterval(timerInterval);
  count = currentWorkTime;
  Break = false;
  document.getElementById("state").innerText = "Time to work";
  document.getElementById("timer").innerHTML = count.toString();
}
