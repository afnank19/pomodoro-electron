let count = 10;
let timerInterval;
let Break = false;
let increment = 5;

document.getElementById("timer").innerHTML = count.toString();

function incrementTime(){
    count = count+increment;
    document.getElementById("timer").innerHTML = count.toString();
}

function setTimer() {
  if (!Break) {
    document.getElementById("state").innerText = "Time to work";
    document.getElementById("timer").innerHTML = count.toString();
}else{
      document.getElementById("state").innerText = "Break";
    document.getElementById("timer").innerHTML = count.toString();
  }

  if (count <= 0 && !Break) {
    timeSwitchCall(3)
    Break = true;
  }else if(Break == true && count <= 0){
    timeSwitchCall(10)
    Break = false;
  }
  count--;
}
function timeSwitchCall(timerLength){
    clearInterval(timerInterval);
    count = timerLength; //break timer;
    startTimer();
}

function startTimer() {
  timerInterval = setInterval(setTimer, 1000);
}

function stopTimer() {
  console.log("stop");
  clearInterval(timerInterval);
}
