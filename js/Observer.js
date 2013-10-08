var Observer = function () {};

Observer.DISPATCHERS = {
    on: function (type, fn) {
        this.on(type, fn);
    },
    listen: function (type, fn) {
        this.listen(type, fn);
    },
    addEventListener: function (type, fn) {
        console.log('this: %s', this);
        console.log('%s', fn);

        this.addEventListener(type, fn, false);
    },
    attachEvent: function (type, fn) {
        this.attachEvent('on' + type, fn);
    }
};

Observer.prototype.observe = function (target, type, fn) {
    var DISPATCHERS = Observer.DISPATCHERS;

    for (var dispatcher in DISPATCHERS) {
        if (target[dispatcher]) {
            DISPATCHERS[dispatcher].apply(target, [type, fn]);
        }
    }
};
