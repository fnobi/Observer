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
    if (typeof type != 'string' && !fn) {
        // multi event mode
        for (var t in type) {
            this.observe(target, t, type[t]);
        }
        return;
    }

    var DISPATCHERS = Observer.DISPATCHERS;

    var name, dispatch;
    for (var i = 0; i < DISPATCHERS.length; i++) {
        name = DISPATCHERS[i].name;
        dispatch = DISPATCHERS[i].dispatch;

        if (target[name]) {
            dispatch.apply(target, [type, fn]);
        }
    }
};
