import { rgbToHex, toRadian } from "../utils";
import { convertBasedOnAnchor } from "./anchor";

export function text(text, opts = { size: 18, font: "Monospace" }) {
	const size = opts?.size ?? 18;
	const font = opts?.font ?? "Monospace";
	const maxWidth = opts.maxWidth;

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

			// 0.8 is baseline fix
			ctx.fillStyle = rgbToHex(e.color);
			ctx.fillText(
				e.text,
				anchored_pos.x - e.pos.x,
				anchored_pos.y - e.pos.y + e.textSize * 0.8,
				this.maxWidth
			);

			// restores context from the stack
			ctx.restore();
		},
	};
}
