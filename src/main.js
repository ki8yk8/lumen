import Engine, { COLORS } from "./engine";
import { registerLevel1Scene } from "./scenes/level1";
import { registerLevel2Scene } from "./scenes/level2";

const k = new Engine({
	width: window.innerWidth,
	height: window.innerHeight,
	canvas: document.getElementById("game-canvas"),
	backgroundColor: COLORS.BLACK,
});

k.loadSprite("player", "/sprites/player.png");

registerLevel1Scene({ k });
registerLevel2Scene({ k });

k.go("level-2");
