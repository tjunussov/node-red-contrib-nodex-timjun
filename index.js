module.exports = function(RED) {
    RED.plugins.registerPlugin('global-function-exposer', {
        type: 'function',
        settings: {
            init: function(settings) {
                global.$ = new Proxy(RED.context().global, {
                    get: function(target, prop) {
                        if (typeof target.get(prop) === 'function') {
                            return (...args) => target.get(prop)(...args);
                        }
                        return target.get(prop);
                    }
                });
            }
        }
    });
};
