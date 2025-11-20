export function area() {
	return {
		_collisions: [],
		_collision_events: {
			onEnter: [],
			onStay: [],
			onExit: [],
		},
		triggerCollisionOnEnter(e) {
			for (const on_enter of this._collision_events.onEnter) {
				const { tag, callback } = on_enter;

				if (e.is(tag)) callback(e);
			}
		},
		triggerCollisionOnStay(e) {
			for (const on_enter of this._collision_events.onStay) {
				const { tag, callback } = on_enter;

				if (e.is(tag)) callback(e);
			}
		},
		triggerCollisionOnExit(e) {
			for (const on_enter of this._collision_events.onExit) {
				const { tag, callback } = on_enter;

				if (e.is(tag)) callback(e);
			}
		},
		checkCollision(tag) {
			const exists = this._collisions.find((e) => e.is(tag));

			return exists;
		},
		getCollisions() {
			return this._collisions;
		},
		onCollide(tag, callback = undefined) {
			if (callback === undefined) {
				callback = tag;
				tag = "*";
			}

			if (typeof tag !== "string" || typeof callback !== "function") {
				throw new Error(
					"Tag should be string and callback should be a function"
				);
			}

			this._collision_events.onEnter.push({ tag, callback });
		},
		onCollideUpdate(tag, callback = undefined) {
			if (callback === undefined) {
				callback = tag;
				tag = "*";
			}

			if (typeof tag !== "string" || typeof callback !== "function") {
				throw new Error(
					"Tag should be string and callback should be a function"
				);
			}
			this._collision_events.onStay.push({ tag, callback });
		},
		onCollideEnd(tag, callback = undefined) {
			if (callback === undefined) {
				callback = tag;
				tag = "*";
			}

			if (typeof tag !== "string" || typeof callback !== "function") {
				throw new Error(
					"Tag should be string and callback should be a function"
				);
			}
			this._collision_events.onExit.push({ tag, callback });
		},
	};
}
