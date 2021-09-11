if (typeof chrome !== "undefined") {
	var browser = chrome
}

browser.storage.onChanged.addListener(changes => {
	console.log("Backup to a GitHub repo WIP")
})
