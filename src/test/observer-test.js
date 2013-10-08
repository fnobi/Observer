var assert = chai.assert;

describe('Observer', function () {
    it('init', function () {
        var observer = new Observer();
        assert(observer);
    });

    it('listen EventEmitter', function (done) {
        var arg = Math.random();
        var observer = new Observer();
        var eventEmitter = new EventEmitter();

        observer.observe(eventEmitter, 'hoge', function (e) {
            assert.equal(e, arg);
            done();
        });

        eventEmitter.emit('hoge', arg);
    });
    
    it('listen element', function (done) {
        var observer = new Observer();
        var el = document.createElement('a');

        observer.observe(el, 'click', function (e) {
            assert.equal(e, event);

            done();
        });

        var event = document.createEvent('MouseEvents');
        event.initEvent('click', false, true);
        el.dispatchEvent(event);
    });

    it('listen multi event', function (done) {
        var arg_hoge = Math.random();
        var arg_moge = Math.random();

        var observer = new Observer();
        var eventEmitter = new EventEmitter();

        var flag_hoge = false;
        var flag_moge = false;

        observer.observe(eventEmitter, {
            hoge: function (e) {
                assert.equal(arg_hoge, e);

                flag_hoge = true;
                
                if (flag_moge) {
                    done();
                }
            },
            moge: function (e) {
                assert.equal(arg_moge, e);

                flag_moge = true;
                
                if (flag_hoge) {
                    done();
                }
            }
        });

        eventEmitter.emit('hoge', arg_hoge);
        eventEmitter.emit('moge', arg_moge);
    });

    it('use method as listener', function (done) {
        var arg = Math.random();

        // sample class
        var Klass = function () { };
        inherits(Klass, Observer);
        Klass.prototype.hogehoge = function (e) {
            assert.equal(e, arg);
            done();
        };

        // observe
        var obj = new Klass();
        var eventEmitter = new EventEmitter();

        obj.observe(eventEmitter, 'hoge', 'hogehoge');

        eventEmitter.emit('hoge', arg);
    });
});
