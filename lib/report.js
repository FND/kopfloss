(function() {

var stats = QUnit.config.stats;
print("passed:", stats.all - stats.bad, "/", stats.all);

quit(stats.bad ? 1 : 0);

})();
