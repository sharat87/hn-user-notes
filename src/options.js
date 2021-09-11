import apis from "./apis"

const notesEl = document.getElementById("notes")

apis.storageGet(null).then(data => {
	for (const [key, content] of Object.entries(data)) {
		if (content == null || content === "") {
			continue
		}
		const h = document.createElement("h2")
		notesEl.appendChild(h)
		const p = document.createElement("p")
		p.dataset.user = h.innerText = key.substr(5)
		p.innerText = content
		notesEl.appendChild(p)
	}

	if (!notesEl.children.length) {
		const p = document.createElement("p")
		p.innerText = "No Notes yet."
		p.style = "font-style: italic"
		notesEl.appendChild(p)
	}
})
