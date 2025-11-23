import { rgbToHex, toRadian } from "../utils";
import { convertBasedOnAnchor } from "./anchor";

export function text(
	text,
	opts = { size: 24, maxWidth: Infinity, font: "Monospace" }
) {
	const size = opts?.size ?? 24;
	const font = opts?.font ?? "Monospace";
	const maxWidth = opts.maxWidth ?? Infinity;

	return {
		width: 0,
		height: size,
		text,
		textSize: size,
		font,
		maxWidth,
		draw(ctx, e) {
			ctx.font = `${e.textSize}px ${e.font}`;
			const metrics = ctx.measureText(e.text);
			e.width = metrics.width;
			e.height = e.textSize;

			const anchored_pos = convertBasedOnAnchor(
				e.pos.x,
				e.pos.y,
				e.width,
				e.height,
				e.anchor
			);

			// pushes the current state in the stack
			ctx.save();

			// the default for rotation is 0, 0 of canvas
			// this brings the canvas at the point of the anchor
			ctx.translate(e.pos.x, e.pos.y);
			// does the rotation
			ctx.rotate(toRadian(e.angle));
			// handles the scaling
			ctx.scale(e.scale.x, e.scale.y);

			// to handle the word wrap if maxWidth is given
			const words = e.text.split(" ");
			let line = "";
			let line_number = 0;

			for (let i = 0; i < words.length; i++) {
				const test_line = `${line}${words[i]} `;
				const metrics = ctx.measureText(test_line);
				const test_width = metrics.width;

				if (test_width > e.maxWidth && i > 0) {
					ctx.fillStyle = rgbToHex(e.color);
					ctx.fillText(
						line,
						anchored_pos.x - e.pos.x,
						anchored_pos.y - e.pos.y + e.textSize * 0.8 * line_number
					);
					line = `${words[i]} `;
					line_number++;
				} else {
					line = test_line;
				}
			}
			ctx.fillStyle = rgbToHex(e.color);
			ctx.fillText(
				line,
				anchored_pos.x - e.pos.x,
				anchored_pos.y - e.pos.y + e.textSize * 0.8 * line_number
			);

			// restores context from the stack
			ctx.restore();
		},
	};
}
