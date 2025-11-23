export default function Helper({ k }) {
	const message_box = k.add([
		k.rect(k.width() - 100, 150, { radius: 18 }),
		k.anchor("botright"),
		k.pos(k.width() - 25, k.height() - 25),
		{
			target_achieved: false,
		},
	]);

	const message_1 = k.add([
		k.text(
			"Hey, welcome to Lumen. You are the rotating player. You cannot control the rotation, but you can press [SPACE] to move forward. Move at least 3 times to continue.",
			{ align: "left", maxWidth: message_box.width - 36 }
		),
		k.color("BLACK"),
		k.anchor("topleft"),
		k.pos(100 + 18, k.height() - 25 + 18 - message_box.height),
	]);

	let moved = 0;
	k.onKeyPressed(" ", () => {
		moved++;

		if (moved === 3) {
			message_1.text =
				"Collide with the mirror and press your [ARROW UP] and [ARROW DOWN] key to move the mirror. Move the mirror to hit the target to continue.";
			message_1.loaded = false;
		}
	});

	k.onUpdate(() => {
		if (moved >= 3 && message_box.target_achieved) {
			message_1.text =
				"Once, the target turns red collide with it to proceed to the next level.";
			message_1.loaded = false;
		}
	});

	return message_box;
}
