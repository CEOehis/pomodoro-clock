'use strict'
let clock = document.getElementById('display');
let minute = document.getElementById('minute');
let second = document.getElementById('second');
function startCountdown(duration) {
  function updateCounter() {
    let timeLeft = getRemainingTime(duration);
    minute.innerHTML = ('0' + timeLeft.minutes).slice(-2);
    second.innerHTML = ('0' + timeLeft.seconds).slice(-2);
    
    if (timeLeft.seconds <= 0) {
      clearInterval(timeInterval);
    }
  }

  updateCounter() 
  let timeInterval = setInterval(updateCounter, 1000);
}

function getRemainingTime(endtime) {
  let now = new Date().getTime();
  let duration = endtime - now;

  let seconds = Math.floor((duration/1000) % 60);
  let minutes = Math.floor((duration/1000/60) % 60);
  let hours = Math.floor((duration/(1000*60*60)) % 24);
  let days = Math.floor(duration/(1000*60*60*24));

  return {
    total: duration,
    days: days,
    hours: hours,
    minutes: minutes,
    seconds: seconds
  }
}

startCountdown(Date.now() + 1 * 30000);