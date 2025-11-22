import Engine, { COLORS } from "./engine";
import Ray from "./objects/ray";

const k = new Engine({
	width: window.innerWidth,
	height: window.innerHeight,
	canvas: document.getElementById("game-canvas"),
	backgroundColor: COLORS.BLACK,
});

const ray = Ray({ k });
console.log(ray.tags);
console.log(ray.is("ray"));
ray.tag("newtag");
console.log(ray.tags);
console.log(ray.is("newtag"));
ray.untag("newtag");
console.log(ray.tags);
