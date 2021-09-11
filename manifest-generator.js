const fs = require("fs")
const glob = require("glob")
const path = require("path")

const browser = process.argv[2]
const outFile = process.argv[3]

const pkg = JSON.parse(fs.readFileSync("package.json", { encoding: "utf-8" }))

const SUPPORTED_URL_GLOBS = [
	"https://news.ycombinator.com/*",
]

const manifest = {
	manifest_version: 2,
	name: pkg.name,
	version: pkg.version,
	// The description must be <= 132 characters in length for the Chrome web store.
	description: pkg.description,
	icons: {
		512: "icon-512.png",
	},
	permissions: [
		...SUPPORTED_URL_GLOBS,
		"storage",
		"unlimitedStorage",
	],
	background: {
		scripts: [
			"background.js",
		],
	},
	content_scripts: [
		{
			matches: SUPPORTED_URL_GLOBS,
			js: [
				"content_script.js",
			],
		},
	],
	options_ui: {
		page: "options.html",
		browser_style: true,
		open_in_tab: true,
	},
}

fs.writeFileSync(outFile, JSON.stringify(manifest, null, 2))
