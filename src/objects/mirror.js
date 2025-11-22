export default function Mirror({k, pos, angle}) {
	const mirror = k.add([
		k.rect(100, 10),
		k.pos(pos),
		k.rotate(angle),
		k.color("WHITE"),
		k.anchor("center"),
		k.area(),
		"mirror",
	]);

	return mirror
}