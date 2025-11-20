const ANCHORS = [
	"top",
	"left",
	"right",
	"bot",
	"topleft",
	"topright",
	"botleft",
	"botright",
	"center",
];

export function anchor(anchor) {
	if (!ANCHORS.includes(anchor)) {
		throw new Error(
			`Anchor should be one of ${ANCHORS.join(", ")} got ${anchor}`
		);
	}

	return { anchor };
}

export function convertBasedOnAnchor(x, y, width, height, anchor) {
	if (!ANCHORS.includes(anchor)) {
		throw new Error(
			`Anchor should be one of ${ANCHORS.join(", ")} got ${anchor}`
		);
	}

	switch (anchor) {
		case "topleft":
			return { x, y };

		case "top":
			return { x: x - width / 2, y };

		case "topright":
			return { x: x - width, y };

		case "left":
			return { x, y: y - height / 2 };

		case "center":
			return { x: x - width / 2, y: y - height / 2 };

		case "right":
			return { x: x - width, y: y - height / 2 };

		case "botright":
			return { x: x - width, y: y - height };

		case "bot":
			return { x: x - width / 2, y: y - height };

		case "botleft":
			return { x, y: y - height };
	}
}
