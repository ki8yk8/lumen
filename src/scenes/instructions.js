export default function registerInstructionsScene({ k }) {
	k.scene("instructions", () => {
		const instructions_text = k.add([
			k.text("Instructions", { size: 48 }),
			k.color("ORANGE"),
			k.pos(k.width() / 2, 100),
		]);

		const paragraph = k.add([
			k.text("This is instruction"),
			k.pos(k.width() / 2, instructions_text.pos.y + 100),
		]);

		const hint = k.add([
			k.text("Press space to continue", { size: 32 }),
			k.pos(k.width() / 2, k.height() - 100),
			k.color("BROWN"),
			k.anchor("bot"),
			k.scale(1),
			k.rotate(0),
		]);
	});
}
