export default function registerInstructionsScene({ k }) {
	k.scene("instructions", () => {
		const instructions_text = k.add([
			k.text("Instructions", { size: 48 }),
			k.color("ORANGE"),
			k.pos(k.width() / 2, 100),
		]);

		const paragraph = k.add([
			k.text(
				"The player rotates constantly, you can move the player where his head is pointing by pressing 'space' key. You can rotate the mirrors by pressing arrow up and down while colliding with them. Your goal is to rotate all the mirrors such that the ray hits the target.",
				{
					size: 24,
					maxWidth: 500,
					lineHeight: 36,
					align: "center",
				}
			),
			k.pos(k.width() / 2, 300),
			k.color("WHITE"),
		]);

		const hint = k.add([
			k.text("Press space to continue", { size: 32 }),
			k.pos(k.width() / 2, k.height() - 100),
			k.color("BROWN"),
			k.anchor("bot"),
			k.scale(1),
			k.rotate(0),
		]);

		k.animate(hint, "angle", [0, -2, 0, 2, 0], 2);
		k.animate(hint, "scale", [k.vec2(1), k.vec2(1.1), k.vec2(1)], 1);
	});
}
