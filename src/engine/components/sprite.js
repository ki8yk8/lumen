import { toRadian } from "../utils";
import { convertBasedOnAnchor } from "./anchor";

export function sprite(name, opt) {
	const width = opt?.width ?? undefined;
	const height = opt?.height ?? undefined;

	return {
		width: width,
		height: height,
		sprite: { name, width, height },
		loaded: false,
		draw(ctx, e) {
			if (!this.loaded) throw new Error("Sprite not loaded yet");

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
			ctx.beginPath();
			// the coordinate are 0,0 since the coordinate origin is already at the anchor point
			// drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
			ctx.drawImage(
				this.image,
				0,
				0,
				e.image.width,
				e.image.height,
				anchored_pos.x - e.pos.x,
				anchored_pos.y - e.pos.y,
				this.width,
				this.height
			);

			// resetting to its original position and rotation angle
			ctx.translate(-anchored_pos.x, -anchored_pos.y);

			ctx.closePath();

			// restores context from the stack
			ctx.restore();
		},
	};
}
