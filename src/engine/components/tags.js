export function tag(tags = []) {
	if (typeof tags === "string") {
		tags = [tags];
	}

	return {
		tags,
		untag(tag) {
			const tag_index = this.tags.indexOf(tag);
			if (tag_index === -1) {
				throw new Error(
					`Cannot remove tag '${tag}' that doesn't exists in tag list, ${this.tags}`
				);
			}

			// remove the tag
			this.tags.splice(tag_index, 1);
		},
		is(tag) {
			if (tag === "*") return true;
			
			return this.tags.includes(tag);
		},
	};
}
