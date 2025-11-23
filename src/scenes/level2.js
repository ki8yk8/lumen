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
		Obstacle({ k, width: 50, pos: k.vec2(500 + 75, 400 + 20), angle: 90 });

		const timer = k.add([
			k.text("Time: 2:00"),
			k.pos(k.width() - 60, 60),
			k.anchor("topright"),
			k.color("SKYBLUE"),
			k.timer(120, handleTimeOver, handleTimeChange),
		]);

		timer.start();
		function handleTimeOver() {
			k.go("mainmenu");
		}
		function handleTimeChange(time) {
			timer.text = `Time: ${Math.floor(time / 60)}:${time % 60}`;
			timer.loaded = false;
		}

		// player should be at the top
		const player = Player({ k, pos: vec2(90, 90) });

		k.onUpdate(() => {
			// console.log(player.pos);
		});
	});
}
