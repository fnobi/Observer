var Observer = function () {};

Observer.DISPATCHERS = [{
    name: 'on',
    dispatch: function (type, fn) {
        this.on(type, fn);
    }
}, {
    name: 'listen',
    dispatch: function (type, fn) {
        this.listen(type, fn);
    }
}, {
    name: 'addEventListener',
    dispatch: function (type, fn) {
        this.addEventListener(type, fn, false);
    }
}, {
    name: 'attachEvent',
    dispatch: function (type, fn) {
        this.attachEvent('on' + type, fn);
    }
}];

Observer.prototype.observe = function (target, type, fn) {
    var DISPATCHERS = Observer.DISPATCHERS;

    var name, dispatcher;
    for (var i = 0; i < DISPATCHERS.length; i++) {
        name = DISPATCHERS[i].name;
        dispatcher = DISPATCHERS[i].dispatcher;

        if (target[name]) {
            dispatcher.apply(target, [type, fn]);
        }
    }
};
