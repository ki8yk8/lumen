import { vec2 } from "../engine/vec2";

export default function registerMainMenuScene({ k }) {
	k.scene("mainmenu", () => {
		const logo = k.add([
			k.text("Lumen", { size: 120 }),
			k.pos(k.width() / 2, 100),
			k.color("WHITE"),
			k.rotate(0),
			"logo",
		]);

		k.animate(logo, "angle", [0, -5, 0, 5, 0], 1);
		k.animate(
			logo,
			"scale",
			[k.vec2(1), k.vec2(1.1), k.vec2(1), k.vec2(0.9), k.vec2(1)],
			2
		);
	});
}
