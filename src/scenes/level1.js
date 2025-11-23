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
			target: 10,
			onComplete: () => k.go("level-2"),
			onHit: () => (helper.target_achieved = true),
		});

		const timer = k.add([
			k.text("Time: 1:10"),
			k.pos(k.width() - 60, 60),
			k.anchor("topright"),
			k.color("SKYBLUE"),
			k.timer(70, handleTimeOver, handleTimeChange),
		]);

		timer.start();
		function handleTimeOver() {
			k.go("mainmenu");
		}
		function handleTimeChange(time) {
			timer.text = `Time: ${Math.floor(time / 60)}:${time % 60}`;
			timer.loaded = false;
		}

		Mirror({ k, angle: 15, pos: vec2(600, 150) });

		// player should be at the top
		Player({ k, pos: vec2(100, 100) });

		const helper = Helper({ k });
	});
}
