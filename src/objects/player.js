export default function Player({
	k,
	pos = [100, 100],
	rotation_speed = 90,
	player_speed = 300,
}) {
	const player = k.add([
		k.rect(80, 80, { radius: 40 }),
		k.pos(pos),
		k.rotate(0),
		k.color("ORANGE"),
		k.area(),
		{
			is_rotating: true,
		},
		"player",
	]);

	const player_head = k.add([
		k.rect(40, 35, { radius: [20, 30, 30, 20] }),
		k.pos(player.pos.add(2, 0)),
		k.rotate(0),
		k.anchor("center"),
	]);
	const left_hand = k.add([
		k.rect(40, 10, { radius: [40, 40, 0, 0] }),
		k.pos(player.pos.sub(0, player.height / 2)),
		k.color("PURPLE"),
		k.anchor("center"),
	]);
	const right_hand = k.add([
		k.rect(40, 10, { radius: [0, 0, 40, 40] }),
		k.pos(player.pos.add(0, player.height / 2)),
		k.color("PURPLE"),
		k.anchor("center"),
	]);

	// k.onUpdate(() => {
	// 	if (player.is_rotating) {
	// 		player.angle += rotation_speed * k.dt;
	// 		player_head.angle += rotation_speed * k.dt;
	// 	} else {
	// 		player.is_rotating = true;
	// 	}
	// });

	k.onKeyDown(" ", () => {
		player.moveBy(k.vec2(player_speed * k.dt, 0).rotate(player.angle));
		player_head.moveBy(k.vec2(player_speed * k.dt, 0).rotate(player.angle));
		left_hand.moveBy(k.vec2(player_speed * k.dt, 0).rotate(player.angle));

		player.is_rotating = false;
	});

	return player;
}
