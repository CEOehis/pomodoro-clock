var deadline = Date.now() + (25 * 60000)

function getRemainingTime (endtime) {
  var now = new Date().getTime()
  var t = endtime - now
  var seconds = Math.floor((t / 1000) % 60)
  var minutes = Math.floor((t / 1000 / 60) % 60)
  var hours = Math.floor((t / (1000 * 60 * 60)) % 24)
  var days = Math.floor(t / (1000 * 60 * 60 * 24))
  return {
    'total': t,
    'days': days,
    'hours': hours,
    'minutes': minutes,
    'seconds': seconds
  }
}

function initializeClock (id, endtime) {
  var clock = document.getElementById(id)
  var minutes = clock.querySelector('.minutes')
  var seconds = clock.querySelector('.seconds')
  function updateClock () {
    var t = getRemainingTime(endtime)
    minutes.innerHTML = ('0' + t.minutes).slice(-2)
    seconds.innerHTML = ('0' + t.seconds).slice(-2)

    if (t.total <= 0) {
      clearInterval(timeInterval)
    }
  }
  updateClock()
  var timeInterval = setInterval(updateClock, 1000)
}

function down (id) {
  var counter = document.getElementById(id)
  if (counter.textContent == 1) return
  else counter.textContent--
}

function up (id) {
  var counter = document.getElementById(id)
  counter.textContent++
}

document.addEventListener('DOMContentLoaded', function () {
  var play = document.getElementById('play')
  play.addEventListener('click', function () { initializeClock('display', deadline) })

  var pause = document.getElementById('pause')
  pause.addEventListener('click', function () { initializeClock('display', deadline) })

  var sessionUp = document.getElementById('session-up')
  sessionUp.addEventListener('click', function () { up('session') })

  var sessionDown = document.getElementById('session-down')
  sessionDown.addEventListener('click', function () { down('session') })

  var breakUp = document.getElementById('break-up')
  breakUp.addEventListener('click', function () { up('break') })

  var breakDown = document.getElementById('break-down')
  breakDown.addEventListener('click', function () { down('break') })
})
