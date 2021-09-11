# HnUserNotes

HnUserNotes is a small browser extension that allows keeping small text notes on HN users. It can help remember who you've met on HN before, or who's the founder of a startup etc., and can give some valuable and specific context to their comment.

![Screenshot](https://github.com/sharat87/hn-user-notes/raw/master/media/shot-1-chrome.png)

[**Get HnUserNotes for Firefox**](https://addons.mozilla.org/en-US/firefox/addon/hn-user-notes/).

[**Get HnUserNotes for Chrome**](https://chrome.google.com/webstore/detail/hn-user-notes/honoamahndiehddgbkdbdnljdaipbeff).

## Building

Make sure you have Node.js `v14.15` and yarn `v1.22`.

To build the Firefox extension, run the following commands:

```sh
yarn install --frozen-lockfile
make firefox
```

The Firefox extension should now be located at `dist/firefox`, and zipped up at `dist/firefox-hun.zip`.

To build the chrome extension, run the following commands:

```sh
yarn install --frozen-lockfile
make chrome
```

The chrome extension should now be located at `dist/chrome`, and zipped up at `dist/chrome-hun.zip`.

## Support & Contributing

If you found a bug, or found a problem using this extension, please feel free to open an issue. My response _will_ be a little slow, as I'm a bit tight on bandwidth right now, but I _will_ get back.

I developed this in my spare time (weekends), because I wanted it. It has just enough features, that I can ship and call it a day. I don't intend to make it a big, powerful, featureful thing, so, unless your contribution is a bug-fix, I can't promise it'll be merged.

If you want to show your interest and support for this project, you may want to [buy me a coffee](https://www.buymeacoffee.com/sharat87). Thank you very much!

## License

[MIT License](https://github.com/sharat87/hn-user-notes/blob/master/LICENSE).

&copy; Copyright 2021-present, Shrikant Sharat Kandula.
