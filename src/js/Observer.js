var Observer = function () {};

Observer.DISPATCHERS = {
    on: function (type, fn) {
        this.on(type, fn);
    },
    listen: function (type, fn) {
        this.listen(type, fn);
    },
    addEventListener: function (type, fn) {
        this.addEventListener(type, fn, false);
    },
    attachEvent: function (type, fn) {
        this.attachEvent('on' + type, fn);
    }
};
