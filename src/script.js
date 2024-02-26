// --text: #120b0c;
// --background: #faf4f5;
// --primary: #ba4965;
// --secondary: #de8da1;
// --accent: #de607f; pink colour scheme


let count = 25;
let currentWorkTime = count;
let currentBreakTime = 5;
let timerInterval;
let Break = false;
let increment = 5;
let audio = new Audio("res/ps_app.mp3")
let ambience = new Audio("res/mc_ambience.mp3")
let focusStreak = 0;

//Sets the bottom date on the Main Card (Fires every minute)
setInterval(()=>{
  var time = new Date()
  const month = time.toLocaleString('default', { month: 'long' });
  document.getElementById("clock").innerHTML = time.toLocaleTimeString()
  document.getElementById("date").innerHTML = time.toLocaleDateString()
  document.getElementById("month").innerHTML = "//"+month
}, 1000)

document.getElementById("timer").innerHTML = count.toString()+" Minutes Left";


//Increment/Decrement functions for the focus and break timer, called from their respective buttons
function incrementTime() {
  //count = count + increment;
  currentWorkTime += increment;
  count = currentWorkTime;
  document.getElementById("timer").innerHTML = currentWorkTime.toString()+" Minutes Left";
  document.getElementById("control-panel-timer").innerHTML = currentWorkTime.toString();
}
function decrementTime() {
  //count = count - increment;
  currentWorkTime -= increment;
  if (currentWorkTime <= 0) {
    currentWorkTime += increment;
  }
  count = currentWorkTime;
  document.getElementById("timer").innerHTML = currentWorkTime.toString()+" Minutes Left";
  document.getElementById("control-panel-timer").innerHTML = currentWorkTime.toString();
}
function incrementBreakTime(){
  currentBreakTime += increment;
  if (currentBreakTime >= 65) {
    currentBreakTime -= increment;
  }
  document.getElementById("control-panel-br-timer").innerHTML = currentBreakTime.toString();
}
function decrementBreakTime(){
  currentBreakTime -= increment;
  if (currentBreakTime <= 0) {
    currentBreakTime += increment;
  }
  document.getElementById("control-panel-br-timer").innerHTML = currentBreakTime.toString();
}


//Main timer function that alternates between focus and break time and also calls other functions inside to change labels and values
let countTo60 = 0;
function setTimer() {
  if (count <= 0 && !Break) {
    timeSwitchCall(currentBreakTime);
    Break = true;
    lifetimeHours(currentWorkTime);
  } else if (Break == true && count <= 0) {
    timeSwitchCall(currentWorkTime);
    Break = false;
    lifetimeBreakHours(currentBreakTime)
  }

  if (!Break) {
    document.getElementById("state").innerText = "Time to focus!";
    document.getElementById("timer").innerHTML = count.toString()+" Minutes Left";
    changeGojoOpacity(0);
  } else {
    document.getElementById("state").innerText = "Time for a break!";
    document.getElementById("timer").innerHTML = count.toString()+" Minutes Left";
    changeGojoOpacity(1);
  }
  countTo60++;
  console.log(countTo60);
  if(countTo60 >= 60){
    countTo60 = 0;
    console.log("minute passed")
    count--;
  }
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
    audio.play()
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
  changeGojoOpacity(0);
  count = currentWorkTime;
  Break = false;
  document.getElementById("state").innerText = "Time to work";
  document.getElementById("start-btn").innerText = "Start";
  toggle = true;
  document.getElementById("timer").innerHTML = count.toString() + " Minutes Left";
}



//GETS lifetime Minutes for focus and break times and then converts them to the appropriate format for display
let lifetimeMinutes = 0;
if(localStorage.getItem("lifetimeMinutes")){
  lifetimeMinutes = parseInt(localStorage.getItem("lifetimeMinutes"));

  document.getElementById("lifetime-hrs").innerHTML = "Lifetime hours studied: "+
  Math.floor(lifetimeMinutes/60)+" hrs " + 
  Math.ceil(lifetimeMinutes%60)+" min ";
}
function lifetimeHours(minutes){
  lifetimeMinutes += minutes;

  document.getElementById("lifetime-hrs").innerHTML = "Lifetime hours studied: "+
  Math.floor(lifetimeMinutes/60)+" hrs " + 
  Math.ceil(lifetimeMinutes%60)+" min ";

  localStorage.setItem("lifetimeMinutes", lifetimeMinutes);
}
let lifetimeBrMinutes = 0;
if(localStorage.getItem("lifetimeBrMinutes")){
  lifetimeBrMinutes = parseInt(localStorage.getItem("lifetimeBrMinutes"));

  document.getElementById("lifetime-br").innerHTML = "Lifetime break taken: "+
  Math.floor(lifetimeBrMinutes/60)+" hrs " + 
  Math.ceil(lifetimeBrMinutes%60)+" min ";
}
function lifetimeBreakHours(minutes){
  lifetimeBrMinutes += minutes;
  document.getElementById("lifetime-br").innerHTML = "Lifetime break taken: "+
  Math.floor(lifetimeBrMinutes/60)+" hrs " + 
  Math.ceil(lifetimeBrMinutes%60)+" min ";

  localStorage.setItem("lifetimeBrMinutes", lifetimeBrMinutes);
}


//PLAYS loaded ambience and acts a toggle / CHANGES ambience volume
let ambience_toggle = true
function playAmbience(){
  if(ambience_toggle){
    ambience.play()
    ambience.loop = true
    ambience_toggle = false;
    document.getElementById("amb-btn").innerHTML = "Pause Ambience"
  }else{
    ambience.pause()
    ambience_toggle = true
    document.getElementById("amb-btn").innerHTML = "Play Ambience"
  }
}
function changeAmbienceVolume(){
  var volumeSlider = document.getElementById("volume-slider");
  ambience.volume = volumeSlider.value
}

//ADDS class to Gojo for visibility(Opacity to 1) after each FOCUS period
function changeGojoOpacity(opacity){
  let gojo = document.getElementById("gojo");
  
  if(opacity === 1){
    gojo.classList.add("opacity-1");
  }
  else{
    gojo.classList.remove("opacity-1");
  }
}

//MAINTAINS daily focus integrity
if(localStorage.getItem("FOCUS_STREAK")){
  let today = new Date();
  let dayFromStorage = localStorage.getItem("FOCUS_STREAK");
  dayFromStorage = parseInt(dayFromStorage);
  
  if(today.getDate() - dayFromStorage == 1 || today.getDate() - dayFromStorage == -29 || today.getDate() - dayFromStorage == -30 || today.getDate() - dayFromStorage == -28){
    focusStreak++;
    document.getElementById("focus").innerHTML = "Daily Focus Streak: " + focusStreak + "🌞";
    localStorage.setItem("FOCUS_STREAK", today.getDay().toString());
  }
  else{
    focusStreak = 0;
  }
}
localStorage.setItem("FOCUS_STREAK", new Date().getDate())