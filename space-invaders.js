
console.log('welcome to halo space invaders')

// my elements

const grid = document.querySelector('.grid')
const width = 15
let cells = []
let player = 215
let playerLaser = null
let enemyShips = []
let enemyLaser = []
let direction = 1

// creating the grid

for (let index = 0; index < width ** 2; index++) {
  const div = document.createElement('div')
  grid.appendChild(div)
  cells.push(div)
}
let movePlayer = null
let firePlayerLaser = null
let gameStart = false
let moveEnemyShips = 'right'

//add player to board

cells[player].classList.add('player-image')

//add enemy ships to board
enemyShips.push(62, 63, 64, 65, 66, 67, 68, 69, 70)
enemyShips.forEach(ship => cells[ship].classList.add('enemy-ship-image'))
console.log(enemyShips)

//controls

document.addEventListener('keydown', (event) => {
  const key = event.key

  //command to move left
  if (key === 'a' && !(player % width === 0) && movePlayer !== 'right') {
    movePlayer = 'left'
    //command to move right
  } else if (key === 'd' && !(player % width === width - 1) && movePlayer !== 'left') {
    movePlayer = 'right'
    // command to fire laser
  } else if (key === 'f') {
    firePlayerLaser = 'fire'
    //starts the game
  } else if (key === 's') {
    gameStart = true
  } else {
    console.log('no key')
  }

  //check if enemy ships can move left, right or down

  const leftWall = (enemyShips[0] % width === 0)
  const rightWall = (enemyShips[enemyShips.length - 1] % width === width - 1)

  const enemyInterval = setInterval(() => {
    if (leftWall) {
      direction = 1
    } else if (rightWall) {
      direction = -1
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
    
    for (let i = 0; i < 225; i++) {
      if (leftWall && direction === - 1 || rightWall && direction === 1) {
        direction = width
      }
    }
  }, 500)

  // enemy ships automatic movement logic


  // move the player left and right
  if (movePlayer === 'left') {
    cells[player].classList.remove('player-image')
    player -= 1
    cells[player].classList.add('player-image')
    movePlayer = null
    console.log(player)
  } else if (movePlayer === 'right') {
    cells[player].classList.remove('player-image')
    player += 1
    cells[player].classList.add('player-image')
    movePlayer = null
    console.log(player[0])
  }

  //firing player laser  
  if (firePlayerLaser === 'fire') {
    console.log('fire command recognised')
    playerLaser = player - width
    cells[playerLaser].classList.add('player-laser-image')
    laserFiring()
  }

  function laserFiring() {
    const laserFiringInterval = setInterval(() => {
      if (firePlayerLaser === 'fire') {
        cells[playerLaser].classList.remove('player-laser-image')
        playerLaser = playerLaser - width
        cells[playerLaser].classList.add('player-laser-image')
      }
    }, 100)
  }

})


