require.paths.splice(0, 0, process.cwd());
require.paths.splice(1, 0, __dirname);


var modules = [
	"fixtures/node.js",
	"lib/qunit.js",
	"lib/headless.js",
	"lib/report.js"
];
for(var i = process.argv.length - 1; i > 1; i--) { // ignore file and script name
	var mod = process.argv[i];
	modules.splice(3, 0, mod);
}

modules.forEach(function(item, i) {
	var mod = require(item);
	for(var key in mod) { // XXX: dangerous if done indiscriminately, for every imported module!?
		global[key] = mod[key];
		// XXX: module is a reserved word in Node.js, but also used by QUnit
		//      it cannot be redefined in included modules from the outside
	};
});
