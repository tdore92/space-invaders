
console.log('welcome to halo space invaders')

// my elements

const grid = document.querySelector('.grid')
let gameStatus = document.getElementById('gamestatus')
let enemyLength = document.getElementById('enemylength')
let roundStatus = document.getElementById('roundstatus')
const width = 16
let cells = []
let player = []
let playerLaser = null
let laserCommand = false
let enemyShips = []
let enemyLaser = []
let direction = 1
let rounds = 3
const musicPlayer = document.getElementById('music')
const sfxShootPlayer = document.getElementById('shoot')
const sfxEnemyKilled = document.getElementById('enemykilled')
const sfxPlayerKilled = document.getElementById('explosion')
const cortanaPlayerDead = document.getElementById('dead')

// creating the grid

for (let i = 0; i < width ** 2; i++) {
  const div = document.createElement('div')
  grid.appendChild(div)
  cells.push(div)
}

let movePlayer = null
// use to initiate cutscenes & start game
let gameStart = false

//add player to board

player.push(247)
cells[player].classList.add('player-image')

//add enemy ships to board

enemyShips.push(35, 36, 37, 38, 39, 40, 41, 42, 43, 51, 52, 53, 54, 55, 56, 57, 58, 59)
enemyShips.forEach(ship => cells[ship].classList.add('enemy-ship-image'))

enemyLength.innerHTML = 'Enemies Remaining: ' + enemyShips.length
roundStatus.innerHTML = 'Wave: ' + rounds

function enemyCount() {
  const shipCountInterval = setInterval(() => {
    if (enemyShips.length < 1 && rounds === 3) {
      enemyShips.forEach(ship => cells[ship].classList.remove('enemy-ship-image'))
      roundTwo()
    } else if (enemyShips.length < 1 && rounds === 2) {
      enemyShips.forEach(ship => cells[ship].classList.remove('enemy-ship-image'))
      roundThree()
    } else if (enemyShips.length < 1 && rounds === 1) {
      victory()
      clearInterval(shipCountInterval)
    }
  }, 100)
}

enemyCount()


function roundTwo() {
  gameStart = false
  enemyShips.push(19, 20, 21, 22, 23, 24, 25, 26, 27, 35, 36, 37, 38, 39, 40, 41, 42, 43, 51, 52, 53, 54, 55, 56, 57, 58, 59)
  enemyShips.forEach(ship => cells[ship].classList.add('enemy-ship-image'))
  rounds = 2
  enemyLength.innerHTML = 'Enemies Remaining: ' + enemyShips.length
  roundStatus.innerHTML = 'Wave: ' + rounds
  gameStart = true
}

function roundThree() {
  gameStart = false
  enemyShips.push(19, 20, 21, 22, 23, 24, 25, 26, 27, 35, 36, 37, 38, 39, 40, 41, 42, 43, 51, 52, 53, 54, 55, 56, 57, 58, 59)
  enemyShips.forEach(ship => cells[ship].classList.add('enemy-ship-image'))
  rounds = 1
  enemyLength.innerHTML = 'Enemies Remaining: ' + enemyShips.length
  roundStatus.innerHTML = 'Wave: ' + rounds
  gameStart = true
}

function victory() {
  console.log('VICTORY')
  gameStatus.innerHTML = 'Status: Mission Successful'
}

//controls

document.addEventListener('keydown', (event) => {
  const key = event.key

  //command to move left
  if (key === 'a' && !(player % width === 0)) {
    movePlayer = 'left'
    cells[player].classList.remove('player-image')
    player -= 1
    cells[player].classList.add('player-image')
    //command to move right
  } else if (key === 'd' && !(player % width === width - 1)) {
    movePlayer = 'right'
    cells[player].classList.remove('player-image')
    player++
    console.log(player)
    cells[player].classList.add('player-image')
    // command to fire laser
  } else if (key === ' ' && laserCommand === false) {
    laserCommand = true
    laserFiring()

    //starts the game
  }

  // player movement logic

})



function startGame() {

  gameStart = true
  console.log('Game Start!')
  playMusic()
}

function playMusic() {
  if (gameStart === true) {
    musicPlayer.src = 'sounds/Halo Infinite Official Retro 8 Bit Soundtrack (Clean Version).mp3'
    musicPlayer.play()
  }
}

function resetGame() {
  location.reload()
}

// player firing laser
function laserFiring() {
  if (laserCommand === true && gameStart === true) {
    console.log('fire command recognised')
    playerLaser = player
    sfxShootPlayer.src = 'sounds/shoot.wav'
    sfxShootPlayer.play()
  }

  const hitDetectionInterval = setInterval(() => {

    if (playerLaser !== cells[enemyShips]) {
      cells[playerLaser].classList.remove('player-laser-image')
      playerLaser = playerLaser - width
      cells[playerLaser].classList.add('player-laser-image')
    } if (cells[playerLaser].classList.contains('enemy-ship-image')) {
      cells[playerLaser].classList.remove('player-laser-image')
      cells[playerLaser].classList.remove('enemy-ship-image')
      sfxEnemyKilled.src = 'sounds/invaderkilled.wav'
      sfxEnemyKilled.play()
      enemyShips = enemyShips.filter((enemyShip) => {
        return enemyShip !== playerLaser
      })
      playerLaser = null
      laserCommand = false
      enemyLength.innerHTML = 'Enemies Remaining: ' + enemyShips.length
      clearInterval(hitDetectionInterval)
    } else if (playerLaser < 15) {
      cells[playerLaser].classList.remove('player-laser-image')
      playerLaser = null
      laserCommand = false
      clearInterval(hitDetectionInterval)
      console.log('player hit ceiling')
    }
  }, 100)

}

//check if enemy ships can move left, right or down

const enemyInterval = setInterval(() => {
  if (gameStart === true) {
    const leftWall = (enemyShips[0] % width === 0)
    const rightWall = (enemyShips[enemyShips.length - 1] % width === width - 1)
    if (leftWall && direction === width) {
      direction = 1
      console.log('direction is ' + direction)
    } else if (rightWall && direction === width) {
      direction = -1
      console.log('direction is ' + direction)
    }

    if (leftWall && direction === - 1 || rightWall && direction === 1) {
      direction = width
    }
    for (let i = 0; i < enemyShips.length; i++) {
      cells[enemyShips[i]].classList.remove('enemy-ship-image')
    }
    for (let i = 0; i < enemyShips.length; i++) {
      enemyShips[i] += direction
    }
    for (let i = 0; i < enemyShips.length; i++) {
      cells[enemyShips[i]].classList.add('enemy-ship-image')
    }
  }
}, 500)

// firing enemy lasers

//randomly select enemy ship to fire laser

const enemyAttackSelectionInterval = setInterval(() => {
  if (gameStart === true) {
    enemyLaser = enemyShips[Math.floor(enemyShips.length * Math.random())]
    enemyLaser = enemyLaser + width
    cells[enemyLaser].classList.add('enemy-laser-image')
    enemyLaserFiring()
  }
}, 2500)


// enemy laser firing

function enemyLaserFiring() {
  const enemyLaserFiringInterval = setInterval(() => {
    if (!(cells[enemyLaser] === cells[player]) && !(enemyLaser > (width ** 2) - width - 1)) {
      cells[enemyLaser].classList.remove('enemy-laser-image')
      enemyLaser = enemyLaser + width
      cells[enemyLaser].classList.add('enemy-laser-image')
    }


    // if laser hits floor
    if (enemyLaser > (width ** 2) - width - 1) {
      console.log('enemy laser hit floor')
      cells[enemyLaser].classList.remove('enemy-laser-image')
      clearInterval(enemyLaserFiringInterval)
    }

    // if laser hits player
    if (cells[enemyLaser] === cells[player]) {
      clearInterval(enemyAttackSelectionInterval)
      cells[enemyLaser].classList.remove('enemy-laser-image')
      gameOver()
      sfxPlayerKilled.src = '/sounds/explosion.wav'
      sfxPlayerKilled.play()
    }
  }, 200)
}

// game over functions

function gameOver() {
  clearInterval(enemyInterval)
  console.log('GAME OVER')
  cells[player].classList.remove('player-image')
  gameStatus.innerHTML = 'Mission Status: KIA'
  gameStart = false
  musicPlayer.pause()
  cortanaPlayerDead.src = '/sounds/cortana-dead.wav'
  cortanaPlayerDead.play()
}






