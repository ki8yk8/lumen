import Engine, { COLORS } from "./engine";
import { registerLevel1Scene } from "./scenes/level1";
import { registerLevel2Scene } from "./scenes/level2";
import { registerLevel3Scene } from "./scenes/level3";
import { registerLevel4Scene } from "./scenes/level4";

const k = new Engine({
	width: window.innerWidth,
	height: window.innerHeight,
	canvas: document.getElementById("game-canvas"),
	backgroundColor: COLORS.BLACK,
});

k.loadSprite("player", "/sprites/player.png");

registerLevel1Scene({ k });
registerLevel2Scene({ k });
registerLevel3Scene({ k });
registerLevel4Scene({ k });

k.go("level-4");
