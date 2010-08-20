(function() {

//
// environment
//

navigator = {
	userAgent: ""
};

window = {};

location = window.location = {};

//
// DOM
//

var NOP = function() {};

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
