module("Omega");

test("Alpha", function() {
	strictEqual("foo", "foo", "testA");
	strictEqual("foo", "bar", "testB");
	strictEqual("foo", "baz");
});

test("Bravo", function() {
	strictEqual("foo", "foo", "test1");
	strictEqual("foo", "bar", "test2");
	strictEqual("foo", "baz");
});
