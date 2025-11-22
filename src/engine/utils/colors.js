export const COLORS = {
	BLACK: "#011627",
	WHITE: "#fdfffc",
	SKYBLUE: "#2ec4b6",
	RED: "#e71d36",
	ORANGE: "#ff9f1c",
	PURPLE: "#7765e3",
	GREEN: "#20bf55",
};

export function rgbToHex(...props) {
	let [r, g, b] = [undefined, undefined, undefined];
	if (props.length === 3 && props.every((item) => typeof item === "number")) {
		// array format
		r = props[0];
		g = props[1];
		b = props[2];
	} else if (props.length === 1 && typeof props[0] === "object") {
		// object format
		if ("r" in props[0] && "g" in props[0] && "b" in props[0]) {
			r = props[0]["r"];
			g = props[0]["g"];
			b = props[0]["b"];
		} else {
			throw new Error(
				`rgb color object must have keys, r, g, and b, got ${Object.keys(
					props[0]
				)}`
			);
		}
	} else {
		throw new Error("rgb color must be receive three numbers, or an object");
	}

	let R = r.toString(16);
	let G = g.toString(16);
	let B = b.toString(16);

	// checking if they are single digit
	R = R.length === 1 ? `0${R}` : R;
	G = G.length === 1 ? `0${G}` : G;
	B = B.length === 1 ? `0${B}` : B;

	return `#${R}${G}${B}`;
}
export function hexToRgb(hex) {
	if (hex.length !== 7) {
		throw new Error(`Hex color must be in format #RRGGBB, got ${hex}`);
	}

	// getting individual colors and parsing them from hex to decimal
	let [R, G, B] = [hex.slice(1, 3), hex.slice(3, 5), hex.slice(5)];
	R = parseInt(R, 16);
	G = parseInt(G, 16);
	B = parseInt(B, 16);

	return { r: R, g: G, b: B };
}

export function color(...props) {
	if (
		props.length === 1 &&
		typeof props[0] === "string" &&
		props[0].startsWith("#")
	) {
		//hex color
		return { color: hexToRgb(props[0]) };
	} else if (
		props.length === 1 &&
		typeof props[0] === "string" &&
		props[0] in COLORS
	) {
		// one of the predefined color
		return { color: hexToRgb(COLORS[props[0]]) };
	} else if (props.length === 1 && typeof props[0] === "object") {
		// might be {r: value, g: value, b: value}
		const dict = props[0];
		if ("r" in dict && "g" in dict && "b" in dict) {
			return { color: props[0] };
		} else {
			throw new Error(
				`Object passed to color must have keys, r, g and b, got ${Object.keys(
					props[0]
				)}`
			);
		}
	} else if (
		props.length === 3 &&
		props.every((item) => typeof item === "number")
	) {
		//rgb color format
		return { color: { r: props[0], g: props[1], b: props[2] } };
	} else {
		throw new Error(
			`color accepts only RGB and Hex color format, got ${props}`
		);
	}
}
