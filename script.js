import { setupGround, updateGround } from './ground.js'

const WORLD_WIDTH = 100;
const WORLD_HEIGHT = 30;
const worldELm = document.querySelector('.world');

setPixelToWorldScale()
window.addEventListener('resize', setPixelToWorldScale)

setupGround()

// gjør sånn at dinosauren ikke beverger seg fortere eller saktere avhengig av hvor mange frames per sekund det er
let lastTime = 0
function update(time) {
    if (lastTime === 0) {
        lastTime = time
        window.requestAnimationFrame(update)
        return
    }
    const delta = time - lastTime
    
    updateGround(delta, 1)
    
    lastTime = time
    window.requestAnimationFrame(update)
}
window.requestAnimationFrame(update)

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
