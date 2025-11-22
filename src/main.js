import Engine, { COLORS } from "./engine";
import { vec2 } from "./engine/vec2";
import Mirror from "./objects/mirror";
import Ray from "./objects/ray";

const k = new Engine({
	width: window.innerWidth,
	height: window.innerHeight,
	canvas: document.getElementById("game-canvas"),
	backgroundColor: COLORS.BLACK,
});

const ray = Ray({
	k,
	angle: 0,
	speed: 100,
	spawnrate: 0.2,
	pos: vec2(100, 300),
});
const mirror_1 = Mirror({ k, angle: 45, pos: vec2(300, 300) });
