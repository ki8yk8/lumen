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

		// animating how the logo looks
		k.animate(logo, "angle", [0, -5, 0, 5, 0], 1);
		k.animate(
			logo,
			"scale",
			[k.vec2(1), k.vec2(1.1), k.vec2(1), k.vec2(0.9), k.vec2(1)],
			2
		);
		k.animate(
			logo,
			"pos",
			[logo.pos, logo.pos.add(10, 0), logo.pos, logo.pos.add(-10, 0), logo.pos],
			1
		);

		// adding the menu items
		const menu_items = ["Start Game", "Instructions"];
		const menu_items_objs = [];
		let index = 0;

		menu_items.forEach((item, index) => {
			const item_bg = k.add([
				k.rect(450, 80),
				k.color("GREEN"),
				k.pos(k.width() / 2, logo.pos.y + 200 + 100 * index),
			]);

			const item_text = k.add([
				k.text(item, { size: 48 }),
				k.color("WHITE"),
				k.pos(item_bg.pos),
			]);
			menu_items_objs.push([item_bg, item_text]);
		});

		renderItem(menu_items_objs, 0, true);
		k.onKeyPressed("ArrowDown", () => {
			index = Math.min(index + 1, menu_items.length - 1);
			renderItem(menu_items_objs, index, true);
		});

		k.onKeyPressed("ArrowUp", () => {
			index = Math.max(0, index - 1);
			renderItem(menu_items_objs, index, true);
		});

		k.onKeyPressed("Enter", () => {
			if (menu_items[index] === "Start Game") {
				k.go("level-1");
			} else if (menu_items[index] === "Instructions") {
				k.go("instructions");
			}
		});

		function renderItem(objects, index, active = true) {
			const [item_bg, item_text] = objects[index];

			item_bg.scale = active ? k.vec2(1.1) : k.vec2(1.0);
			item_bg.color = active ? k.color("ORANGE").color : k.color("GREEN").color;
			item_bg.angle = active ? 2 : 0;
			item_text.scale = item_bg.scale;
			item_text.angle = item_bg.angle;

			if (active) {
				for (let i = 0; i < objects.length; i++) {
					if (i === index) continue;

					renderItem(objects, i, false);
				}
			}
		}
	});
}
