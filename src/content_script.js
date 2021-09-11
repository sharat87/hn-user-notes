import apis from "./apis"

if (typeof chrome !== "undefined") {
	var browser = chrome
}

try {
	main()
} catch (e) {
	console.error("Error in main", e)
}

// TODO:
// If note added in one tab, it should show in another tab immediately.
// Notes opened for same user in same tab, should be edited in sync.
// A page to view all notes, edit, delete, add(?). Save notes in localStorage of background page, for this to be possible.
// Take a GitHub personal-access-token, and save all notes to GitHub (or Gist?)

let noteCache = {}

function main() {
	const keys = new Set
	for (const userEl of document.body.querySelectorAll(".hnuser")) {
		keys.add("note:" + userEl.innerText)
	}

	apis.storageGet(keys)
		.then(data => {
			console.log("response for getNotes", data)
			noteCache = data
			renderNoteButtons()
		})

	browser.storage.onChanged.addListener((changes, areaName) => {
		if (areaName !== "local") {
			console.warning("We aren't using non-local storage here. How did we get an update?")
		}

		console.log("Got changes", changes)
		for (const [key, {newValue}] of Object.entries(changes)) {
			if (!key.startsWith("note:")) {
				continue
			}
			if (newValue == null) {
				delete noteCache[key]
			} else {
				noteCache[key] = newValue
				document.querySelector(".hun-btn[data-user='" + key.substr(5) + "']").title = newValue
			}
		}
	})
}

function renderNoteButtons() {
	for (const btn of document.body.querySelectorAll(".hun-btn")) {
		btn.remove()
	}

	for (const userEl of document.body.querySelectorAll(".hnuser")) {
		const user = userEl.innerText
		const content = getFor(user)
		const el = document.createElement("a")
		el.href = "#"
		el.innerText = content === "" ? "🗒" : "📝"
		el.title = content === "" ? "No note" : content
		el.className = "hun-btn"
		el.addEventListener("click", onNoteClicked)
		el.dataset.user = user
		el.style.marginLeft = "6px"
		userEl.insertAdjacentElement("afterend", el)
	}
}

function onNoteClicked(event) {
	event.preventDefault()

	const user = event.target.dataset.user
	const content = getFor(user)

	const root = document.createElement("div")
	root.style = "box-shadow: 12px 12px 36px #0002; position: absolute;"
	const rect = event.target.getBoundingClientRect()
	root.style.left = rect.x + document.body.scrollLeft + "px"
	root.style.top = rect.y + document.body.scrollTop + "px"

	const ta = document.createElement("textarea")
	ta.cols = 80
	ta.rows = 8
	ta.placeholder = "Note for '" + user + "', will be auto-saved."
	ta.dataset.user = user
	ta.value = content
	on(ta, "input", onNoteInput)
	on(ta, "keydown", event => {
		if (event.key === "Escape") {
			event.preventDefault()
			saveAndClose()
		}
	})
	root.appendChild(ta)

	const closeBtn = document.createElement("a")
	closeBtn.href = "#"
	closeBtn.innerText = "❌"
	closeBtn.style = "display: block; position: absolute; right: 3px;; top: 3px;"
	closeBtn.addEventListener("click", event => {
		event.preventDefault()
		saveAndClose()
	})
	root.appendChild(closeBtn)

	document.body.appendChild(root)
	ta.focus()

	function saveAndClose() {
		root.remove()
		renderNoteButtons()
	}
}

function onNoteInput(event) {
	setFor(event.target.dataset.user, event.target.value)
}

function getFor(user) {
	return noteCache["note:" + user] ?? ""
}

function setFor(user, content) {
	browser.storage.local.set({
		["note:" + user]: content,
	})
}

function on(emitter, eventName, listener) {
	emitter.addEventListener(eventName, event => {
		try {
			return listener.call(this, event)
		} catch (e) {
			console.error(`Error in ${eventName} listener for ${emitter}`, e)
		}
	})
}
