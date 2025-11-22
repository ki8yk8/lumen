import Engine, { COLORS } from "./engine";
import { vec2 } from "./engine/vec2";
import Mirror from "./objects/mirror";
import Player from "./objects/player";
import Ray from "./objects/ray";
import Target from "./objects/target";

const k = new Engine({
	width: window.innerWidth,
	height: window.innerHeight,
	canvas: document.getElementById("game-canvas"),
	backgroundColor: COLORS.BLACK,
});

// level 1 with the simple scene
const player = Player({ k });
const laser_light = k.add([
	k.rect(50, 25),
	k.rotate(0),
	k.pos(100, 200),
	k.color(255, 0, 255),
]);
const ray_source = Ray({
	k,
	angle: 0,
	speed: 100,
	spawnrate: 0.2,
	pos: vec2(laser_light.pos.x + laser_light.width / 2, laser_light.pos.y),
});
const target = Target({ k, pos: k.vec2(500, 500), target: 20 });

const mirror = Mirror({ k, angle: 15, pos: vec2(600, 200) });
