
console.log('welcome to halo space invaders')

// my elements

const grid = document.querySelector('.grid')
const width = 15
let cells = []
let player = []
let playerLaser = []
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
// use for cutscenes
let gameStart = false

//add player to board

player.push(215)
cells[player].classList.add('player-image')

//add enemy ships to board

enemyShips.push(62, 63, 64, 65, 66, 67, 68, 69, 70)
enemyShips.forEach(ship => cells[ship].classList.add('enemy-ship-image'))

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

  const enemyInterval = setInterval(() => {
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
      for (let i = 0; i < enemyShips.length; i++) {
        if (cells[playerLaser] === cells[enemyShips[i]]) {
          enemyShips.splice(i, 1)
          clearInterval(laserFiringInterval)
          cells[playerLaser].classList.remove('player-laser-image')
        }
      }
    }, 200)
  }

  // firing enemy lasers

  //randomly select enemy ship to fire laser

  const enemyAttackSelectionInterval = setInterval(() => {
    enemyLaser = enemyShips[Math.floor(enemyShips.length * Math.random())]
    enemyLaser = enemyLaser + width
    cells[enemyLaser].classList.add('player-laser-image')
    enemyLaserFiring()
  }, 2500)

  // enemy laser firing

  function enemyLaserFiring() {
    const enemyLaserFiringInterval = setInterval(() => {
      cells[enemyLaser].classList.remove('player-laser-image')
      enemyLaser = enemyLaser + width
      cells[enemyLaser].classList.add('player-laser-image')
      for (let i = 0; i < player.length; i++) {
        if (cells[enemyLaser] === cells[player]) {
          console.log('player dead!')
          clearInterval(enemyLaserFiringInterval)
          gameOver()
        } else if (enemyLaser > (width ** 2) - width - 1) {
          console.log('remove laser')
          cells[enemyLaser].classList.remove('player-laser-image')
          clearInterval(enemyLaserFiringInterval)
        }
      }
    }, 200)

    function gameOver() {
      clearInterval(enemyInterval, enemyAttackSelectionInterval, enemyLaserFiringInterval)
    }


  }
})


