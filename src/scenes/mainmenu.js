export default function registerMainMenuScene({ k }) {
	k.scene("mainmenu", () => {
		const logo = k.add([
			k.text("Lumen", { size: 120 }),
			k.pos(k.width() / 2, 100),
			k.color("WHITE"),
			k.rotate(0),
			"logo",
		]);

		k.animate(logo, "angle", [0, -20, 0, 20, 0], 1);
	});
}
