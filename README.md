











Observer
======

listen any event emitter.

## install

### from bower
```
bower install Observer
```

### from github
```
git clone git://github.com/fnobi/Observer.git
```

## usage
```
var observer = new Observer();

// listen element by "addEventListener" or "attachEvent"
var btn = document.createElement('a');
document.body.appendChild(btn);

observer.observe(btn, 'click', function (e) {
    e.preventDefault();
    alert('btn click!');
});


// listen eventEmitter by "on"
var eventEmitter = new EventEmitter();
observer.observe(eventEmitter, 'hello', function (message) {
    console.log('emit "hello"!');
    console.log('message: %s', message);
});

eventEmitter.emit('hello', 'hogehoge');



// use as parent class
var Klass = function () {};
inherits(Klass, Observer);

Klass.prototype.clickListener = function (e) {
    e.preventDefault();
    alert('btn click!');
};

Klass.prototype.helloListener = function (message) {
    console.log('emit "hello"!');
    console.log('message: %s', message);
};

var obj = new Klass();
obj.observe(btn,          'click', 'clickListener');
obj.observe(eventEmitter, 'hello', 'helloListener');



// set multi event
var slider = document.createElement('div');
var sliderController = new Observer();

sliderController.observe(slider, {
    touchstart: function () {
        // init touch
    },
    touchmove: function () {
        // process touch
    },
    touchend: function () {
        // finalize touch
    }
});



// use for init
function init () {
    // initialize code
}

new Observer().observe(window, 'load', init);

```
