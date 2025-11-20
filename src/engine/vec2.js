import { toDegree, toRadian } from "./utils";

export class Vec2 {
	constructor(...props) {
		const { x, y } = this.parse_props(props);

		this.x = x;
		this.y = y;
	}

	parse_props(props) {
		if (props.length === 2 && props.every((prop) => typeof prop === "number")) {
			return { x: props[0], y: props[1] };
		} else if (
			props.length === 1 &&
			typeof props[0] === "object" &&
			"x" in props[0] &&
			"y" in props[0]
		) {
			return props[0];
		} else if (props.length === 1 && Array.isArray(props[0])) {
			return { x: props[0][0], y: props[0][1] };
		} else if (props[0] instanceof Vec2) {
			return { x: props[0].x, y: props[0].y };
		}

		throw new Error("Props should be either x, y or [x, y] or {x: , y:}");
	}

	clone() {
		return new Vec2(this.x, this.y);
	}
	add(ax, ay = 0) {
		let [x, y] = [0, 0];

		if (ax instanceof Vec2) {
			x = ax.x;
			y = ax.y;
		} else {
			x = ax;
			y = ay;
		}

		return new Vec2({ x: x + this.x, y: y + this.y });
	}

	sub(...props) {
		const { x, y } = this.parse_props(props);

		return new Vec2({ x: this.x - x, y: this.y - y });
	}

	neg() {
		return new Vec2(-this.x, -this.y);
	}

	scale(x, y = undefined) {
		if (y === undefined) {
			y = x;
		}

		return new Vec2(this.x * x, this.y * y);
	}
	dist(...props) {
		return Math.sqrt(this.sdist(...props));
	}
	sdist(...props) {
		const { x, y } = this.parse_props(props);

		return (this.x - x) ** 2 + (this.y - y) ** 2;
	}
	len() {
		return this.dist(new Vec2(0, 0));
	}
	unit() {
		const dist = this.len();

		return new Vec2({ x: this.x / dist, y: this.y / dist });
	}
	dot(...props) {
		const { x, y } = this.parse_props(props);

		return x * this.x + y * this.y;
	}
	cross(...props) {
		const { x, y } = this.parse_props(props);

		return y * this.x - x * this.y;
	}
	angle() {
		return this.angleBetween(0, 0);
	}
	angleBetween(...props) {
		const { x, y } = this.parse_props(props);

		return toDegree(Math.atan2(y - this.y, x - this.x));
	}
	isZero() {
		return this.x === 0 && this.y === 0;
	}
	eq(...props) {
		const { x, y } = this.parse_props(props);

		return this.x === x && this.y === y;
	}
	rotate(theta) {
		const [x, y] = [this.x, this.y];
		const angle = toRadian(theta);
		const [s, c] = [Math.sin(angle), Math.cos(angle)];

		const new_x = c * x - s * y;
		const new_y = s * x + c * y;

		return new Vec2(new_x, new_y);
	}
}

export function vec2(...props) {
	return new Vec2(...props);
}
