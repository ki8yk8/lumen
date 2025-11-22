import Engine, { COLORS } from "./engine";
import Ray from "./objects/ray";

const k = new Engine({
	width: window.innerWidth,
	height: window.innerHeight,
	canvas: document.getElementById("game-canvas"),
	backgroundColor: COLORS.BLACK,
});

const ray = Ray({ k });
