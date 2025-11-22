export function tag(tags = []) {
	if (typeof tags === "string") {
		tags = new Set([tags]);
	} else {
		tags = new Set(tags);
	}

	return {
		tags,
		tag(tag) {
			this.tags.add(tag);
		},
		untag(tag) {
			if (tag === "*") {
				this.tags.clear();
				return;
			}
			if (!this.tags.has(tag)) {
				throw new Error(
					`Cannot remove tag '${tag}' that doesn't exists in tag list, ${this.tags}`
				);
			}

			// remove the tag
			this.tags.delete(tag);
		},
		is(tag) {
			if (tag === "*") return true;

			return this.tags.has(tag);
		},
	};
}
