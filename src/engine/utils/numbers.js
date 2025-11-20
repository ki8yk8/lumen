export function clamp(n, min, max) {
	return Math.max(min, Math.min(max, n));
}

export function min(n, min) {
	return Math.min(n, min);
}

export function max(n, max) {
	return Math.max(n, max);
}

export function map(v, s1, d1, s2, d2) {
	// v = value, s1, and s2 are source low and high and d = destination
	return d1 + ((d2 - d1) * (v - s1)) / (s2 - s1);
}
