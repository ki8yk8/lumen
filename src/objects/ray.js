import { vec2 } from "../engine/vec2";

export default function Ray({
	start_pos = vec2(100, 100),
	speed = 100,
	spawnrate = 0.5,
	rotate = 0,
	k,
	c,
}) {
	function spawnPhoton() {
		const ray = k.add([
			k.rect(10, 10, {
				radius: 5,
			}),
			k.pos(start_pos),
			k.color("WHITE"),
			k.rotate(rotate),
			"ray",
		]);

		const vel = k.vec2(speed, 0).rotate(rotate);
		ray.vel = vel;
	}

	k.loop(spawnrate, spawnPhoton);
}
