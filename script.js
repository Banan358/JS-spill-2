import { setupGround, updateGround } from './ground.js'
import { setupDino, updateDino } from './dino.js'
import { setupCactus, updateCactus } from './cactus.js'

const WORLD_WIDTH = 100;
const WORLD_HEIGHT = 30;
const SPEED_SCALE_INCREASE = 0.00001

const worldELm = document.querySelector('.world');
const scoreElm = document.querySelector('.score');
const startScreenElm = document.querySelector('.start-screen');

setPixelToWorldScale()
window.addEventListener('resize', setPixelToWorldScale)
document.addEventListener("keydown", handleStart, { once: true })

// gjør sånn at dinosauren ikke beverger seg fortere eller saktere avhengig av hvor mange frames per sekund det er
let lastTime
let speedScale
let score = 0
function update(time) {
    if (lastTime == null) {
        lastTime = time;
        window.requestAnimationFrame(update);
        return;
    }
    const delta = time - lastTime;
    
    updateGround(delta, speedScale);
    updateSpeedScale(delta);
    updateScore(delta);
    updateDino(delta, speedScale);
    updateCactus(delta, speedScale);
    
    lastTime = time;
    window.requestAnimationFrame(update);
}


function updateSpeedScale(delta) {
    speedScale += delta * SPEED_SCALE_INCREASE

}

function updateScore(delta) {
    score += delta * 0.01
    scoreElm.textContent = Math.floor(score)
}

 function handleStart() {
    lastTime = null
    speedScale = 1
    score = 0
    setupGround()
    setupDino()
    setupCactus()
    startScreenElm.classList.add("hide")
    window.requestAnimationFrame(update)
}


function setPixelToWorldScale() {
    let worldToPixelScale
    if (window.innerWidth / window.innerHeight < WORLD_WIDTH / WORLD_HEIGHT) {
        worldToPixelScale = window.innerWidth / WORLD_WIDTH
    } else {
        worldToPixelScale = window.innerHeight / WORLD_HEIGHT
    }

    worldELm.style.width = WORLD_WIDTH * worldToPixelScale + 'px'
    worldELm.style.height = WORLD_HEIGHT * worldToPixelScale + 'px'
}
