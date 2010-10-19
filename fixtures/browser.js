(function() {

var NOP = function() {};

//
// environment
//

navigator = {
	userAgent: ""
};

window = {
	location: {
		hash: "",
		host: "",
		hostname: "",
		href: "",
		pathname: "",
		port: "",
		protocol: "",
		search: ""
	}
};

location = window.location;

XMLHttpRequest = window.XMLHttpRequest = NOP;

//
// DOM
//

var Node = function() {
	this.style = "";
};
Node.prototype.getElementsByTagName = function() {
	return [];
};
Node.prototype.insertBefore = NOP;
Node.prototype.appendChild = NOP;
Node.prototype.removeChild = NOP;

document = window.document = {
	documentElement: new Node(),

	createElement: function() {
		return new Node();
	},
	createComment: function() {
		return new Node();
	},
	getElementById: function() {
		return null;
	}
};

})();
