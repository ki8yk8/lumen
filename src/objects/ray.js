import { vec2 } from "../engine/vec2";

export default function Ray({ start_pos = vec2(100, 100), k, c }) {
	const ray = k.add([
		k.rect(10, 10, {
			radius: 5,
		}),
		k.pos(start_pos),
		k.color("WHITE"),
		"ray",
	])

	return ray;
}
