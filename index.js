const Layer = require('express/lib/router/layer');

const AsyncFunction = (async () => {}).constructor;

function wrap(fn) {
  return (...args) => {
    fn(...args).catch(args[args.length-1]);
  };
}

const descriptor = {
  enumerable: true,
  get() {
   return this.__handle;
  },
  set(fn) {
    if (fn instanceof AsyncFunction) {
      fn = wrap(fn);
    }

    this.__handle = fn;
  }
};

Object.defineProperty(Layer.prototype, 'handle', descriptor);
