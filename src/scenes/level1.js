import { vec2 } from "../engine/vec2";
import Helper from "../objects/helper";
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
			pos: vec2(100, 150),
		});
		Target({
			k,
			pos: k.vec2(400, 400),
			target: 2,
			onComplete: () => k.go("level-2"),
			onHit: () => (helper.target_achieved = true),
		});

		Mirror({ k, angle: 60, pos: vec2(600, 150) });

		// player should be at the top
		Player({ k, pos: vec2(100, 100) });

		const helper = Helper({ k });
	});
}
