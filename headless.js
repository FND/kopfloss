(function() {

var currentTest;

QUnit.config.headless = {
	verbose: false
};

QUnit.testStart = function(name, testEnvironment) {
	//print("==", name, "==");
	currentTest = name;
};

QUnit.log = function(result, message) {
	var prefix = QUnit.config.currentModule + "::" + currentTest;
	var msg = message.
		replace(/<span.*?>(.*?)<\/span>/g, "$1"). // remove spurious markup -- XXX: might affect tests' actual/expected data
		replace(/^undefined, /, ""); // ignore missing descriptions
	if(!result) {
		print("ERROR (" + prefix + ")",  msg);
	} else if(QUnit.config.headless.verbose) {
		print("PASS (" + prefix + ")",  msg);
	}
};

})();
