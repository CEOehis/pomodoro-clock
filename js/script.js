'use strict'
let clock = document.getElementById('display');
let minute = document.getElementById('minute');
let second = document.getElementById('second');
var timeInterval
var timeLeft;
var duration;
function startCountdown() {
    if(duration) {
      duration = duration;
      duration = Date.now() + duration;
    } else {
      duration = minute.textContent * 60000;
      duration = Date.now() + duration;
    }
  function updateCounter() {
    // duration = duration ? duration : Date.now() + minute.textContent * 60000\

    timeLeft = getRemainingTime(duration);
    minute.innerHTML = ('0' + timeLeft.minutes).slice(-2);
    second.innerHTML = ('0' + timeLeft.seconds).slice(-2);
    
    if (timeLeft.total <= 1000) {
      clearInterval(timeInterval);
      duration = void 0;
    }
  }

  updateCounter() 
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
    let minute = document.getElementById('minute')
    minute.textContent = counter.textContent;
  }
}

function pauseTime() {
  clearInterval(timeInterval);
  if(duration) duration = timeLeft.total;
}

const play = document.getElementById('play');
play.addEventListener('click', startCountdown);

const pause = document.getElementById('pause');
pause.addEventListener('click', pauseTime);

const durationUp = document.getElementById('session-up');
const durationDown = document.getElementById('session-down');
durationUp.addEventListener('click', () => oneUp('session'));
durationDown.addEventListener('click', () => oneDown('session'));
