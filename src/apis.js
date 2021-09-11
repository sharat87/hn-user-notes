const apis = {}

if (typeof chrome !== "undefined") {
	apis.storageGet = keys => new Promise((resolve, reject) => {
		try {
			chrome.storage.local.get(keys instanceof Set ? Array.from(keys) : keys, resolve)
		} catch (error) {
			reject(error)
		}
	})

} else {
	apis.storageGet = keys => browser.storage.local.get(keys instanceof Set ? Array.from(keys) : keys)

}

export default apis
