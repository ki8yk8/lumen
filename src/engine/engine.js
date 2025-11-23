import { anchor, convertBasedOnAnchor } from "./components/anchor";
import { area } from "./components/area";
import { pos } from "./components/pos";
import { rect } from "./components/rect";
import { rotate } from "./components/rotate";
import { scale } from "./components/scale";
import { sprite } from "./components/sprite";
import { tag } from "./components/tags";
import { text } from "./components/text";
import { color, hexToRgb, rgbToHex, toDegree, toRadian } from "./utils";
import { clamp, map, max, min } from "./utils/numbers";
import { Random } from "./utils/random";
import { vec2 } from "./vec2";

class Engine {
	constructor(
		props = {
			width: 600,
			height: 900,
			backgroundColor: "#ffffff",
			canvas: undefined,
		}
	) {
		this.canvasWidth = props.width * window.devicePixelRatio;
		this.canvasHeight = props.height * window.devicePixelRatio;
		this.backgroundColor = props.backgroundColor;

		this.canvas = props.canvas || document.createElement("canvas");

		if (!props.canvas) {
			document.body.appendChild(this.canvas);
		}
		if (this.canvas.getContext) {
			this.canvas_ctx = this.canvas.getContext("2d");
		} else {
			throw new Error("Canvas not supported in this browser");
		}

		// setting the size
		this.canvas.width = this.canvasWidth;
		this.canvas.height = this.canvasHeight;

		this.entities = [];
		this.scenes = {};
		this.sprites = {};
		this.on_update_functions = [];
		this.all_tweens = [];
		this.time = 0;

		// keypresses
		this.keys_down = new Set(); // all the keys currently down
		this.keys_pressed = new Set(); // keys that are pressed in the frame
		this.keypress_callbacks = [];
		this.keydown_callbacks = [];
		this.keyrelease_callbacks = [];

		this.loops = [];
		this.waits = [];

		// window event listeners to handle the keys action
		window.addEventListener("keydown", (e) => {
			e.preventDefault();
			const key = e.key;

			// if the key has not been down before then, this is the first time key has been pressed
			if (!this.keys_down.has(key)) {
				this.keys_pressed.add(key);
			}

			this.keys_down.add(key);
		});

		window.addEventListener("keyup", (e) => {
			e.preventDefault();
			const key = e.key;

			// remove the key from keydown
			this.keys_down.delete(key);
			this.keys_pressed.delete(key);
		});

		// adding the utils
		this.vec2 = vec2;
		this.toRadian = toRadian;
		this.toDegree = toDegree;
		this.rgbToHex = rgbToHex;
		this.hexToRgb = hexToRgb;
		this.color = color;
		this.clamp = clamp;
		this.min = min;
		this.max = max;
		this.map = map;

		// adding the components
		this.anchor = anchor;
		this.pos = pos;
		this.rect = rect;
		this.sprite = sprite;
		this.rotate = rotate;
		this.scale = scale;
		this.tag = tag;
		this.area = area;
		this.text = text;

		// random utilities
		this.random = new Random();
		this.rand = this.random.rand.bind(this.random);
		this.randi = this.random.randi.bind(this.random);
		this.choose = this.random.choose.bind(this.random);
		this.chooseMultiple = this.random.chooseMultiple.bind(this.random);
		this.shuffle = this.random.shuffle.bind(this.random);
		this.randSeed = this.random.randSeed.bind(this.random);

		// begin the render
		this.start();
	}

	start() {
		requestAnimationFrame(this.renderLoop.bind(this));
	}

	renderLoop(t) {
		const dt = t / 1000 - this.time; // in seconds
		this.time = t / 1000; // total time elapsed
		this.dt = dt; // time elapsed since last render

		this.update(dt);
		this.draw();

		requestAnimationFrame(this.renderLoop.bind(this));
	}

	update(dt) {
		// handling all the key callbacks
		for (const e of this.keypress_callbacks) {
			const { key, callback } = e;

			if (this.keys_pressed.has(key)) {
				callback();
			}
		}

		for (const e of this.keydown_callbacks) {
			const { key, callback } = e;

			if (this.keys_down.has(key)) {
				callback();
			}
		}

		// updating the frame or re-rendering
		for (const e of this.entities) {
			if (e.update) e.update(dt, e);
		}

		// calling all the update functions
		for (const func of this.on_update_functions) {
			func();
		}

		// calling all the tweens
		this.all_tweens.forEach((tween, index) => {
			const value = this.map(
				this.time,
				tween.start,
				tween.from,
				tween.end,
				tween.to
			);
			tween.func(value);

			if (tween.end < this.time) {
				this.all_tweens.splice(index, 1);
			}
		});

		// new frame equals new keypressed set
		this.keys_pressed.clear();

		this.handleCollisions();
	}

	draw() {
		this.canvas_ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

		// adding the background color
		this.canvas_ctx.fillStyle = this.backgroundColor;
		this.canvas_ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

		for (const e of this.entities) {
			if ("sprite" in e) {
				if (!e.loaded) {
					e.loaded = true;
					e.image = this.sprites[e.sprite.name];
					e.sprite.width = e.image.width;
					e.sprite.height = e.image.height;

					if (!e.width) e.width = e.image.width;
					if (!e.height) e.height = e.image.height;
				}

				e.draw(this.canvas_ctx, e);
			}
			if (e.draw) e.draw(this.canvas_ctx, e);
		}
	}

	add(components) {
		const entity = {};

		// default values that are overrriden later if defined by the user
		for (const d of this.defaults()) {
			Object.assign(entity, d);
		}

		for (const c of components) {
			if (typeof c === "string") {
				Object.assign(entity, this.tag(c));
			} else if (Array.isArray(c) && c.every((i) => typeof i === "string")) {
				Object.assign(entity, this.tag(c));
			} else {
				Object.assign(entity, c);
			}
		}

		this.entities.push(entity);
		return entity;
	}

	width() {
		return this.canvasWidth;
	}
	height() {
		return this.canvasHeight;
	}

	defaults() {
		return [
			this.pos(0, 0),
			this.anchor("center"),
			this.color(255, 255, 255),
			this.rotate(0),
			this.scale(1, 1),
			this.tag(),
			{
				_exist: true,
				exists() {
					return this._exist;
				},
			},
		];
	}

	get(tag) {
		if (tag === "*") {
			return this.entities;
		}

		return this.entities.filter((e) => "tags" in e && e["tags"].includes(tag));
	}

	onUpdate(func) {
		this.on_update_functions.push(func);
	}

	tween(from, to, duration, func) {
		const [start, end] = [this.time, this.time + duration];

		this.all_tweens.push({
			start,
			end,
			from,
			to,
			func,
		});
	}

	animate(obj, property, lists, duration = 1) {
		const n = lists.length - 1;
		const t = duration / n;

		this.loop(duration, () => {
			for (let i = 0; i < n; i++) {
				this.wait(i * t, () =>
					this.tween(lists[i], lists[i + 1], t, (v) => (obj[property] = v))
				);
			}
		});
	}

	onKeyPressed(key, callback) {
		this.keypress_callbacks.push({
			key,
			callback,
		});
	}

	onKeyDown(key, callback) {
		this.keydown_callbacks.push({
			key,
			callback,
		});
	}

	handleCollisions() {
		for (let a of this.entities) {
			if (!("_collisions" in a)) continue;

			for (let b of this.entities) {
				if (a === b || !("_collisions" in b)) continue;

				const overlapping = this.isOverlapping(a, b);

				if (overlapping) {
					if (a._collisions.includes(b)) {
						// onStay
						a.triggerCollisionOnStay(b);
					} else {
						// onEnter
						a._collisions.push(b);
						a.triggerCollisionOnEnter(b);
					}
				} else {
					if (a._collisions.includes(b)) {
						// onExit
						a._collisions.splice(a._collisions.indexOf(b), 1);
						a.triggerCollisionOnExit(b);
					}
				}
			}
		}
	}

	isOverlapping(e1, e2) {
		// implements AABB Collision
		// referece: https://dev.to/pratyush_mohanty_6b8f2749/the-math-behind-bounding-box-collision-detection-aabb-vs-obbseparate-axis-theorem-1gdn
		function getCenter(e) {
			const tl = convertBasedOnAnchor(
				e.pos.x,
				e.pos.y,
				e.width,
				e.height,
				e.anchor
			);

			return vec2(tl).add(e.width / 2, e.height / 2);
		}

		function getCorners(e) {
			const center = getCenter(e);

			const local_corners = [
				vec2(-e.width / 2, -e.height / 2),
				vec2(e.width / 2, -e.height / 2),
				vec2(e.width / 2, e.height / 2),
				vec2(-e.width / 2, e.height / 2),
			];

			return local_corners.map((p) => p.rotate(e.angle).add(center));
		}

		function project(points, axis) {
			let min = points[0].dot(axis);
			let max = min;

			points.forEach((item, index) => {
				if (index === 0) return;

				const v = item.dot(axis);
				if (v < min) min = v;
				if (v > max) max = v;
			});

			return { min, max };
		}

		function overlap(a, b) {
			return a.min <= b.max && b.min <= a.max;
		}

		function get_axes(c) {
			return [c[1].sub(c[0]).unit(), c[3].sub(c[0]).unit()];
		}

		const [c1, c2] = [getCorners(e1), getCorners(e2)];
		const axes = [...get_axes(c1), ...get_axes(c2)];

		for (const axis of axes) {
			const [p1, p2] = [project(c1, axis), project(c2, axis)];

			if (!overlap(p1, p2)) {
				return false;
			}
		}

		return true;
	}

	destroy(e) {
		if (!e.exists()) return;
		e._exists = false;

		const index = this.entities.indexOf(e);
		if (index !== -1) {
			this.entities.splice(index, 1);
		}
	}

	scene(name, callback) {
		this.scenes[name] = callback;
	}
	go(name) {
		if (!(name in this.scenes)) {
			throw new Error(`Could not find the scene, got ${name}`);
		}
		// clear the scene
		this.entities = [];
		this.on_update_functions = [];
		this.all_tweens = [];
		this.time = 0;
		this.keydown_callbacks = [];
		this.keypress_callbacks = [];
		this.keyrelease_callbacks = [];

		// clear all the loops and waits
		this.loops.forEach((loop) => clearInterval(loop));
		this.waits.forEach((wait) => clearTimeout(wait));

		this.loops = [];
		this.waits = [];

		// call the scene callback
		this.scenes[name]();
	}

	loadSprite(name, src) {
		if (name in this.sprites)
			throw new Error(`Sprites with name ${name} already exists`);

		const image = new Image();
		image.src = src;

		this.sprites[name] = image;
	}

	wait(seconds, callback) {
		const timeout = setTimeout(callback, seconds * 1000);
		this.waits.push(timeout);
	}

	loop(seconds, callback) {
		callback();
		const interval = setInterval(callback, seconds * 1000);
		this.loops.push(interval);
	}
}

export default Engine;
