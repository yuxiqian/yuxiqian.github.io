import { DateTime } from "luxon";

export default function(eleventyConfig) {
	eleventyConfig.addFilter("readableDate", (dateObj, format, zone) => {
		// Formatting tokens for Luxon: https://moment.github.io/luxon/#/formatting?id=table-of-tokens
		return DateTime.fromJSDate(dateObj, { zone: zone || "utc" }).toFormat(format || "yyyy 年 M 月 d 日");
	});

	eleventyConfig.addFilter("htmlDateString", (dateObj) => {
		// dateObj input: https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
		return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat('yyyy-LL-dd');
	});

	// Return the keys used in an object
	eleventyConfig.addFilter("getKeys", target => {
		return Object.keys(target);
	});

	eleventyConfig.addFilter("filterTagList", function filterTagList(tags) {
		return (tags || []).filter(tag => ["all", "posts"].indexOf(tag) === -1);
	});

	// Keep Unicode letters so Chinese tags retain their own URLs.
	eleventyConfig.addFilter("tagSlug", tag => {
		const slug = String(tag).normalize("NFKC").toLowerCase()
			.replace(/[^\p{L}\p{M}\p{N}]+/gu, "-")
			.replace(/^-+|-+$/g, "");
		if (!slug) {
			throw new Error(`Cannot create a tag URL from "${tag}": the tag must contain letters or numbers.`);
		}
		return slug;
	});

	eleventyConfig.addFilter("sortAlphabetically", strings =>
		(strings || []).sort((b, a) => b.localeCompare(a))
	);
};
