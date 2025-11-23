export default function Target({
	k,
	pos = [100, 100],
	target = 20,
	onHit,
	onComplete,
}) {
	let filler = 0;
	const green_circle = k.add([
		k.rect(100, 100, { radius: 50 }),
		k.pos(pos),
		k.color("GREEN"),
		k.anchor("center"),
	]);

	const white_circle = k.add([
		k.rect(70, 70, { radius: 35 }),
		k.pos(green_circle.pos),
		k.color("WHITE"),
		k.area(),
	]);

	const inner_circle = k.add([
		k.rect(30, 30, { radius: 15 }),
		k.pos(green_circle.pos),
		k.color("GREEN"),
		k.area(),
	]);

	let hit = false;
	white_circle.onCollide("ray", (ray) => {
		k.destroy(ray);
		filler++;
		!hit && onHit?.();

		if (filler / target > 0.5) {
			green_circle.color = k.color("RED").color;
		}

		if (filler / target >= 1.0) {
			inner_circle.color = k.color("RED").color;
		}
	});

	inner_circle.onCollide("player", () => {
		if (filler < 1.0) return;
		onComplete?.();
	});
}
