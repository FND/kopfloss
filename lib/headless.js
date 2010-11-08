(function() {

var currentTest;

QUnit.config.headless = {
	abortOnFail: false,
	verbose: false
};

QUnit.testStart = function(name, testEnvironment) {
	currentTest = name;
};

QUnit.log = function(result, message, details) {
	var prefix = QUnit.config.currentModule + "::" + currentTest;
	var msg = details.message || "";
	if(!result) {
		console.log("ERROR (" + prefix + ")",  msg,
			"\n  expected " + details.expected +
			"\n  result " + details.actual);
		if(QUnit.config.headless.abortOnFail) {
			console.log("aborting");
			quit(1); // XXX: inelegant; should use QUnit facilities (if any)
		}
	} else if(QUnit.config.headless.verbose) {
		console.log("PASS (" + prefix + ")",  msg);
	}
};

})();
