all: src-zip firefox chrome

firefox chrome:
	mkdir -p dist/$@
	rm -rf dist/build dist/$@/*
	node -r esm manifest-generator.js $@ dist/$@/manifest.json
	BROWSER=$@ npx parcel build --no-source-maps --out-dir dist/build src/{background,content_script}.js src/options.html
	cp -v dist/build/* dist/$@/
	cp -rv icons/icon-512.png dist/$@/
	cd dist/$@ && zip -r ../$@-hun.zip *

src-zip:
	test -f dist/src.zip && rm dist/src.zip || true
	mkdir -p dist
	zip dist/src.zip `git ls-files`
