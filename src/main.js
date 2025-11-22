import Engine, { COLORS } from "./engine";

const k = new Engine({
	width: window.innerWidth,
	height: window.innerHeight,
	canvas: document.getElementById("game-canvas"),
	backgroundColor: COLORS.BLACK,
});

const boundary_wall = k.add([
	k.rect(200, 10),
	k.color("RED"),
	k.pos(100, 100),
	k.anchor("center"),
]);
