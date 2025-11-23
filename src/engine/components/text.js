import { rgbToHex, toRadian } from "../utils";
import { convertBasedOnAnchor } from "./anchor";

export function text(
	text,
	opts = {
		size: 24,
		maxWidth: Infinity,
		font: "Monospace",
		lineHeight: undefined,
	}
) {
	const size = opts?.size ?? 24;
	const font = opts?.font ?? "Monospace";
	const maxWidth = opts.maxWidth ?? Infinity;
	const lineHeight = opts.lineHeight ?? undefined;

	return {
		width: 0,
		height: size,
		text,
		textSize: size,
		lineHeight,
		font,
		maxWidth,
		draw(ctx, e) {
			ctx.font = `${e.textSize}px ${e.font}`;
			ctx.fillStyle = rgbToHex(e.color);

			// to handle the word wrap if maxWidth is given
			const words = e.text.split(" ");
			let line = "";
			const lines = [];
			const widths = [];

			for (let i = 0; i < words.length; i++) {
				const test_line = line === "" ? `${words[i]} ` : `${line}${words[i]} `;
				const test_width = ctx.measureText(test_line).width;

				if (test_width > e.maxWidth && line !== "") {
					lines.push(line);
					widths.push(ctx.measureText(line).width);
					line = `${words[i]} `;
				} else {
					line = test_line;
				}
			}

			if (line !== "") {
				lines.push(line);
				widths.push(ctx.measureText(line).width);
			}

			const block_width = widths.length ? Math.max(...widths) : 0;
			const line_height = e.lineHeight ?? e.textSize * 1.2;
			const block_height = line_height * lines.length;

			e.width = block_width;
			e.height = block_height;
			e.lineHeight = line_height;

			const anchored_pos = convertBasedOnAnchor(
				e.pos.x,
				e.pos.y,
				block_width,
				block_height,
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

			for (let i = 0; i < lines.length; i++) {
				ctx.fillText(
					lines[i].trimEnd(),
					anchored_pos.x - e.pos.x,
					anchored_pos.y - e.pos.y + i * line_height
				);
			}

			// restores context from the stack
			ctx.restore();
		},
	};
}
