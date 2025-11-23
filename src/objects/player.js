export default function Player({
	k,
	pos = [100, 100],
	rotation_speed = 90,
	player_speed = 300,
}) {
	const player = k.add([
		k.sprite("player"),
		k.pos(pos),
		k.anchor("center"),
		k.rotate(0),
		k.area(),
		{
			is_rotating: true,
		},

		"player",
	]);

	k.onUpdate(() => {
		if (player.is_rotating) {
			player.angle += rotation_speed * k.dt;
		} else {
			player.is_rotating = true;
		}
	});

	k.onKeyDown(" ", () => {
		player.moveBy(k.vec2(player_speed * k.dt, 0).rotate(player.angle));

		// clamps the position of player inside the screen
		const offset = Math.max(player.width, player.height) / 2;
		player.pos.x = k.clamp(player.pos.x, offset, k.width() - offset);
		player.pos.y = k.clamp(player.pos.y, offset, k.height() - offset);

		player.is_rotating = false;
	});

	return player;
}
