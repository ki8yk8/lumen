import { vec2 } from "../engine/vec2";
import Mirror from "../objects/mirror";
import Player from "../objects/player";
import Ray from "../objects/ray";
import Target from "../objects/target";

export function registerLevel1Scene({ k }) {
	k.scene("level-1", () => {
		Ray({
			k,
			angle: 0,
			speed: 100,
			spawnrate: 0.2,
			pos: vec2(100, 200),
		});
		Target({
			k,
			pos: k.vec2(500, 500),
			target: 2,
			onComplete: () => k.go("level-2"),
		});

		Mirror({ k, angle: 15, pos: vec2(600, 200) });

		// player should be at the top
		Player({ k, pos: vec2(100, 100) });
	});
}
