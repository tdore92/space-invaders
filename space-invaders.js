
console.log('welcome to halo space invaders')

const elements = {
  grid: document.querySelector('.grid'),
  width: 15,
  cells: [],
  player: 215,
  playerLaser: null,
  enemyShips: [],
  enemyLaser: [],
}

for (let index = 0; index < elements.width ** 2; index++) {
  const div = document.createElement('div')
  elements.grid.appendChild(div)
  elements.cells.push(div)
}
let movePlayer = null
let firePlayerLaser = null
let gameStart = false
let moveEnemyShips = 'right'

//add player to board

elements.cells[elements.player].classList.add('player-image')

//add enemy ships to board
elements.enemyShips.push(62, 63, 64, 65, 66, 67, 68, 69, 70)
elements.enemyShips.forEach(ship => elements.cells[ship].classList.add('enemy-ship-image'))
console.log(elements.enemyShips)

//controls

document.addEventListener('keydown', (event) => {
  const key = event.key

  //command to move left
  if (key === 'a' && !(elements.player % elements.width === 0) && movePlayer !== 'right') {
    movePlayer = 'left'
    //command to move right
  } else if (key === 'd' && !(elements.player % elements.width === elements.width - 1) && movePlayer !== 'left') {
    movePlayer = 'right'
    // command to fire laser
  } else if (key === 'f') {
    firePlayerLaser = 'fire'
    //starts the game
  } else if (key === 's') {
    gameStart = true
  }

  //check if enemy ships can move left, right or down
  const enemyInterval = setInterval(() => {
    for (let i = 0; i < 225; i++) {
      if ((elements.enemyShips[0] % elements.width === 0 )) {
        moveEnemyShips = 'right'
        console.log(moveEnemyShips)
      } else if ((elements.enemyShips[elements.enemyShips.length - 1] % elements.width === elements.width - 1)) {
        moveEnemyShips = 'left'
        console.log(moveEnemyShips)
      }
    }
  }, 1000)


  // enemy ships automatic movement logic
  const moveEnemiesInterval = setInterval(() => {
    //moving enemy ships right
    if (moveEnemyShips === 'right') {
      elements.enemyShips.forEach(ship => elements.cells[ship].classList.remove('enemy-ship-image'))
      elements.enemyShips.push(elements.enemyShips[8] + 1)
      elements.enemyShips.shift(elements.enemyShips[0] + 1)
      elements.enemyShips.forEach(ship => elements.cells[ship].classList.add('enemy-ship-image'))
      console.log(elements.enemyShips)
    } else if (moveEnemyShips === 'left') {
      elements.enemyShips.forEach(ship => elements.cells[ship].classList.remove('enemy-ship-image'))
      elements.enemyShips.pop()
      elements.enemyShips.unshift(elements.enemyShips[0] - 1)
      elements.enemyShips.forEach(ship => elements.cells[ship].classList.add('enemy-ship-image'))
      console.log(elements.enemyShips)
    } else if (moveEnemyShips === 'down') {
      elements.enemyShips.forEach(ship => elements.cells[ship].classList.remove('enemy-ship-image'))
      elements.enemyShips = elements.enemyShips + elements.width
      elements.enemyShips.forEach(ship => elements.cells[ship].classList.add('enemy-ship-image'))
    }
  }, 1000)

  // move the player left and right
  if (movePlayer === 'left') {
    elements.cells [elements.player].classList.remove('player-image')
    elements.player -= 1
    elements.cells[elements.player].classList.add('player-image')
    movePlayer = null
    console.log(elements.player)
  } else if (movePlayer === 'right') {
    elements.cells[elements.player].classList.remove('player-image')
    elements.player += 1
    elements.cells[elements.player].classList.add('player-image')
    movePlayer = null
    console.log(elements.player[0])
  }

  //firing player laser  
  if (firePlayerLaser === 'fire') {
    console.log('fire command recognised')
    elements.playerLaser = elements.player - elements.width
    elements.cells[elements.playerLaser].classList.add('player-laser-image')
  }

})


