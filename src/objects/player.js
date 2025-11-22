export default function Player({ k }) {
	const player = k.add([
		k.rect(80, 80, { radius: 40 }),
		k.pos(100, 100),
		k.color("ORANGE"),
		k.area(),
	]);

	const player_head = k.add([
		k.rect(30, 30, {radius: [0, 30, 30, 0]}),
		k.pos(player.pos.sub(10, 0)),
		k.anchor("left"),
	])

	return player;
}
