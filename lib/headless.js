(function() {

var currentTest;

QUnit.config.headless = {
	abortOnFail: false,
	verbose: false
};

QUnit.testStart = function(name, testEnvironment) {
	currentTest = name;
};

QUnit.log = function(result, message) {
	var prefix = QUnit.config.currentModule + "::" + currentTest;
	var msg = message.
		replace(/<span.*?>(.*?)<\/span>/g, "$1"). // remove spurious markup -- XXX: might affect tests' actual/expected data
		replace(/^undefined, /, ""); // ignore missing descriptions
	if(!result) {
		console.log("ERROR (" + prefix + ")",  msg);
		if(QUnit.config.headless.abortOnFail) {
			console.log("aborting");
			quit(1); // XXX: inelegant; should use QUnit facilities (if any)
		}
	} else if(QUnit.config.headless.verbose) {
		console.log("PASS (" + prefix + ")",  msg);
	}
};

})();
