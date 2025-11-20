export class Random {
	constructor(seed) {
		this.x = seed || Date.now();
		this.a = 1664525;
		this.c = 1013904223;
		this.m = 2 ** 32;
	}

	randSeed(seed) {
		// to change the random seed value
		if (seed === undefined) {
			seed = Date.now();
		}

		this.x = seed;
	}

	generate() {
		this.x = (this.a * this.x + this.c) % this.m;

		// normalizing between 0 and 1
		return this.x / this.m;
	}

	rand(lower = 0, upper = 1) {
		return this.generate() * (upper - lower) + lower;
	}

	randi(lower = 0, upper = 1) {
		return Math.round(this.rand(lower, upper));
	}

	choose(list) {
		list = structuredClone(list); // avoid copy by reference
		const random_index = this.randi(0, list.length - 1);
		return list[random_index];
	}

	chooseMultiple(list, n = 1, replacement = true) {
		list = structuredClone(list);

		if (n > list.length && !replacement) {
			throw new Error(
				`Impossible to make ${n} choices from array with length ${list.length} without replacement`
			);
		}

		const choices = [];
		for (let i = 0; i < n; i++) {
			const choice = this.choose(list);
			choices.push(choice);

			if (!replacement) {
				// remove elment at found index
				list.splice(list.indexOf(choice), 1);
			}
		}

		return choices;
	}

	shuffle(list) {
		list = structuredClone(list);
		return this.chooseMultiple(list, list.length, false);
	}
}
