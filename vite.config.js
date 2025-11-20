import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
	build: {
		rollupOptions: {
			input: {
				main: resolve(__dirname, "index.html"),
				demo1: resolve(__dirname, "src/demos/gravity-with-acceleration.html"),
				demo2: resolve(__dirname, "src/demos/gravity-with-pos.html"),
				demo3: resolve(__dirname, "src/demos/gravity-with-vel.html"),
				demo4: resolve(__dirname, "src/demos/projectile.html"),
				demo5: resolve(__dirname, "src/demos/targets.html"),
				demo6: resolve(__dirname, "src/demos/rotation-vector.html")
			},
		},
	},
});
