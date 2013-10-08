var assert = chai.assert;

describe('Observer', function () {
    it('init', function () {
        var observer = new Observer();
        assert(observer);
    });

    it('listen EventEmitter', function (done) {
        var observer = new Observer();
        var eventEmitter = new EventEmitter();

        observer.observe(eventEmitter, 'hoge', function (e) {
            done();
        });

        eventEmitter.emit('hoge');
    });
    
    it('listen element', function (done) {
        var observer = new Observer();
        var el = document.createElement('a');

        observer.observe(el, 'click', function (e) {
            done();
        });

        var event = document.createEvent('MouseEvents');
        event.initEvent('click', false, true);
        el.dispatchEvent(event);
    });


    it('listen multi event', function (done) {
        var observer = new Observer();
        var eventEmitter = new EventEmitter();

        var flag_hoge = false;
        var flag_moge = false;

        observer.observe(eventEmitter, {
            hoge: function (e) {
                flag_hoge = true;
                
                if (flag_moge) {
                    done();
                }
            },
            moge: function (e) {
                flag_moge = true;
                
                if (flag_hoge) {
                    done();
                }
            }
        });

        eventEmitter.emit('hoge');
        eventEmitter.emit('moge');
    });
});
