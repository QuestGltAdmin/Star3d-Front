import zapAudio from './laser.mp3'
import engineAudio from './engine.mp3'
import engine2Audio from './engine2.mp3'
import bgAudio from './bg.mp3'
import warpAudio from './warp.mp3'
import clickAudio from './click.mp3'
import explosionAudio from './explosion.mp3'
import bgAudio_1 from "./ambient_inspiration.mp3"

const mp3 = { explosion: explosionAudio }

const zap = new Audio(zapAudio)
const engine = new Audio(engineAudio)
const engine2 = new Audio(engine2Audio)
const bg = new Audio(bgAudio)
const bg_1 = new Audio(bgAudio_1)
const warp = new Audio(warpAudio)
const click = new Audio(clickAudio)
const explosion = new Audio(explosionAudio)

export { zap, engine, engine2, bg, bg_1, warp, click, explosion, mp3 }
