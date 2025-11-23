export function timer(time = 6, onComplete, onChange) {
	return {
		time,
		timer_opts: { start_time: time, interval: undefined },
		start() {
			const interval = window.setInterval(() => {
				this.time--;
				onChange?.(this.time);
			}, 1000);

			this.timer_opts.interval = interval;
		},
		reset() {
			this.time = this.timer_opts.start_time;
			onChange?.(this.time);
		},
		onComplete() {
			onComplete?.();
		},
	};
}
