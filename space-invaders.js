
console.log('welcome to halo space invaders')

// my elements

const grid = document.querySelector('.grid')
let gameStatus = document.getElementById('gamestatus')
let gameOverText = document.getElementById('gameover')
const width = 15
let cells = []
let player = []
let playerLaser = null
let laserCommand = false
let enemyShips = []
let enemyLaser = []
let direction = 1

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

player.push(215)
cells[player].classList.add('player-image')

//add enemy ships to board

enemyShips.push(47, 48, 49, 50, 51, 52, 53, 54, 55, 62, 63, 64, 65, 66, 67, 68, 69, 70)
enemyShips.forEach(ship => cells[ship].classList.add('enemy-ship-image'))

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
  } else if (key === 's') {
    gameStart = true
    console.log('Game Start!')
  }


  // player movement logic

})
// player firing laser
function laserFiring() {
  if (gameStart === true && laserCommand === true) {
    console.log('fire command recognised')
    playerLaser = player
  }

  const hitDetectionInterval = setInterval(() => {

    if (playerLaser !== cells[enemyShips]) {
      cells[playerLaser].classList.remove('player-laser-image')
      playerLaser = playerLaser - width
      cells[playerLaser].classList.add('player-laser-image')
    } if (cells[playerLaser].classList.contains('enemy-ship-image')) {
      cells[playerLaser].classList.remove('player-laser-image')
      cells[playerLaser].classList.remove('enemy-ship-image')
      console.log('ship hit')
      enemyShips = enemyShips.filter((enemyShip) => {
        return enemyShip !== playerLaser
      })
      playerLaser = null
      laserCommand = false
      clearInterval(hitDetectionInterval)
    } else if (playerLaser < 15) {
      cells[playerLaser].classList.remove('player-laser-image')
      playerLaser = null
      laserCommand = false
      clearInterval(hitDetectionInterval)
      console.log('player hit ceiling')
    }
  }, 200)

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
    cells[enemyLaser].classList.add('player-laser-image')
    enemyLaserFiring()
  }
}, 2500)


// enemy laser firing

function enemyLaserFiring() {
  const enemyLaserFiringInterval = setInterval(() => {
    if (!(cells[enemyLaser] === cells[player]) && !(enemyLaser > (width ** 2) - width - 1)) {
      cells[enemyLaser].classList.remove('player-laser-image')
      enemyLaser = enemyLaser + width
      cells[enemyLaser].classList.add('player-laser-image')
    }
    for (let i = 0; i < player.length; i++) {

      // if laser hits floor
      if (enemyLaser > (width ** 2) - width - 1) {
        console.log('enemy laser hit floor')
        cells[enemyLaser].classList.remove('player-laser-image')
        clearInterval(enemyLaserFiringInterval)
      }
    }
    // if laser hits player
    if (cells[enemyLaser] === cells[player]) {
      clearInterval(enemyAttackSelectionInterval)
      cells[enemyLaser].classList.remove('player-laser-image')
      gameOver()
    }
  }, 200)


  // game over functions

  function gameOver() {
    clearInterval(enemyInterval, enemyLaserFiringInterval)
    console.log('GAME OVER')
    cells[player].classList.remove('player-image')
    gameStatus.innerHTML = 'Status: KIA'
    gameOverText.innerHTML = 'GAME OVER'
    gameStart = false
  }

}




