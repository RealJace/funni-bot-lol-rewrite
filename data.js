const fs = require("fs");

function get() {
	return JSON.parse(fs.readFileSync("./data.json", "utf-8"));
}

function set(data) {
	fs.writeFileSync("./data.json",JSON.stringify(data));
}

module.exports = {
	set: set,
	get: get
}