(function() {

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

//
// DOM
//

var NOP = function() {};

var Node = function(type, doc) {
	this.nodeName = type;
	this.ownerDocument = doc !== undefined ? doc : document;
	this.childNodes = [];
	this.style = "";
};
Node.prototype.getElementsByTagName = function(name) {
	if(name == "*") {
		return this.childNodes; // TODO: recursive
	}
	var nodes = [];
	for(var i = 0; i < this.childNodes.length; i++) { // TODO: recursive
		var node = this.childNodes[i];
		if(node.nodeName == name) {
			nodes.push(node);
		}
	}
	return nodes;
};
Node.prototype.insertBefore = NOP;
Node.prototype.appendChild = function(node) {
	this.childNodes.push(node);
	this.firstChild = this.childNodes[0];
	this.lastChild = node;
	return node;
};
Node.prototype.removeChild = function(node) {
	for(var i = 0; i < this.childNodes.length; i++) {
		if(this.childNodes[i] === node) {
			return this.childNodes.splice(i, 1);
		}
	}
};
Node.prototype.cloneNode = function(deep) {
	return this; // XXX: dangerous
};
Node.prototype.getAttribute = function(name) {
	return this[name];
};
Node.prototype.setAttribute = function(name, value) {
	this[name] = value;
};

document = window.document = {
	documentElement: new Node(null, null),

	createElement: function(type) {
		return new Node(type);
	},
	createTextNode: function(text) {
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
