import { vec2 } from "../engine/vec2";

export default function Ray({
	pos = vec2(100, 100),
	speed = 100,
	spawnrate = 0.5,
	angle = 0,
	k,
	c,
}) {
	const laser_light = k.add([
		k.rect(70, 25, { radius: 6 }),
		k.rotate(0),
		k.pos(pos),
		k.color("#BEC8B9"),
	]);
	k.add([
		k.rect(25, 15, { radius: [0, 0, 5, 5] }),
		k.pos(laser_light.pos.sub(0, 5)),
		k.color("RED"),
	]);

	function spawnPhoton() {
		const ray = k.add([
			k.rect(10, 5, {
				radius: 5,
			}),
			k.pos(pos.add(laser_light.width / 2, 0)),
			k.color("RED"),
			k.rotate(angle),
			k.area(),
			"ray",
		]);

		const vel = k.vec2(speed, 0).rotate(angle);
		ray.vel = vel;

		ray.onCollide("mirror", (mirror) => {
			const [a_r, a_m] = [ray.angle, mirror.angle];

			const angle = 2 * a_m - a_r;
			ray.angle = angle;
			const vel = k.vec2(speed, 0).rotate(angle);
			ray.vel = vel;
		});

		k.onUpdate(() => {
			// if ray is outside then delete it
			if (
				ray.pos.x > k.width() + 100 ||
				ray.pos.y > k.height() + 100 ||
				ray.pos.x < -100 ||
				ray.pos.y < -100
			) {
				ray.exists() && k.destroy(ray);
			}
		});
	}

	k.loop(spawnrate, spawnPhoton);
}
