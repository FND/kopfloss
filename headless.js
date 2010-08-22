(function() {

var currentTest, currentModule;

QUnit.moduleStart = function(name, testEnvironment) {
	//print("#####", name, "#####");
	currentModule = name;
};

QUnit.testStart = function(name, testEnvironment) {
	//print("==", name, "==");
	currentTest = name;
};

QUnit.log = function(result, message) {
	if(!result) {
		var msg = message.
			replace(/<span.*?>(.*?)<\/span>/g, "$1"). // remove spurious markup -- XXX: might affect tests' actual/expected data
			replace(/^undefined, /, ""); // ignore missing descriptions
		print("ERROR (" + currentModule + "::" + currentTest + ")",  msg);
	}
};

})();
