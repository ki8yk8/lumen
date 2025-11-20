import { vec2 } from "../vec2";

export function scale(x, y = undefined) {
	if (y === undefined) {
		y = x;
	}

	return { scale: vec2(x, y) };
}
