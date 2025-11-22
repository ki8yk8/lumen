import Engine, { COLORS } from "./engine";
import { registerLevel1Scene } from "./scenes/level1";

const k = new Engine({
	width: window.innerWidth,
	height: window.innerHeight,
	canvas: document.getElementById("game-canvas"),
	backgroundColor: COLORS.BLACK,
});

registerLevel1Scene({ k });

k.go("level-1");
