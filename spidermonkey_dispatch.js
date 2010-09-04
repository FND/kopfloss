var modules = [
	"fixtures/spidermonkey.js",
	"lib/qunit.js",
	"lib/headless.js",
	// tests
	"lib/report.js"
];
for(i = arguments.length - 1; i >= 0; i--) {
	var mod = arguments[i];
	modules.splice(3, 0, mod);
}

load.apply(this, modules); // XXX: dangerous to evaluate in global scope!?
