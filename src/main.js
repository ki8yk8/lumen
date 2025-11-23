import Engine, { COLORS } from "./engine";
import registerInstructionsScene from "./scenes/instructions";
import { registerLevel1Scene } from "./scenes/level1";
import { registerLevel2Scene } from "./scenes/level2";
import { registerLevel3Scene } from "./scenes/level3";
import { registerLevel4Scene } from "./scenes/level4";
import registerMainMenuScene from "./scenes/mainmenu";

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
registerMainMenuScene({ k });
registerInstructionsScene({ k });

k.go("level-1");
