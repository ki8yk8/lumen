import { rgbToHex, toRadian } from "../utils";
import { convertBasedOnAnchor } from "./anchor";

export function rect(width, height, opt) {
	const radius = opt?.["radius"] ?? [0, 0, 0, 0];
	const fill = opt?.["fill"] ?? true;

	return {
		width: width,
		height: height,
		rect: { width, height, radius, fill },
		draw(ctx, e) {
			const anchored_pos = convertBasedOnAnchor(
				e.pos.x,
				e.pos.y,
				e.rect.width,
				e.rect.height,
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
			ctx.beginPath();
			// the coordinate are 0,0 since the coordinate origin is already at the anchor point
			ctx.roundRect(
				anchored_pos.x - e.pos.x,
				anchored_pos.y - e.pos.y,
				e.rect.width,
				e.rect.height,
				e.rect.radius
			);
			if (e.rect.fill) {
				ctx.fillStyle = rgbToHex(e.color) || "#ffffff";
				ctx.fill();
			}
			// resetting to its original position and rotation angle
			ctx.translate(-anchored_pos.x, -anchored_pos.y);

			ctx.closePath();

			// restores context from the stack
			ctx.restore();
		},
	};
}
