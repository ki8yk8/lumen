export default function Obstacle({
	k,
	width = 100,
	height = 10,
	pos = [0, 0],
	angle = 45,
}) {
	const obstacle = k.add([
		k.rect(width, height),
		k.pos(pos),
		k.rotate(angle),
		k.color("BROWN"),
		k.area(),
		"obstacle",
	]);

	obstacle.onCollide("ray", (ray) => {
		ray.exists() && k.destroy(ray);
	});

	return obstacle;
}
