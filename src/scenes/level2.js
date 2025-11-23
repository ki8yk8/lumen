import Ray from "../objects/ray";
import Target from "../objects/target";
import Mirror from "../objects/mirror";
import Player from "../objects/player";
import { vec2 } from "../engine/vec2";
import Obstacle from "../objects/obstacles";

export function registerLevel2Scene({ k }) {
	k.scene("level-2", () => {
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
			target: 10,
			onComplete: () => k.go("level-3"),
		});

		Mirror({ k, angle: 15, pos: vec2(600, 200) });
		Mirror({ k, angle: 40, pos: vec2(800, 500) });

		Obstacle({ k, width: 150, pos: k.vec2(500, 400), angle: 0 });
		Obstacle({k, width: 50, pos: k.vec2(500+75, 400+20), angle: 90});

		// player should be at the top
		const player = Player({ k, pos: vec2(90, 90) });

		k.onUpdate(() => {
			// console.log(player.pos);
		})
	});
}
