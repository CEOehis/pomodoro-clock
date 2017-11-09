'use strict'
let minute = document.getElementById('minute');
let second = document.getElementById('second');
let breakDiv = document.getElementById('break');

const durationUp = document.getElementById('session-up');
const durationDown = document.getElementById('session-down');
const breakUp = document.getElementById('break-up');
const breakDown = document.getElementById('break-down');

const play = document.getElementById('play');
const pause = document.getElementById('pause');
const stop = document.getElementById('stop');
const reset = document.getElementById('reset');

let whichCountDown = document.getElementById('session-name');

var timeInterval
var timeLeft;
var duration;
var isCountdownSession = true;
function startCountdown() {
  // disable other buttons
  disableButtons([play, durationUp, durationDown, breakUp, breakDown]);

  duration = duration ? duration : (minute.textContent * 60000);
  duration = Date.now() + duration;
  function updateCounter() {
    timeLeft = getRemainingTime(duration);
    minute.innerHTML = ('0' + timeLeft.minutes).slice(-2);
    second.innerHTML = ('0' + timeLeft.seconds).slice(-2);
    
    if (timeLeft.total <= 1000) {
      clearInterval(timeInterval);
      duration = void 0;
      nextCountdown();
    }
  }

  function nextCountdown() {
    if(isCountdownSession) {
      whichCountDown.textContent = 'Break';
      duration = breakDiv.textContent * 60000;
      isCountdownSession = false;
    } else {   
      whichCountDown.textContent = 'Session';
      isCountdownSession = true;
      stopPomodoro();
    }
    startCountdown()
  }

  timeInterval = setInterval(updateCounter, 1000);

  function getRemainingTime(endtime) {
    let now = new Date().getTime();
    let total = endtime - now;

    let seconds = Math.floor((total/1000) % 60);
    let minutes = Math.floor((total/1000/60) % 60);
    let hours = Math.floor((total/(1000*60*60)) % 24);
    let days = Math.floor(total/(1000*60*60*24));

    return {
      total: total,
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds
    }
  }
}

function disableButtons(arrayOfButtons) {
  for(var i = 0 ; i < arrayOfButtons.length; i++) {
    arrayOfButtons[i].disabled = true;
  }
}

function enableButtons(arrayOfButtons) {
  for(var i = 0 ; i < arrayOfButtons.length; i++) {
    arrayOfButtons[i].disabled = false;
  }
}

function oneDown (id) {
  let counter = document.getElementById(id)
  if (counter.textContent == 1) return
  else counter.textContent--
  if(id == 'session') {
    let minute = document.getElementById('minute')
    minute.textContent = ('0' + counter.textContent).slice(-2);
  }
}

function oneUp (id) {
  let counter = document.getElementById(id)
  if (counter.textContent == 60)  return
  else counter.textContent++  
  if(id == 'session') {
    let minute = document.getElementById('minute');
    minute.textContent = ('0' + counter.textContent).slice(-2);
  }
}

function pauseTime() {
  clearInterval(timeInterval);
  enableButtons([play]);
  if(duration) duration = timeLeft.total;
}

function stopPomodoro() {
  pauseTime();
  enableButtons([play, durationUp, durationDown, breakUp, breakDown]);
  let sessionDiv = document.getElementById('session');
  minute.textContent = ('0' + sessionDiv.textContent).slice(-2);
  second.innerHTML = '00';
  timeInterval = void 0;
  timeLeft = void 0;
  duration = void 0;
}

function resetPomodoro() {
  pauseTime()
  enableButtons([play, durationUp, durationDown, breakUp, breakDown]);
  let sessionDiv = document.getElementById('session');
  sessionDiv.textContent = '25';
  minute.textContent = '25';
  second.innerHTML = '00';
  timeInterval = void 0;
  timeLeft = void 0;
  duration = void 0;
}

play.addEventListener('click', startCountdown);

pause.addEventListener('click', pauseTime);

stop.addEventListener('click', stopPomodoro);

reset.addEventListener('click', resetPomodoro);



durationUp.addEventListener('click', () => oneUp('session'));
durationDown.addEventListener('click', () => oneDown('session'));
breakUp.addEventListener('click', () => oneUp('break'));
breakDown.addEventListener('click', () => oneDown('break'));
