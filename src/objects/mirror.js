export default function Mirror({ k, pos, angle, rotation_speed = 90 }) {
	const mirror = k.add([
		k.rect(100, 10),
		k.pos(pos),
		k.rotate(angle),
		k.color("WHITE"),
		k.anchor("center"),
		k.area(),
		"mirror",
	]);

	k.onKeyPressed("ArrowUp", () => {
		if (mirror.checkCollision("player")) {
			mirror.angle += rotation_speed * k.dt;
		}
	});
	k.onKeyPressed("ArrowDown", () => {
		if (mirror.checkCollision("player")) {
			mirror.angle -= rotation_speed * k.dt;
		}
	});
	return mirror;
}
